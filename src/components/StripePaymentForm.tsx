import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from './ui/button';
import { Alert } from './ui/alert';
import { Loader2 } from 'lucide-react';

interface StripePaymentFormProps {
  onSuccess: (paymentMethodId: string) => void;
  onError: (error: string) => void;
  buttonText?: string;
  isProcessing?: boolean;
}

export function StripePaymentForm({
  onSuccess,
  onError,
  buttonText = 'Submit Payment',
  isProcessing = false,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  // Check if we're in test mode by checking the publishable key
  const isTestMode = typeof window !== 'undefined' && 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('127.0.0.1');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe has not loaded yet. Please try again.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card element not found');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment method
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (stripeError) {
        // Enhanced error messaging for test mode
        let errorMsg = stripeError.message || 'Payment method creation failed';
        
        if (stripeError.code === 'card_declined' && stripeError.decline_code === 'test_mode_live_card') {
          errorMsg = '🧪 Test Mode: Please use test card 4242 4242 4242 4242 (any future expiry, any CVC)';
        }
        
        setError(errorMsg);
        onError(errorMsg);
        setProcessing(false);
        return;
      }

      if (paymentMethod) {
        onSuccess(paymentMethod.id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError(errorMessage);
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#0A1A2F',
        '::placeholder': {
          color: '#0A1A2F66',
        },
        fontFamily: 'Manrope, system-ui, -apple-system, sans-serif',
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: false,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Test Mode Notice */}
      {isTestMode && (
        <Alert className="bg-[#2AD1C8]/10 border-[#2AD1C8]/30 text-[#0A1A2F]">
          <div className="flex items-start gap-2">
            <span className="text-lg">🧪</span>
            <div className="text-sm">
              <strong>Test Mode:</strong> Use test card <code className="bg-white/50 px-1 rounded">4242 4242 4242 4242</code><br/>
              Any future expiry (e.g., 12/34), any CVC (e.g., 123), any postal code
            </div>
          </div>
        </Alert>
      )}
      
      <div className="border border-[#0A1A2F]/20 rounded-lg p-4 bg-white">
        <label className="block text-sm text-[#0A1A2F] mb-3">
          Card Details *
        </label>
        <CardElement options={cardElementOptions} />
      </div>

      {error && (
        <Alert variant="destructive" className="text-sm">
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing || isProcessing}
        className="w-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90"
      >
        {(processing || isProcessing) ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          buttonText
        )}
      </Button>

      <div className="flex items-start gap-2 text-xs text-[#0A1A2F]/60">
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span>
          Your payment information is encrypted and secure. We use Stripe for payment processing.
        </span>
      </div>
    </form>
  );
}