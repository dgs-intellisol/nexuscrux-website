import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { FlaskConical, CheckCircle, Clock, Shield, Code, Zap, Users, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export function SandboxRequestPage() {
  const [sandboxSubmitting, setSandboxSubmitting] = useState(false);
  const [sandboxSuccess, setSandboxSuccess] = useState(false);
  const [sandboxError, setSandboxError] = useState<string | null>(null);
  const [expectedTimeline, setExpectedTimeline] = useState<string>('');
  const [numberOfUsers, setNumberOfUsers] = useState<string>('');
  const sandboxFormRef = useRef<HTMLFormElement>(null);

  const handleSandboxSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSandboxSubmitting(true);
    setSandboxError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      phone: formData.get('phone') || null,
      jobTitle: formData.get('jobTitle') || null,
      useCase: formData.get('useCase'),
      expectedTimeline: expectedTimeline || null,
      numberOfUsers: numberOfUsers || null,
      technicalContactEmail: formData.get('technicalContactEmail') || null,
      technicalContactName: formData.get('technicalContactName') || null,
    };

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-fa18f4aa/api/contact/sandbox`,
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
        console.error('Sandbox request failed:', data);
        throw new Error(data.error || 'Failed to submit sandbox request');
      }

      console.log('Sandbox request submitted:', data.submissionId);
      setSandboxSuccess(true);
      setExpectedTimeline('');
      setNumberOfUsers('');
      if (sandboxFormRef.current) {
        sandboxFormRef.current.reset();
      }
    } catch (error) {
      console.error('Error submitting sandbox request:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request';
      setSandboxError(errorMessage);
      
      if (error instanceof Error && error.message.includes('sandbox_requests')) {
        console.error('⚠️ DATABASE TABLE MISSING: Please create the sandbox_requests table.');
        console.error('📖 See /DATABASE-TABLES-SETUP.md for instructions');
      }
    } finally {
      setSandboxSubmitting(false);
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Request Sandbox Access - Nexus Crux",
    "description": "Get hands-on access to the Nexus Crux developer sandbox. Test integrations, explore APIs, and build proof-of-concepts risk-free.",
    "provider": {
      "@type": "Organization",
      "name": "Nexus Crux"
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title="Request Sandbox Access - Try Nexus Crux Free"
        description="Get hands-on access to the Nexus Crux developer sandbox. Test integrations, explore APIs, and build proof-of-concepts risk-free with full platform access."
        keywords="sandbox access, developer sandbox, free trial, API testing, platform trial, test environment"
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-2xl mb-6">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-white mb-6">Request Sandbox Access</h1>
            <p className="text-xl text-white/80">
              Get hands-on with Nexus Crux. Test integrations, explore APIs, and build proof-of-concepts in a risk-free environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">What's Included in Your Sandbox</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Full access to the Nexus Crux platform with sample data and test credentials.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: 'Full API Access',
                description: 'Complete access to all REST APIs with comprehensive documentation and interactive examples.',
              },
              {
                icon: Zap,
                title: '10,000 API Calls',
                description: 'Generous API call limit to thoroughly test your integration scenarios.',
              },
              {
                icon: Shield,
                title: 'Isolated Environment',
                description: 'Your own secure sandbox completely isolated from production systems.',
              },
              {
                icon: Users,
                title: 'Multi-User Access',
                description: 'Invite your team members to collaborate on testing and development.',
              },
              {
                icon: Clock,
                title: '30-Day Access',
                description: 'Full sandbox access for 30 days, extendable upon request.',
              },
              {
                icon: FlaskConical,
                title: 'Sample Data',
                description: 'Pre-populated with realistic test data to get you started immediately.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-[#0A1A2F]/10 rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-2">{feature.title}</h3>
                <p className="text-[#0A1A2F]/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Get Started Now</h2>
            <p className="text-[#0A1A2F]/60">
              Fill out the form below and we'll provision your sandbox environment within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-8"
          >
            <form onSubmit={handleSandboxSubmit} ref={sandboxFormRef} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-[#0A1A2F] mb-4 pb-2 border-b border-[#0A1A2F]/10">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Name *</label>
                    <Input type="text" name="name" placeholder="Jane Smith" required disabled={sandboxSuccess} />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Email *</label>
                    <Input type="email" name="email" placeholder="jane@company.com" required disabled={sandboxSuccess} />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Company *</label>
                    <Input type="text" name="company" placeholder="Your Company" required disabled={sandboxSuccess} />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Phone</label>
                    <Input type="tel" name="phone" placeholder="+44 20 7946 0958" disabled={sandboxSuccess} />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Job Title</label>
                    <Input type="text" name="jobTitle" placeholder="CTO, Lead Developer, etc." disabled={sandboxSuccess} />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Expected Timeline</label>
                    <Select name="expectedTimeline" disabled={sandboxSuccess} value={expectedTimeline} onValueChange={setExpectedTimeline}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                        <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                        <SelectItem value="1-2months">1-2 months</SelectItem>
                        <SelectItem value="3+months">3+ months</SelectItem>
                        <SelectItem value="evaluating">Just evaluating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-[#0A1A2F] mb-4 pb-2 border-b border-[#0A1A2F]/10">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Use Case *</label>
                    <Textarea 
                      name="useCase" 
                      placeholder="Describe what you'd like to build or test in the sandbox... (e.g., 'Testing job routing between 3 home service brands', 'Building contractor mobile app integration', etc.)" 
                      rows={4} 
                      required 
                      disabled={sandboxSuccess}
                    />
                    <p className="text-xs text-[#0A1A2F]/50 mt-1">Help us understand your needs so we can configure the sandbox appropriately.</p>
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Number of Users</label>
                    <Select name="numberOfUsers" disabled={sandboxSuccess} value={numberOfUsers} onValueChange={setNumberOfUsers}>
                      <SelectTrigger>
                        <SelectValue placeholder="How many people will use the sandbox?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2-5">2-5 people</SelectItem>
                        <SelectItem value="6-10">6-10 people</SelectItem>
                        <SelectItem value="11+">11+ people</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Technical Contact (Optional) */}
              <div>
                <h3 className="text-[#0A1A2F] mb-4 pb-2 border-b border-[#0A1A2F]/10">Technical Contact (Optional)</h3>
                <p className="text-sm text-[#0A1A2F]/60 mb-4">If different from above, who should receive technical documentation and credentials?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Technical Contact Name</label>
                    <Input type="text" name="technicalContactName" placeholder="John Developer" disabled={sandboxSuccess} />
                  </div>
                  <div>
                    <label className="block text-sm text-[#0A1A2F] mb-2">Technical Contact Email</label>
                    <Input type="email" name="technicalContactEmail" placeholder="john@company.com" disabled={sandboxSuccess} />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              {sandboxSuccess ? (
                <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#2AD1C8]/30 rounded-xl p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#2AD1C8] flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-[#0A1A2F] mb-2">Request Submitted Successfully!</h4>
                      <p className="text-[#0A1A2F]/80 text-sm mb-4">
                        We've received your sandbox request and will provision your environment within 24 hours. You'll receive an email with:
                      </p>
                      <ul className="space-y-2 text-sm text-[#0A1A2F]/80">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                          <span>Your unique sandbox URL</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                          <span>API credentials and access tokens</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                          <span>Getting started guide and documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                          <span>Sample code and integration examples</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90"
                    disabled={sandboxSubmitting}
                  >
                    {sandboxSubmitting ? 'Submitting Request...' : 'Request Sandbox Access'}
                  </Button>
                  <p className="text-xs text-[#0A1A2F]/50 text-center">
                    By requesting access, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </>
              )}

              {sandboxError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-2">
                    <div className="text-red-600 text-sm">
                      <strong>Error:</strong> {sandboxError}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">How It Works</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              From request to fully functional sandbox in just a few simple steps.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Submit Request',
                description: 'Fill out the form above with your details and use case.',
              },
              {
                step: '2',
                title: 'Review & Approval',
                description: 'Our team reviews your request (usually within 4 hours).',
              },
              {
                step: '3',
                title: 'Provisioning',
                description: 'Your isolated sandbox environment is automatically created.',
              },
              {
                step: '4',
                title: 'Start Building',
                description: 'Receive credentials and start testing integrations immediately.',
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-2xl mb-4">
                    <span className="text-2xl text-white">{step.step}</span>
                  </div>
                  <h3 className="text-[#0A1A2F] mb-2">{step.title}</h3>
                  <p className="text-[#0A1A2F]/60 text-sm">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] opacity-30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'How long does it take to get sandbox access?',
                answer: 'Most sandbox requests are approved and provisioned within 24 hours. If you need urgent access, mention it in your use case and we will prioritize your request.',
              },
              {
                question: 'Is the sandbox really free?',
                answer: 'Yes! Sandbox access is completely free for 30 days with no credit card required. We want you to thoroughly test Nexus Crux before making any commitment.',
              },
              {
                question: 'Can I extend my sandbox access beyond 30 days?',
                answer: 'Absolutely. If you need more time, just reach out to us before your sandbox expires. Extensions are granted on a case-by-case basis.',
              },
              {
                question: 'What data is included in the sandbox?',
                answer: 'Your sandbox comes pre-populated with realistic sample data including test jobs, contractors, tenants, and transactions. All data is synthetic and safe to modify.',
              },
              {
                question: 'Can my team collaborate in the sandbox?',
                answer: 'Yes! You can invite team members to your sandbox. Each member gets their own credentials while sharing the same test environment.',
              },
              {
                question: 'What happens after the sandbox period?',
                answer: 'You can easily convert your sandbox to a production account. Your configuration and integrations will be preserved, and we will help you migrate smoothly.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-[#0A1A2F]/10 rounded-xl p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-[#0A1A2F] mb-2">{faq.question}</h3>
                    <p className="text-[#0A1A2F]/60 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <h2 className="text-[#0A1A2F] mb-4">Questions About Sandbox Access?</h2>
            <p className="text-[#0A1A2F]/80 mb-8">
              Our team is here to help you get started. Reach out anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#0A1A2F] text-white hover:bg-[#0A1A2F]/90">
                <Link to="/contact">Contact Sales</Link>
              </Button>
              <Button asChild variant="outline" className="border-[#0A1A2F] text-[#0A1A2F] hover:bg-[#0A1A2F]/10">
                <Link to="/documentation">View Documentation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}