import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Mail, MapPin, Phone, Calendar, CheckCircle, Handshake, FlaskConical } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { contactEmails } from '../config/socialMedia';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export function ContactPage() {
  // Demo Request State
  const [demoSubmitting, setDemoSubmitting] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoError, setDemoError] = useState<string | null>(null);
  const demoFormRef = useRef<HTMLFormElement>(null);
  
  // Partner Inquiry State
  const [partnerSubmitting, setPartnerSubmitting] = useState(false);
  const [partnerSuccess, setPartnerSuccess] = useState(false);
  const [partnerError, setPartnerError] = useState<string | null>(null);
  const partnerFormRef = useRef<HTMLFormElement>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Nexus Crux",
      "email": "hello@nexuscrux.io",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "hello@nexuscrux.io"
      }
    }
  };

  // Demo Request Handler
  const handleDemoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDemoSubmitting(true);
    setDemoError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone') || null,
      companySize: formData.get('companySize') || null,
      interest: formData.get('interest') || null,
      preferredDate: formData.get('preferredDate') || null,
      additionalInfo: formData.get('additionalInfo') || null,
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/demo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Demo request failed:', data);
        throw new Error(data.error || 'Failed to submit demo request');
      }

      console.log('Demo request submitted:', data.submissionId);
      setDemoSuccess(true);
      if (demoFormRef.current) {
        demoFormRef.current.reset();
      }
    } catch (error) {
      console.error('Error submitting demo request:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request';
      setDemoError(errorMessage);
      
      if (error instanceof Error && error.message.includes('demo_requests')) {
        console.error('⚠️ DATABASE TABLE MISSING: Please create the demo_requests table.');
        console.error('📖 See /DATABASE-TABLES-SETUP.md for instructions');
      }
    } finally {
      setDemoSubmitting(false);
    }
  };

  // Partner Inquiry Handler
  const handlePartnerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPartnerSubmitting(true);
    setPartnerError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone') || null,
      jobTitle: formData.get('jobTitle') || null,
      companyWebsite: formData.get('companyWebsite') || null,
      partnershipType: formData.get('partnershipType'),
      message: formData.get('message'),
      revenuePotential: formData.get('revenuePotential') || null,
      geographicFocus: formData.get('geographicFocus') || null,
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/partner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('Partner inquiry failed:', data);
        throw new Error(data.error || 'Failed to submit partner inquiry');
      }

      console.log('Partner inquiry submitted:', data.submissionId);
      setPartnerSuccess(true);
      if (partnerFormRef.current) {
        partnerFormRef.current.reset();
      }
    } catch (error) {
      console.error('Error submitting partner inquiry:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit inquiry';
      setPartnerError(errorMessage);
      
      if (error instanceof Error && error.message.includes('partner_inquiries')) {
        console.error('⚠️ DATABASE TABLE MISSING: Please create the partner_inquiries table.');
        console.error('📖 See /DATABASE-TABLES-SETUP.md for instructions');
      }
    } finally {
      setPartnerSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Contact Us - Schedule a Demo"
        description="Get in touch with Nexus Crux. Schedule a demo, request sandbox access, or explore partnership opportunities."
        keywords="contact, schedule demo, sandbox, trial, partnership, support"
        structuredData={structuredData}
      />
      
      {/* Hero */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-white mb-6">Get In Touch</h1>
            <p className="text-xl text-white/80">
              Ready to transform your service operations? Let's talk about how Nexus Crux can power your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Forms - Grid of 2 */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Demo Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white border border-[#0A1A2F]/10 rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-[#0A1A2F]">Book a Demo</h2>
                </div>
                <p className="text-[#0A1A2F]/60 text-sm mb-4">
                  See Nexus Crux in action with a personalized demo.
                </p>

                <form className="space-y-3 flex-grow flex flex-col" onSubmit={handleDemoSubmit} ref={demoFormRef}>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Name *</label>
                    <Input type="text" placeholder="John Doe" name="name" required disabled={demoSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Email *</label>
                    <Input type="email" placeholder="john@company.com" name="email" required disabled={demoSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Company *</label>
                    <Input type="text" placeholder="Your Company" name="company" required disabled={demoSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Phone</label>
                    <Input type="tel" placeholder="+44 20 7946 0958" name="phone" disabled={demoSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Company Size</label>
                    <Select name="companySize" disabled={demoSuccess}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10</SelectItem>
                        <SelectItem value="11-50">11-50</SelectItem>
                        <SelectItem value="51-200">51-200</SelectItem>
                        <SelectItem value="201-1000">201-1,000</SelectItem>
                        <SelectItem value="1000+">1,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Preferred Date</label>
                    <Input type="date" name="preferredDate" disabled={demoSuccess} className="h-9" />
                  </div>
                  <div className="flex-grow">
                    <label className="block text-sm text-[#0A1A2F] mb-1">Additional Info</label>
                    <Textarea placeholder="Tell us..." rows={2} name="additionalInfo" disabled={demoSuccess} />
                  </div>
                  
                  {demoSuccess ? (
                    <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#2AD1C8]/30 rounded-lg p-3 mt-auto">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#0A1A2F]">Demo request submitted! We'll contact you shortly.</p>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90 mt-auto"
                      disabled={demoSubmitting}
                    >
                      {demoSubmitting ? 'Submitting...' : 'Schedule Demo'}
                    </Button>
                  )}
                  
                  {demoError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{demoError}</p>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Partner Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white border border-[#0A1A2F]/10 rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-[#0A1A2F]">Partner Inquiry</h2>
                </div>
                <p className="text-[#0A1A2F]/60 text-sm mb-4">
                  Explore partnership opportunities with Nexus Crux.
                </p>

                <form className="space-y-3 flex-grow flex flex-col" onSubmit={handlePartnerSubmit} ref={partnerFormRef}>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Name *</label>
                    <Input type="text" placeholder="Alex Johnson" name="name" required disabled={partnerSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Email *</label>
                    <Input type="email" placeholder="alex@partner.com" name="email" required disabled={partnerSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Company *</label>
                    <Input type="text" placeholder="Partner Inc" name="company" required disabled={partnerSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Phone</label>
                    <Input type="tel" placeholder="+44 20 7946 0958" name="phone" disabled={partnerSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Company Website</label>
                    <Input type="url" placeholder="https://..." name="companyWebsite" disabled={partnerSuccess} className="h-9" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-1">Partnership Type *</label>
                    <Select name="partnershipType" disabled={partnerSuccess}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="integration">Technology Integration</SelectItem>
                        <SelectItem value="reseller">Reseller Partnership</SelectItem>
                        <SelectItem value="referral">Referral Program</SelectItem>
                        <SelectItem value="strategic">Strategic Alliance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-grow">
                    <label className="block text-sm text-[#0A1A2F] mb-1">Message *</label>
                    <Textarea placeholder="Tell us about your partnership idea..." rows={2} name="message" required disabled={partnerSuccess} />
                  </div>
                  
                  {partnerSuccess ? (
                    <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#2AD1C8]/30 rounded-lg p-3 mt-auto">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-[#0A1A2F]">Partner inquiry submitted! Our team will review and contact you soon.</p>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-gradient-to-r from-[#A6F750] to-[#2AD1C8] text-[#0A1A2F] hover:opacity-90 mt-auto"
                      disabled={partnerSubmitting}
                    >
                      {partnerSubmitting ? 'Submitting...' : 'Send Inquiry'}
                    </Button>
                  )}
                  
                  {partnerError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-sm text-red-600">{partnerError}</p>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sandbox CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-2xl mb-6">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white mb-4">Try Before You Buy</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get hands-on with our developer sandbox. Test integrations, explore APIs, and build proof-of-concepts with full platform access—completely free for 30 days.
            </p>
            <Button asChild className="bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90 text-lg px-8 py-6 h-auto">
              <Link to="/sandbox">Request Sandbox Access</Link>
            </Button>
            <p className="text-white/60 text-sm mt-4">
              No credit card required • 10,000 API calls • Full documentation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Other Ways to Reach Us</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Prefer a different method of contact? We're here to help.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 text-center hover:border-[#2AD1C8]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/0 to-[#A6F750]/0 group-hover:from-[#2AD1C8]/5 group-hover:to-[#A6F750]/5 transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#2AD1C8]/20 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-3">Email</h3>
                <a
                  href={`mailto:${contactEmails.hello}`}
                  className="text-[#2AD1C8] hover:text-[#2AD1C8]/80 transition-colors inline-block"
                >
                  {contactEmails.hello}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative bg-gradient-to-br from-white via-white to-[#A6F750]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 text-center hover:border-[#A6F750]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#A6F750]/0 to-[#2AD1C8]/0 group-hover:from-[#A6F750]/5 group-hover:to-[#2AD1C8]/5 transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#A6F750] to-[#2AD1C8] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#A6F750]/20 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-2">Phone</h3>
                <p className="text-[#0A1A2F]/60 text-sm mb-2">Sales & Support</p>
                <a
                  href="tel:+442079460958"
                  className="text-[#2AD1C8] hover:text-[#2AD1C8]/80 transition-colors inline-block"
                >
                  +44 20 7946 0958
                </a>
                <p className="text-[#0A1A2F]/60 text-sm mt-3">Mon-Fri, 9am-6pm GMT</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 text-center hover:border-[#2AD1C8]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/0 to-[#A6F750]/0 group-hover:from-[#2AD1C8]/5 group-hover:to-[#A6F750]/5 transition-all duration-500 rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#2AD1C8]/20 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-3">Office</h3>
                <p className="text-[#0A1A2F]/60 text-sm leading-relaxed">
                  25 Cabot Square
                  <br />
                  Canary Wharf, London E14 4QZ
                  <br />
                  United Kingdom
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#0A1A2F] mb-4">Join the Federated Revolution</h2>
            <p className="text-[#0A1A2F]/80 mb-8">
              See how Nexus Crux can transform your service operations with intelligent, sustainable technology.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}