import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Mail, MapPin, Phone, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { contactEmails } from '../config/socialMedia';

export function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Nexus Crux",
      "email": "hello@nexuscrux.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Sales",
        "email": "hello@nexuscrux.com"
      }
    }
  };

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const phone = formData.get('phone');
    const companySize = formData.get('companySize');
    const interest = formData.get('interest');
    const preferredDate = formData.get('preferredDate');
    const additionalInfo = formData.get('additionalInfo');
    
    const subject = 'Demo Request - Nexus Crux';
    const body = `Demo Request\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nPhone: ${phone || 'Not provided'}\nCompany Size: ${companySize}\nInterested in: ${interest}\nPreferred Demo Date: ${preferredDate || 'Flexible'}\n\nAdditional Information:\n${additionalInfo || 'None'}`;
    
    window.location.href = `mailto:${contactEmails.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleInquirySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const partnershipType = formData.get('partnershipType');
    const message = formData.get('message');
    
    const subject = 'Partnership Inquiry - Nexus Crux';
    const body = `Partnership Inquiry\n\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nPartnership Type: ${partnershipType}\n\nMessage:\n${message}`;
    
    window.location.href = `mailto:${contactEmails.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Contact Us - Schedule a Demo"
        description="Get in touch with Nexus Crux. Schedule a demo, discuss pricing, or learn how our multi-tenant service bus platform can transform your operations."
        keywords="contact, schedule demo, support, sales inquiry, book consultation"
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

      {/* Contact Forms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Demo Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white border border-[#0A1A2F]/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-[#0A1A2F]">Book a Demo</h2>
                </div>
                <p className="text-[#0A1A2F]/60 mb-6">
                  Schedule a personalized demo to see how Nexus Crux can transform your operations.
                </p>

                <form className="space-y-4" onSubmit={handleDemoSubmit}>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Full Name *</label>
                    <Input type="text" placeholder="John Doe" name="name" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Work Email *</label>
                    <Input type="email" placeholder="john@company.com" name="email" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Company Name *</label>
                    <Input type="text" placeholder="Your Company" name="company" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Phone Number</label>
                    <Input type="tel" placeholder="+44 20 7946 0958" name="phone" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Company Size *</label>
                    <Select name="companySize">
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                        <SelectItem value="1000+">1,000+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">I'm interested in...</label>
                    <Select name="interest">
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tenant">Launching a new brand</SelectItem>
                        <SelectItem value="contractor">Becoming a contractor</SelectItem>
                        <SelectItem value="enterprise">Enterprise solution</SelectItem>
                        <SelectItem value="partnership">Partnership opportunities</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Preferred Demo Date</label>
                    <Input type="date" name="preferredDate" />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Additional Information</label>
                    <Textarea placeholder="Tell us about your needs..." rows={3} name="additionalInfo" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90">
                    Schedule Demo
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Partner Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-50 to-white border border-[#0A1A2F]/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#A6F750] to-[#2AD1C8] rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-[#0A1A2F]">Partner Inquiry</h2>
                </div>
                <p className="text-[#0A1A2F]/60 mb-6">
                  Interested in partnering with Nexus Crux? Let's explore opportunities together.
                </p>

                <form className="space-y-4" onSubmit={handleInquirySubmit}>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Full Name *</label>
                    <Input type="text" placeholder="Jane Smith" name="name" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Work Email *</label>
                    <Input type="email" placeholder="jane@partner.com" name="email" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Company Name *</label>
                    <Input type="text" placeholder="Partner Company" name="company" required />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Partnership Type *</label>
                    <Select name="partnershipType">
                      <SelectTrigger>
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
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Message *</label>
                    <Textarea placeholder="Tell us about your partnership idea..." rows={6} name="message" required />
                  </div>
                  <Button className="w-full bg-[#0A1A2F] text-white hover:bg-[#0A1A2F]/90">
                    Send Inquiry
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
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
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#0A1A2F] mb-2">Email</h3>
              <p className="text-[#0A1A2F]/60 text-sm mb-1">General Inquiries</p>
              <a
                href={`mailto:${contactEmails.general}`}
                className="text-[#2AD1C8] hover:text-[#2AD1C8]/80 transition-colors"
              >
                {contactEmails.general}
              </a>
              <p className="text-[#0A1A2F]/60 text-sm mt-3 mb-1">Sales</p>
              <a
                href={`mailto:${contactEmails.sales}`}
                className="text-[#2AD1C8] hover:text-[#2AD1C8]/80 transition-colors"
              >
                {contactEmails.sales}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#0A1A2F] mb-2">Phone</h3>
              <p className="text-[#0A1A2F]/60 text-sm mb-1">Sales & Support</p>
              <a
                href="tel:+442079460958"
                className="text-[#2AD1C8] hover:text-[#2AD1C8]/80 transition-colors"
              >
                +44 20 7946 0958
              </a>
              <p className="text-[#0A1A2F]/60 text-sm mt-3">Mon-Fri, 9am-6pm GMT</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 text-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-[#0A1A2F] mb-2">Office</h3>
              <p className="text-[#0A1A2F]/60 text-sm">
                25 Cabot Square
                <br />
                Canary Wharf, London E14 4QZ
                <br />
                United Kingdom
              </p>
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