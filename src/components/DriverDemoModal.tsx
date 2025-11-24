import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { CheckCircle, Loader2, Smartphone } from 'lucide-react';

interface DriverDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DriverDemoModal({ open, onOpenChange }: DriverDemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    message: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/demo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...formData,
            demo_type: 'driver_app',
            source: 'drivers_page',
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit demo request');
      }

      setIsSuccess(true);
      toast.success('Demo request submitted successfully!');
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company_name: '',
          message: '',
        });
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);

    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit demo request');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#2AD1C8]/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[#2AD1C8]" />
            </div>
            <h3 className="text-xl mb-2">Demo Request Received!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for your interest. Our team will contact you within 1 business day to schedule your personalized demo.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation details.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-[#2AD1C8]" />
            </div>
            <div>
              <DialogTitle>Request a Driver App Demo</DialogTitle>
            </div>
          </div>
          <DialogDescription>
            See how easy it is to manage jobs, track earnings, and get paid with our driver app. We'll give you a personalized walkthrough.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="John Smith"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+44 7700 900000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name (Optional)</Label>
            <Input
              id="company_name"
              value={formData.company_name}
              onChange={(e) => handleChange('company_name', e.target.value)}
              placeholder="Your company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">What would you like to see? (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us about your typical routes, vehicle type, or specific features you're interested in..."
              rows={3}
            />
          </div>

          <div className="bg-[#2AD1C8]/5 border border-[#2AD1C8]/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-[#2AD1C8] mb-1">What you'll see:</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Live job matching based on your routes</li>
                  <li>• Real-time earnings tracking</li>
                  <li>• Smart navigation and route optimization</li>
                  <li>• Payment history and weekly payouts</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Request Demo'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
