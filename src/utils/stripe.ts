// Stripe utility functions for frontend
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_CONFIG } from '../config/stripe';

// Initialize Stripe with publishable key
export const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

// Pricing tier mapping for Stripe
export const stripePriceIds = STRIPE_CONFIG.priceIds;

export interface CreateSubscriptionRequest {
  planName: string;
  billingCycle: 'monthly' | 'annual';
  hasTrial: boolean;
  customerInfo: {
    name: string;
    email: string;
    company: string;
    phone: string;
    additionalInfo?: string;
  };
  paymentMethodId: string;
}

export interface CreateSubscriptionResponse {
  success: boolean;
  subscriptionId?: string;
  clientSecret?: string;
  error?: string;
  message?: string;
}

// Create subscription via backend API
export async function createSubscription(
  data: CreateSubscriptionRequest
): Promise<CreateSubscriptionResponse> {
  try {
    // Import project info dynamically to avoid initialization issues
    const { projectId, publicAnonKey } = await import('./supabase/info');
    
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/subscriptions/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating subscription:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Get Stripe Price ID based on plan and billing cycle
export function getStripePriceId(
  planName: string,
  billingCycle: 'monthly' | 'annual'
): string {
  const plan = planName.toLowerCase();
  const priceMap: Record<string, { monthly: string; annual: string }> = {
    starter: stripePriceIds.starter,
    growth: stripePriceIds.growth,
    scale: stripePriceIds.scale,
  };

  return priceMap[plan]?.[billingCycle] || '';
}