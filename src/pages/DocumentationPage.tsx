import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Book, Code, Zap, Lock, Puzzle, GitBranch, CheckCircle, FlaskConical } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { contactEmails } from '../config/socialMedia';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export function DocumentationPage() {
  // Sandbox Request State
  const [sandboxSubmitting, setSandboxSubmitting] = useState(false);
  const [sandboxSuccess, setSandboxSuccess] = useState(false);
  const [sandboxError, setSandboxError] = useState<string | null>(null);
  const sandboxFormRef = useRef<HTMLFormElement>(null);

  // Sandbox Request Handler
  const handleSandboxSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSandboxSubmitting(true);
    setSandboxError(null);
    
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      useCase: formData.get('useCase'),
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

  return (
    <div className="bg-white">
      <SEO 
        title="Developer Documentation - API & Integration Guides"
        description="Comprehensive developer documentation for Nexus Crux. API references, webhooks, SDKs, and integration guides. Request sandbox access to test integrations."
        keywords="API documentation, developer docs, REST API, webhooks, integration, sandbox, SDK"
      />
      
      {/* Hero */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-white mb-6">Developer Documentation</h1>
            <p className="text-xl text-white/80">
              Comprehensive guides, API references, and resources to integrate with the Nexus Crux platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Documentation Overview</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Everything you need to build on top of the Nexus Crux platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code,
                title: 'API Reference',
                description: 'Complete REST API documentation with examples and code snippets.',
                link: '#api',
              },
              {
                icon: Zap,
                title: 'Webhooks',
                description: 'Real-time event notifications for platform activities.',
                link: '#webhooks',
              },
              {
                icon: Lock,
                title: 'System Architecture',
                description: 'Understanding the federated service bus architecture.',
                link: '#architecture',
              },
              {
                icon: Book,
                title: 'Guides',
                description: 'Step-by-step tutorials for common integration scenarios.',
                link: '#guides',
              },
              {
                icon: Puzzle,
                title: 'SDKs',
                description: 'Official SDKs for JavaScript, Python, Ruby, and more.',
                link: '#sdks',
              },
              {
                icon: GitBranch,
                title: 'Changelog',
                description: 'Latest updates, improvements, and deprecation notices.',
                link: '#changelog',
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group block relative bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/0 to-[#A6F750]/0 group-hover:from-[#2AD1C8]/5 group-hover:to-[#A6F750]/5 transition-all duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#2AD1C8]/20 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[#0A1A2F] mb-2">{item.title}</h3>
                  <p className="text-[#0A1A2F]/60 text-sm">{item.description}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* API Overview */}
      <section id="api" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">API Overview</h2>
            <p className="text-[#0A1A2F]/60 max-w-3xl">
              The Nexus Crux API is organized around REST. Our API has predictable resource-oriented URLs, accepts
              JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6"
            >
              <h3 className="text-[#0A1A2F] mb-4">Base URL</h3>
              <div className="bg-[#0A1A2F] text-[#A6F750] p-4 rounded-lg text-sm font-mono mb-4">
                https://api.nexuscrux.io/v1
              </div>
              <h3 className="text-[#0A1A2F] mb-4">Authentication</h3>
              <div className="bg-[#0A1A2F] text-white p-4 rounded-lg text-sm font-mono mb-2">
                Authorization: Bearer YOUR_API_KEY
              </div>
              <p className="text-sm text-[#0A1A2F]/60">
                Authenticate by including your API key in the Authorization header of each request.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6"
            >
              <h3 className="text-[#0A1A2F] mb-4">Example Request</h3>
              <div className="bg-[#0A1A2F] text-white p-4 rounded-lg text-sm font-mono overflow-x-auto">
                <div className="text-[#2AD1C8]">curl https://api.nexuscrux.io/v1/jobs \</div>
                <div className="text-[#A6F750] ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                <div className="text-[#A6F750] ml-4">-H "Content-Type: application/json" \</div>
                <div className="text-[#A6F750] ml-4">-d {'\'{\"status\": \"pending\"}\''}</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {[
              { endpoint: 'Jobs', path: '/v1/jobs' },
              { endpoint: 'Contractors', path: '/v1/contractors' },
              { endpoint: 'Tenants', path: '/v1/tenants' },
              { endpoint: 'Payments', path: '/v1/payments' },
            ].map((endpoint, index) => (
              <motion.div
                key={endpoint.endpoint}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-[#0A1A2F]/10 rounded-xl p-4"
              >
                <div className="text-[#0A1A2F] mb-1">{endpoint.endpoint}</div>
                <div className="text-xs text-[#0A1A2F]/60 font-mono">{endpoint.path}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Webhooks */}
      <section id="webhooks" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Webhooks</h2>
            <p className="text-[#0A1A2F]/60 max-w-3xl">
              Webhooks allow you to receive real-time notifications when events occur in your Nexus Crux account.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: 'Job Events',
                events: ['job.created', 'job.assigned', 'job.completed', 'job.cancelled'],
              },
              {
                category: 'Payment Events',
                events: ['payment.succeeded', 'payment.failed', 'payout.created', 'payout.paid'],
              },
              {
                category: 'Contractor Events',
                events: ['contractor.verified', 'contractor.suspended', 'rating.created'],
              },
            ].map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 border border-[#0A1A2F]/10 rounded-xl p-6"
              >
                <h3 className="text-[#0A1A2F] mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.events.map((event) => (
                    <li key={event} className="text-sm text-[#0A1A2F]/80 font-mono">
                      {event}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section id="architecture" className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">System Architecture</h2>
            <p className="text-white/80 max-w-3xl mx-auto">
              Understanding the multi-tenant federated service bus architecture.
            </p>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
            <div className="space-y-6">
              {[
                {
                  layer: 'Client Layer',
                  description: 'Mobile apps, web portals, and third-party integrations',
                  color: 'border-[#2AD1C8]',
                },
                {
                  layer: 'API Gateway',
                  description: 'Authentication, rate limiting, and request routing',
                  color: 'border-[#A6F750]',
                },
                {
                  layer: 'Service Bus',
                  description: 'Job routing, tenant isolation, and event orchestration',
                  color: 'border-white',
                },
                {
                  layer: 'ReClova AI',
                  description: 'ML models for routing, quoting, and optimization',
                  color: 'border-[#2AD1C8]',
                },
                {
                  layer: 'Data Layer',
                  description: 'Multi-tenant databases with complete logical separation',
                  color: 'border-[#A6F750]',
                },
              ].map((layer, index) => (
                <motion.div
                  key={layer.layer}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-l-4 ${layer.color} pl-6 py-2`}
                >
                  <div className="text-white mb-1">{layer.layer}</div>
                  <div className="text-sm text-white/70">{layer.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sandbox Request */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-2xl mb-6">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-[#0A1A2F] mb-4">Ready to Start Building?</h2>
            <p className="text-[#0A1A2F]/60 mb-8 max-w-2xl mx-auto">
              Get hands-on access to our developer sandbox. Test integrations, explore APIs, and build proof-of-concepts in a risk-free environment.
            </p>
            <Button asChild className="bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90">
              <Link to="/sandbox">Request Sandbox Access</Link>
            </Button>
            <p className="text-sm text-[#0A1A2F]/50 mt-4">
              Free 30-day access • Full API access • No credit card required
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}