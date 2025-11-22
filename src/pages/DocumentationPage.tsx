import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Book, Code, Zap, Lock, Puzzle, GitBranch } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { contactEmails } from '../config/socialMedia';

export function DocumentationPage() {
  return (
    <div className="bg-white">
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
                className="block bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-2">{item.title}</h3>
                <p className="text-[#0A1A2F]/60 text-sm">{item.description}</p>
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
                https://api.nexuscrux.com/v1
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
                <div className="text-[#2AD1C8]">curl https://api.nexuscrux.com/v1/jobs \</div>
                <div className="text-[#A6F750] ml-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                <div className="text-[#A6F750] ml-4">-H "Content-Type: application/json" \</div>
                <div className="text-[#A6F750] ml-4">-d {'\'{"status": "pending"}\''}</div>
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
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Request Sandbox Access</h2>
            <p className="text-[#0A1A2F]/60">
              Get started with our developer sandbox to test integrations risk-free.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-8"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name');
              const email = formData.get('email');
              const company = formData.get('company');
              const useCase = formData.get('useCase');
              const subject = 'Sandbox Access Request';
              const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nUse Case:\n${useCase}`;
              window.location.href = `mailto:${contactEmails.sales}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }}
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Name</label>
                <Input type="text" name="name" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Email</label>
                <Input type="email" name="email" placeholder="john@company.com" required />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Company</label>
                <Input type="text" name="company" placeholder="Your Company" required />
              </div>
              <div>
                <label className="block text-sm text-[#0A1A2F] mb-2">Use Case</label>
                <Textarea name="useCase" placeholder="Briefly describe what you'd like to build..." rows={4} required />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90">
                Request Sandbox Access
              </Button>
            </div>
          </motion.form>
        </div>
      </section>
    </div>
  );
}