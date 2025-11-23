// Stripe Configuration
// TODO: Replace with your actual Stripe publishable key from Stripe Dashboard

/**
 * IMPORTANT: 
 * - This is the PUBLISHABLE key (safe to expose in frontend)
 * - Get this from: https://dashboard.stripe.com/apikeys
 * - For testing: Use key that starts with pk_test_
 * - For production: Use key that starts with pk_live_
 */

export const STRIPE_CONFIG = {
  // Publishable key - safe to expose in frontend
  publishableKey: import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_REPLACE_WITH_YOUR_KEY',
  
  // Price IDs from Stripe Dashboard
  priceIds: {
    starter: {
      monthly: 'prod_TTZjnclkmePCyh',
      annual: 'prod_TTZkdXj71Z1Y3g',
    },
    growth: {
      monthly: 'prod_TTZmGqsfAO2ktz',
      annual: 'prod_TTZnsq6BDn0UuM',
    },
    scale: {
      monthly: 'prod_TTZppt59jhs8yy',
      annual: 'prod_TTZpTInUYO604D',
    },
  },
};

// Helper to check if Stripe is configured
export function isStripeConfigured(): boolean {
  return (
    STRIPE_CONFIG.publishableKey !== 'pk_test_REPLACE_WITH_YOUR_KEY' &&
    STRIPE_CONFIG.publishableKey.startsWith('pk_')
  );
}
