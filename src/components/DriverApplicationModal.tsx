import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { CheckCircle, Loader2 } from 'lucide-react';

interface DriverApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DriverApplicationModal({ open, onOpenChange }: DriverApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    postcode: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    county: '',
    
    // Vehicle Information
    vehicle_type: '',
    vehicle_make: '',
    vehicle_model: '',
    vehicle_year: '',
    vehicle_registration: '',
    vehicle_colour: '',
    vehicle_capacity: '',
    
    // Documentation
    driving_licence_number: '',
    driving_licence_expiry: '',
    mot_expiry_date: '',
    insurance_provider: '',
    insurance_policy_number: '',
    insurance_expiry: '',
    goods_in_transit_insurance: false,
    
    // Availability
    availability_notes: '',
    typical_routes: '',
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.first_name || !formData.last_name || 
        !formData.phone || !formData.postcode || !formData.vehicle_type) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-application`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            ...formData,
            vehicle_year: formData.vehicle_year ? parseInt(formData.vehicle_year) : null,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.error('Driver application submission failed:', {
          status: response.status,
          error: result.error,
          details: result.details,
          result: result
        });
        throw new Error(result.details || result.error || 'Failed to submit application');
      }

      setIsSuccess(true);
      toast.success('Application submitted successfully!');
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          email: '',
          first_name: '',
          last_name: '',
          phone: '',
          postcode: '',
          address_line_1: '',
          address_line_2: '',
          city: '',
          county: '',
          vehicle_type: '',
          vehicle_make: '',
          vehicle_model: '',
          vehicle_year: '',
          vehicle_registration: '',
          vehicle_colour: '',
          vehicle_capacity: '',
          driving_licence_number: '',
          driving_licence_expiry: '',
          mot_expiry_date: '',
          insurance_provider: '',
          insurance_policy_number: '',
          insurance_expiry: '',
          goods_in_transit_insurance: false,
          availability_notes: '',
          typical_routes: '',
        });
        setIsSuccess(false);
        onOpenChange(false);
      }, 2000);

    } catch (error) {
      console.error('Error submitting driver application:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#A6F750]/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[#A6F750]" />
            </div>
            <h3 className="text-xl mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground mb-4">
              Thank you for applying. Our team will review your application and contact you within 2 business days.
            </p>
            <p className="text-sm text-muted-foreground">
              Check your email for confirmation and next steps.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Driver Application</DialogTitle>
          <DialogDescription>
            Complete this application to join the Nexus Crux driver network. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Personal Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleChange('first_name', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleChange('last_name', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+44 7700 900000"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line_1">Address Line 1</Label>
              <Input
                id="address_line_1"
                value={formData.address_line_1}
                onChange={(e) => handleChange('address_line_1', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address_line_2">Address Line 2</Label>
              <Input
                id="address_line_2"
                value={formData.address_line_2}
                onChange={(e) => handleChange('address_line_2', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="county">County</Label>
                <Input
                  id="county"
                  value={formData.county}
                  onChange={(e) => handleChange('county', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postcode">Postcode *</Label>
                <Input
                  id="postcode"
                  placeholder="SW1A 1AA"
                  value={formData.postcode}
                  onChange={(e) => handleChange('postcode', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h4 className="font-semibold">Vehicle Information</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_type">Vehicle Type *</Label>
                <Select
                  value={formData.vehicle_type}
                  onValueChange={(value) => handleChange('vehicle_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SWB">SWB (Short Wheel Base)</SelectItem>
                    <SelectItem value="LWB">LWB (Long Wheel Base)</SelectItem>
                    <SelectItem value="Luton">Luton Van</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle_registration">Vehicle Registration</Label>
                <Input
                  id="vehicle_registration"
                  placeholder="AB21 XYZ"
                  value={formData.vehicle_registration}
                  onChange={(e) => handleChange('vehicle_registration', e.target.value.toUpperCase())}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_make">Make</Label>
                <Input
                  id="vehicle_make"
                  placeholder="Ford"
                  value={formData.vehicle_make}
                  onChange={(e) => handleChange('vehicle_make', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle_model">Model</Label>
                <Input
                  id="vehicle_model"
                  placeholder="Transit"
                  value={formData.vehicle_model}
                  onChange={(e) => handleChange('vehicle_model', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle_year">Year</Label>
                <Input
                  id="vehicle_year"
                  type="number"
                  placeholder="2021"
                  value={formData.vehicle_year}
                  onChange={(e) => handleChange('vehicle_year', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle_colour">Colour</Label>
                <Input
                  id="vehicle_colour"
                  value={formData.vehicle_colour}
                  onChange={(e) => handleChange('vehicle_colour', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="vehicle_capacity">Capacity</Label>
                <Input
                  id="vehicle_capacity"
                  placeholder="e.g., 1000kg payload"
                  value={formData.vehicle_capacity}
                  onChange={(e) => handleChange('vehicle_capacity', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Documentation */}
          <div className="space-y-4">
            <h4 className="font-semibold">Documentation</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driving_licence_number">Driving Licence Number</Label>
                <Input
                  id="driving_licence_number"
                  value={formData.driving_licence_number}
                  onChange={(e) => handleChange('driving_licence_number', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="driving_licence_expiry">Licence Expiry</Label>
                <Input
                  id="driving_licence_expiry"
                  type="date"
                  value={formData.driving_licence_expiry}
                  onChange={(e) => handleChange('driving_licence_expiry', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mot_expiry_date">MOT Expiry</Label>
                <Input
                  id="mot_expiry_date"
                  type="date"
                  value={formData.mot_expiry_date}
                  onChange={(e) => handleChange('mot_expiry_date', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance_expiry">Insurance Expiry</Label>
                <Input
                  id="insurance_expiry"
                  type="date"
                  value={formData.insurance_expiry}
                  onChange={(e) => handleChange('insurance_expiry', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insurance_provider">Insurance Provider</Label>
                <Input
                  id="insurance_provider"
                  value={formData.insurance_provider}
                  onChange={(e) => handleChange('insurance_provider', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insurance_policy_number">Policy Number</Label>
                <Input
                  id="insurance_policy_number"
                  value={formData.insurance_policy_number}
                  onChange={(e) => handleChange('insurance_policy_number', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="goods_in_transit_insurance"
                checked={formData.goods_in_transit_insurance}
                onCheckedChange={(checked) => handleChange('goods_in_transit_insurance', checked)}
              />
              <Label htmlFor="goods_in_transit_insurance" className="cursor-pointer">
                I have Goods in Transit insurance
              </Label>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h4 className="font-semibold">Availability</h4>
            
            <div className="space-y-2">
              <Label htmlFor="typical_routes">Typical Routes</Label>
              <Input
                id="typical_routes"
                placeholder="e.g., London to Birmingham, M1 corridor"
                value={formData.typical_routes}
                onChange={(e) => handleChange('typical_routes', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability_notes">Availability Notes</Label>
              <Textarea
                id="availability_notes"
                placeholder="Tell us about your typical schedule and preferred working days/times"
                value={formData.availability_notes}
                onChange={(e) => handleChange('availability_notes', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
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
                'Submit Application'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}