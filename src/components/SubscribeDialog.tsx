import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Alert } from './ui/alert';
import { Elements } from '@stripe/react-stripe-js';
import { StripePaymentForm } from './StripePaymentForm';
import { stripePromise, createSubscription } from '../utils/stripe';
import { isStripeConfigured } from '../config/stripe';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface SubscribeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: string;
  billingCycle: 'monthly' | 'annual';
  price: string;
}

export function SubscribeDialog({
  open,
  onOpenChange,
  selectedPlan,
  billingCycle,
  price,
}: SubscribeDialogProps) {
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    additionalInfo: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionId, setSubscriptionId] = useState<string>('');

  const handleInfoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    setCustomerInfo({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      additionalInfo: (formData.get('additionalInfo') as string) || '',
    });
    
    setStep('payment');
  };

  const handlePaymentSuccess = async (paymentMethodId: string) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = await createSubscription({
        planName: selectedPlan,
        billingCycle,
        hasTrial: false, // No trial - charge immediately
        customerInfo,
        paymentMethodId,
      });

      if (response.success && response.subscriptionId) {
        setSubscriptionId(response.subscriptionId);
        setStep('success');
      } else {
        setError(response.error || 'Failed to create subscription');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (error: string) => {
    setError(error);
    setIsProcessing(false);
  };

  const handleClose = () => {
    setStep('info');
    setCustomerInfo({ name: '', email: '', company: '', phone: '', additionalInfo: '' });
    setError(null);
    setSubscriptionId('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {step === 'info' && (
          <>
            <DialogHeader>
              <DialogTitle>Subscribe to {selectedPlan} Plan</DialogTitle>
              <DialogDescription>
                Step 1 of 2: Enter your information
              </DialogDescription>
            </DialogHeader>

            {/* Plan Summary */}
            <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#2AD1C8]/30 rounded-lg p-4 mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-[#0A1A2F] mb-1">{selectedPlan} Plan</h4>
                  <p className="text-sm text-[#0A1A2F]/60">
                    {billingCycle === 'monthly' ? 'Monthly Billing' : 'Annual Billing (Save 20%)'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl text-[#0A1A2F]">{price}</div>
                  <p className="text-xs text-[#0A1A2F]/60">
                    {billingCycle === 'monthly' ? 'per month' : 'per year'}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#2AD1C8]/20">
                <p className="text-sm text-[#0A1A2F]">
                  ✓ Immediate access after payment
                </p>
                <p className="text-sm text-[#0A1A2F]">✓ Cancel anytime</p>
                <p className="text-sm text-[#0A1A2F]">✓ Full access to all features</p>
              </div>
            </div>

            <form onSubmit={handleInfoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Full Name *</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Work Email *</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Company Name *</label>
                <Input
                  type="text"
                  name="company"
                  placeholder="Your Company"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+44 20 7946 0958"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Additional Information</label>
                <Textarea
                  name="additionalInfo"
                  placeholder="Tell us about your business needs..."
                  rows={3}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90 transition-opacity"
              >
                Continue to Payment
              </button>
              <p className="text-xs text-center text-[#0A1A2F]/60">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Information</DialogTitle>
              <DialogDescription>
                Step 2 of 2: Complete your subscription
              </DialogDescription>
            </DialogHeader>

            <div className="mb-4 bg-[#2AD1C8]/10 border border-[#2AD1C8]/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">💳</span>
                <p className="text-sm text-[#0A1A2F] flex-1">
                  Your card will be charged <strong>{price}</strong> today for {billingCycle === 'monthly' ? 'monthly' : 'annual'} access.
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-4">
                {error}
              </Alert>
            )}

            <Elements stripe={stripePromise}>
              <StripePaymentForm
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                buttonText={`Pay ${price} & Subscribe`}
                isProcessing={isProcessing}
              />
            </Elements>

            <button
              onClick={() => setStep('info')}
              className="w-full mt-4 py-2 text-sm text-[#0A1A2F]/60 hover:text-[#0A1A2F] transition-colors"
              disabled={isProcessing}
            >
              ← Back to Information
            </button>
          </>
        )}

        {step === 'success' && (
          <>
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-[#2AD1C8] mx-auto mb-4" />
              <h3 className="text-2xl text-[#0A1A2F] mb-2">Welcome to Nexus Crux!</h3>
              <p className="text-[#0A1A2F]/60 mb-6">
                Your subscription is active. We've sent login credentials to {customerInfo.email}.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h4 className="text-sm text-[#0A1A2F] mb-3">What's next?</h4>
                <ul className="space-y-2 text-sm text-[#0A1A2F]/80">
                  <li>✓ Check your email for login credentials</li>
                  <li>✓ Access your dashboard now</li>
                  <li>✓ Complete onboarding wizard</li>
                  <li>✓ Schedule a demo call (optional)</li>
                  <li>✓ Start connecting your systems</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#2AD1C8]/20 rounded-lg p-4 mb-4 text-left">
                <p className="text-xs text-[#0A1A2F]/60 mb-1">Subscription ID</p>
                <p className="text-sm text-[#0A1A2F] font-mono">{subscriptionId}</p>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90 transition-opacity"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}