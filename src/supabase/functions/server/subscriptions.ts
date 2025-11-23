import { Hono } from 'npm:hono';
import Stripe from 'npm:stripe@14.10.0';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const app = new Hono();

// Initialize Stripe with secret key
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-11-20.acacia',
});

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '',
);

// Create subscription endpoint
app.post('/create', async (c) => {
  try {
    const body = await c.req.json();
    const {
      planName,
      billingCycle,
      hasTrial,
      customerInfo,
      paymentMethodId,
    } = body;

    // Validate required fields
    if (!planName || !billingCycle || !customerInfo || !paymentMethodId) {
      return c.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Stripe Price ID based on plan and billing cycle
    const priceId = getStripePriceId(planName, billingCycle);
    if (!priceId) {
      return c.json(
        { success: false, error: 'Invalid plan or billing cycle' },
        { status: 400 }
      );
    }

    // Create or retrieve Stripe customer
    const customer = await stripe.customers.create({
      email: customerInfo.email,
      name: customerInfo.name,
      phone: customerInfo.phone,
      metadata: {
        company: customerInfo.company,
        plan: planName,
        billingCycle: billingCycle,
        additionalInfo: customerInfo.additionalInfo || '',
      },
    });

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customer.id,
    });

    // Set as default payment method
    await stripe.customers.update(customer.id, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // Create subscription
    const subscriptionParams: Stripe.SubscriptionCreateParams = {
      customer: customer.id,
      items: [{ price: priceId }],
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice.payment_intent'],
    };

    // Add trial period if requested (14 days)
    if (hasTrial) {
      subscriptionParams.trial_period_days = 14;
    }

    const subscription = await stripe.subscriptions.create(subscriptionParams);

    // Log subscription creation
    console.log(`✅ Subscription created: ${subscription.id} for ${customerInfo.email}`);
    console.log(`   Plan: ${planName} (${billingCycle})`);
    console.log(`   Trial: ${hasTrial ? '14 days' : 'No trial'}`);
    console.log(`   Customer: ${customer.id}`);

    // === SAVE TO DATABASE ===
    
    // 1. Save customer to database
    const { data: dbCustomer, error: customerError } = await supabase
      .from('customers')
      .insert({
        stripe_customer_id: customer.id,
        email: customerInfo.email,
        name: customerInfo.name,
        phone: customerInfo.phone || null,
        company: customerInfo.company || null,
        status: 'active',
        stripe_created_at: new Date(customer.created * 1000).toISOString(),
      })
      .select()
      .single();

    if (customerError) {
      console.error('❌ Error saving customer to database:', customerError);
      // Continue anyway - Stripe subscription is created
    } else {
      console.log(`✅ Customer saved to database: ${dbCustomer.id}`);
    }

    // 2. Calculate subscription amount based on plan and billing cycle
    const planAmounts: Record<string, { monthly: number; annual: number }> = {
      starter: { monthly: 399, annual: 319.20 },
      growth: { monthly: 1199, annual: 959.20 },
      scale: { monthly: 2899, annual: 2319.20 },
    };
    
    const amount = planAmounts[planName.toLowerCase()]?.[billingCycle.toLowerCase() as 'monthly' | 'annual'] || 0;

    // 3. Save subscription to database
    const { data: dbSubscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customer.id,
        stripe_price_id: priceId,
        customer_id: dbCustomer?.id || null,
        plan_name: planName.toLowerCase(),
        billing_cycle: billingCycle.toLowerCase(),
        amount: amount,
        currency: 'gbp',
        status: subscription.status,
        has_trial: hasTrial,
        trial_start: hasTrial && subscription.trial_start ? new Date(subscription.trial_start * 1000).toISOString() : null,
        trial_end: hasTrial && subscription.trial_end ? new Date(subscription.trial_end * 1000).toISOString() : null,
        current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end,
        signup_source: hasTrial ? 'trial' : 'direct',
        additional_info: customerInfo.additionalInfo || null,
        stripe_created_at: new Date(subscription.created * 1000).toISOString(),
      })
      .select()
      .single();

    if (subscriptionError) {
      console.error('❌ Error saving subscription to database:', subscriptionError);
      // Continue anyway - Stripe subscription is created
    } else {
      console.log(`✅ Subscription saved to database: ${dbSubscription.id}`);
    }

    // 4. Log subscription event
    if (dbSubscription && dbCustomer) {
      const { error: eventError } = await supabase
        .from('subscription_events')
        .insert({
          subscription_id: dbSubscription.id,
          customer_id: dbCustomer.id,
          stripe_subscription_id: subscription.id,
          event_type: 'subscription_created',
          description: `Customer signed up for ${planName} plan (${billingCycle})${hasTrial ? ' with 14-day trial' : ''}`,
          metadata: {
            plan: planName,
            billing_cycle: billingCycle,
            has_trial: hasTrial,
            amount: amount,
          },
        });

      if (eventError) {
        console.error('❌ Error logging subscription event:', eventError);
      } else {
        console.log('✅ Subscription event logged');
      }
    }

    return c.json({
      success: true,
      subscriptionId: subscription.id,
      customerId: customer.id,
      status: subscription.status,
      trialEnd: subscription.trial_end,
      message: hasTrial
        ? 'Subscription created with 14-day free trial'
        : 'Subscription created and payment processed',
    });
  } catch (error) {
    console.error('❌ Error creating subscription:', error);
    
    // Enhanced error messaging
    let errorMessage = 'Unknown error occurred';
    let statusCode = 500;
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific Stripe errors
      const stripeError = error as any;
      
      if (stripeError.type === 'StripeCardError') {
        statusCode = 402; // Payment Required
        
        if (stripeError.code === 'card_declined' && stripeError.decline_code === 'test_mode_live_card') {
          errorMessage = '🧪 Test Mode: Please use Stripe test card 4242 4242 4242 4242 (any future expiry, any CVC, any postal code). Real cards cannot be used in test mode.';
        } else if (stripeError.code === 'card_declined') {
          errorMessage = `Card declined: ${stripeError.message}`;
        } else {
          errorMessage = stripeError.message;
        }
      } else if (stripeError.type === 'StripeInvalidRequestError') {
        statusCode = 400;
        errorMessage = `Invalid request: ${stripeError.message}`;
      }
    }
    
    return c.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: statusCode }
    );
  }
});

