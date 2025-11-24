import { useState } from 'react';
import { SEO } from '../components/SEO';
import { BrandButton } from '../components/BrandButton';
import { BrandCard } from '../components/BrandCard';
import { NetworkNodes } from '../components/NetworkNodes';
import { DriverApplicationModal } from '../components/DriverApplicationModal';
import { DriverDemoModal } from '../components/DriverDemoModal';
import { 
  Truck, 
  TrendingUp, 
  Calendar, 
  Shield, 
  CreditCard, 
  MapPin,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Award,
  ChevronRight,
  Smartphone,
  Bell,
  BarChart3
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function DriversPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleQuickSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/driver-interest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email,
            source: 'drivers_page_hero',
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast.success('Thanks! We\'ll be in touch soon with onboarding details.');
      setEmail('');
    } catch (error) {
      console.error('Error submitting driver interest:', error);
      toast.error('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      <SEO
        title="Join Our Driver Network"
        description="Own a van? Stop driving empty. Join the Nexus Crux network and fill your return journeys with verified, paid jobs. No monthly fees."
        keywords="van driver jobs, man and van work, courier jobs, return journey jobs, delivery driver network, van owner opportunities"
      />

      {/* Background Network Animation */}
      <div className="fixed inset-0 pointer-events-none">
        <NetworkNodes />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2AD1C8]/10 border border-[#2AD1C8]/30 mb-6">
            <Truck className="w-4 h-4 text-[#2AD1C8]" />
            <span className="text-sm text-[#2AD1C8]">Driver Network</span>
          </div>

          <h1 className="text-white mb-6">
            Own a Van?<br />
            <span className="bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] bg-clip-text text-transparent">
              Stop Driving Empty.
            </span>
          </h1>

          <p className="text-xl text-white/80 mb-4 max-w-3xl mx-auto">
            Join the Nexus Crux Network. We fill your return journeys with verified, paid jobs.
          </p>
          
          <p className="text-lg text-[#A6F750] mb-12">
            No monthly fees. No quotas. Just work when you want it.
          </p>

          {/* Quick Email Signup */}
          <form onSubmit={handleQuickSignup} className="max-w-md mx-auto mb-8">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90 px-8"
              >
                {isSubmitting ? 'Sending...' : 'Get Started'}
              </Button>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A6F750]" />
              <span>No signup fees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A6F750]" />
              <span>Weekly payments</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#A6F750]" />
              <span>Flexible schedule</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-white mb-6">The Problem with Traditional Van Work</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400">✗</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Empty Return Journeys</h4>
                    <p className="text-white/60 text-sm">Drive to a job, drive back empty. You're losing money on fuel and time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400">✗</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Inconsistent Work</h4>
                    <p className="text-white/60 text-sm">Some weeks are busy, others are dead. Hard to plan finances.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-red-400">✗</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Platform Fees Eating Profits</h4>
                    <p className="text-white/60 text-sm">Monthly subscriptions, commission cuts, booking fees. It adds up.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-white mb-6">The Nexus Crux Solution</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A6F750]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#A6F750]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Fill Your Return Journeys</h4>
                    <p className="text-white/60 text-sm">We match you with jobs heading back your way. Turn empty miles into paid work.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A6F750]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#A6F750]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Steady Stream of Jobs</h4>
                    <p className="text-white/60 text-sm">Tap into major home-service brands needing reliable drivers. Consistent opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A6F750]/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-[#A6F750]" />
                  </div>
                  <div>
                    <h4 className="text-white mb-1">Zero Monthly Fees</h4>
                    <p className="text-white/60 text-sm">No subscriptions. No hidden costs. Keep more of what you earn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">Why Drivers Choose Nexus Crux</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Join hundreds of drivers already earning more with less empty mileage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h3 className="text-white mb-3">Maximise Earnings</h3>
              <p className="text-white/70">
                Turn wasted return journeys into income. Drivers report 30-40% earnings increase.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h3 className="text-white mb-3">Work Your Schedule</h3>
              <p className="text-white/70">
                Accept jobs when you want them. No forced shifts or minimum hours.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h3 className="text-white mb-3">Weekly Payments</h3>
              <p className="text-white/70">
                Get paid every week, on time. Direct to your bank account.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h3 className="text-white mb-3">Verified Jobs Only</h3>
              <p className="text-white/70">
                All jobs from established home-service brands. No time-wasters.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h3 className="text-white mb-3">Smart Route Matching</h3>
              <p className="text-white/70">
                AI matches jobs to your route. No big detours, just efficient work.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h3 className="text-white mb-3">Instant Job Alerts</h3>
              <p className="text-white/70">
                Real-time notifications for jobs on your route. Quick accept.
              </p>
            </BrandCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white mb-4">How It Works</h2>
            <p className="text-white/70">Get started in minutes, not days</p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A1A2F]">1</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-2">Quick Registration</h4>
                <p className="text-white/70">
                  Submit your details, van info, and insurance documents. We verify everything within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A1A2F]">2</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-2">Set Your Availability</h4>
                <p className="text-white/70">
                  Tell us your typical routes and when you're available. Update anytime in the app.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A1A2F]">3</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-2">Get Job Alerts</h4>
                <p className="text-white/70">
                  Receive notifications for jobs matching your route. See all details before accepting.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center flex-shrink-0">
                <span className="text-[#0A1A2F]">4</span>
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-2">Complete Jobs & Get Paid</h4>
                <p className="text-white/70">
                  Do the work, mark complete in the app, get paid weekly. Simple as that.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl text-[#2AD1C8] mb-2">£800+</div>
              <div className="text-white/70">Average monthly boost</div>
            </div>
            <div>
              <div className="text-4xl text-[#2AD1C8] mb-2">35%</div>
              <div className="text-white/70">Fewer empty miles</div>
            </div>
            <div>
              <div className="text-4xl text-[#2AD1C8] mb-2">24hr</div>
              <div className="text-white/70">Approval time</div>
            </div>
            <div>
              <div className="text-4xl text-[#2AD1C8] mb-2">500+</div>
              <div className="text-white/70">Active drivers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white mb-8 text-center">What You Need</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <BrandCard variant="dark">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#2AD1C8]" />
                Vehicle Requirements
              </h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Own or lease a van (SWB or LWB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Valid MOT certificate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Goods in transit insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Clean and well-maintained</span>
                </li>
              </ul>
            </BrandCard>

            <BrandCard variant="dark">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#2AD1C8]" />
                Driver Requirements
              </h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Valid UK driving licence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Clean DBS check (we can arrange)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Professional and reliable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#A6F750] flex-shrink-0 mt-0.5" />
                  <span>Smartphone for app access</span>
                </li>
              </ul>
            </BrandCard>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white mb-12 text-center">What Drivers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <BrandCard variant="dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center">
                  <span className="text-[#0A1A2F]">MJ</span>
                </div>
                <div>
                  <div className="text-white">Mike Johnson</div>
                  <div className="text-white/60 text-sm">London</div>
                </div>
              </div>
              <p className="text-white/70 text-sm italic">
                "Used to drive back empty all the time. Now I fill my return trips and make an extra £200-£300 a week. No brainer."
              </p>
              <div className="flex gap-1 mt-3">
                {[1,2,3,4,5].map(i => (
                  <Award key={i} className="w-4 h-4 text-[#A6F750]" />
                ))}
              </div>
            </BrandCard>

            <BrandCard variant="dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center">
                  <span className="text-[#0A1A2F]">SP</span>
                </div>
                <div>
                  <div className="text-white">Sarah Patel</div>
                  <div className="text-white/60 text-sm">Birmingham</div>
                </div>
              </div>
              <p className="text-white/70 text-sm italic">
                "Love the flexibility. I pick up jobs when they suit my schedule. No pressure, no quotas, just good honest work."
              </p>
              <div className="flex gap-1 mt-3">
                {[1,2,3,4,5].map(i => (
                  <Award key={i} className="w-4 h-4 text-[#A6F750]" />
                ))}
              </div>
            </BrandCard>

            <BrandCard variant="dark">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] flex items-center justify-center">
                  <span className="text-[#0A1A2F]">DT</span>
                </div>
                <div>
                  <div className="text-white">David Thompson</div>
                  <div className="text-white/60 text-sm">Manchester</div>
                </div>
              </div>
              <p className="text-white/70 text-sm italic">
                "Finally a platform that doesn't take the mick with fees. Weekly payments are always on time. Proper professional setup."
              </p>
              <div className="flex gap-1 mt-3">
                {[1,2,3,4,5].map(i => (
                  <Award key={i} className="w-4 h-4 text-[#A6F750]" />
                ))}
              </div>
            </BrandCard>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6F750]/10 border border-[#A6F750]/30 mb-6">
              <Smartphone className="w-4 h-4 text-[#A6F750]" />
              <span className="text-sm text-[#A6F750]">Driver Mobile App</span>
            </div>
            <h2 className="text-white mb-4">Everything You Need in Your Pocket</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Manage your entire driving business from our dedicated mobile app. Accept jobs, track earnings, and get paid — all from your smartphone.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h4 className="text-white mb-3">Real-Time Job Alerts</h4>
              <p className="text-white/70 text-sm">
                Get instant push notifications when jobs match your route. See full details and accept with one tap.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h4 className="text-white mb-3">Smart Navigation</h4>
              <p className="text-white/70 text-sm">
                Built-in navigation with optimised routes. Get turn-by-turn directions to every pickup and delivery.
              </p>
            </BrandCard>

            <BrandCard variant="dark" className="text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2AD1C8]/20 to-[#A6F750]/20 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-[#2AD1C8]" />
              </div>
              <h4 className="text-white mb-3">Track Your Earnings</h4>
              <p className="text-white/70 text-sm">
                Live earnings dashboard with weekly breakdowns, job history, and payment tracking. Complete transparency.
              </p>
            </BrandCard>
          </div>

          <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#2AD1C8]/30 rounded-2xl p-8 text-center">
            <Smartphone className="w-16 h-16 text-[#2AD1C8] mx-auto mb-4" />
            <h3 className="text-white mb-3">Download the Nexus Crux Driver App</h3>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Once your application is approved, you'll receive a download link for our native mobile app for iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-black/30 rounded-lg border border-white/10">
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <div className="text-xs text-white/60">Download on the</div>
                  <div className="text-white">App Store</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 bg-black/30 rounded-lg border border-white/10">
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <div className="text-xs text-white/60">Get it on</div>
                  <div className="text-white">Google Play</div>
                </div>
              </div>
            </div>
            <p className="text-white/50 text-sm mt-4">
              Available after driver approval • iOS 14+ and Android 8+
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-6">
            Ready to Stop Driving Empty?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of drivers already earning more with Nexus Crux
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <BrandButton 
              variant="primary" 
              onClick={() => setShowApplicationModal(true)} 
              className="gap-2"
            >
              Apply Now
              <ChevronRight className="w-5 h-5" />
            </BrandButton>
            <BrandButton 
              variant="outline" 
              onClick={() => setShowDemoModal(true)}
            >
              Try Demo First
            </BrandButton>
          </div>

          <p className="text-white/60 text-sm">
            Questions? Email us at <a href="mailto:drivers@nexuscrux.io" className="text-[#2AD1C8] hover:underline">drivers@nexuscrux.io</a>
          </p>
        </div>
      </section>

      {/* Modals */}
      <DriverApplicationModal
        open={showApplicationModal}
        onOpenChange={setShowApplicationModal}
      />
      <DriverDemoModal
        open={showDemoModal}
        onOpenChange={setShowDemoModal}
      />
    </div>
  );
}