// Get subscription status
app.get('/status/:subscriptionId', async (c) => {
  try {
    const subscriptionId = c.req.param('subscriptionId');
    
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    return c.json({
      success: true,
      subscription: {
        id: subscription.id,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        trialEnd: subscription.trial_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error) {
    console.error('❌ Error retrieving subscription:', error);
    
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
});

// Cancel subscription
app.post('/cancel/:subscriptionId', async (c) => {
  try {
    const subscriptionId = c.req.param('subscriptionId');
    
    // Cancel at period end (don't cancel immediately)
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    
    console.log(`✅ Subscription ${subscriptionId} will cancel at period end`);
    
    return c.json({
      success: true,
      message: 'Subscription will cancel at the end of the current period',
      cancelAt: subscription.cancel_at,
    });
  } catch (error) {
    console.error('❌ Error cancelling subscription:', error);
    
    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
});

// Helper function to map plan names to Stripe Price IDs
function getStripePriceId(planName: string, billingCycle: string): string | null {
  // TODO: Replace these with your actual Stripe Price IDs from Stripe Dashboard
  const priceMap: Record<string, { monthly: string; annual: string }> = {
    starter: {
      monthly: Deno.env.get('STRIPE_PRICE_STARTER_MONTHLY') || 'price_starter_monthly',
      annual: Deno.env.get('STRIPE_PRICE_STARTER_ANNUAL') || 'price_starter_annual',
    },
    growth: {
      monthly: Deno.env.get('STRIPE_PRICE_GROWTH_MONTHLY') || 'price_growth_monthly',
      annual: Deno.env.get('STRIPE_PRICE_GROWTH_ANNUAL') || 'price_growth_annual',
    },
    scale: {
      monthly: Deno.env.get('STRIPE_PRICE_SCALE_MONTHLY') || 'price_scale_monthly',
      annual: Deno.env.get('STRIPE_PRICE_SCALE_ANNUAL') || 'price_scale_annual',
    },
  };

  const plan = planName.toLowerCase();
  const cycle = billingCycle.toLowerCase();

  return priceMap[plan]?.[cycle as 'monthly' | 'annual'] || null;
}

export default app;