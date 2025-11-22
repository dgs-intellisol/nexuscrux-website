import { motion } from 'motion/react';
import {
  Network,
  Route,
  Brain,
  FileCheck,
  CreditCard,
  Shield,
  Layers,
  Users,
  Sparkles,
  Leaf,
  Lock,
  Zap,
} from 'lucide-react';

export function FeaturesPage() {
  const featureSections = [
    {
      title: 'Multi-Tenant Architecture',
      icon: Layers,
      color: 'from-[#2AD1C8] to-[#2AD1C8]/70',
      features: [
        {
          icon: Network,
          name: 'Complete Tenant Isolation',
          description: 'Logical data separation with tenant-specific databases and access controls.',
        },
        {
          icon: Users,
          name: 'Shared Contractor Pool',
          description: 'Enable contractors to work across multiple brands from a single profile.',
        },
        {
          icon: Sparkles,
          name: 'Custom Branding',
          description: 'White-labeled apps, domains, and communications for each tenant brand.',
        },
      ],
    },
    {
      title: 'Federated Routing System',
      icon: Route,
      color: 'from-[#A6F750] to-[#A6F750]/70',
      features: [
        {
          icon: Brain,
          name: 'AI-Powered Matching',
          description: 'Intelligent contractor matching based on skills, location, and availability.',
        },
        {
          icon: Zap,
          name: 'Real-Time Optimization',
          description: 'Dynamic routing that adapts to changing conditions and priorities.',
        },
        {
          icon: Route,
          name: 'Multi-Criteria Routing',
          description: 'Balance cost, speed, quality, and sustainability in routing decisions.',
        },
      ],
    },
    {
      title: 'AI & Automation',
      icon: Sparkles,
      color: 'from-[#0A1A2F] to-[#0A1A2F]/80',
      features: [
        {
          icon: Brain,
          name: 'Automated Quoting',
          description: 'ML-powered quote generation based on historical data and market conditions.',
        },
        {
          icon: Sparkles,
          name: 'Marketplace Classification',
          description: 'Intelligent categorization and tagging of services and contractors.',
        },
        {
          icon: Leaf,
          name: 'Eco-Credit Management',
          description: 'Automated sustainability tracking and carbon footprint calculation.',
        },
      ],
    },
    {
      title: 'WTN Compliance Engine',
      icon: FileCheck,
      color: 'from-[#2AD1C8] to-[#A6F750]',
      features: [
        {
          icon: FileCheck,
          name: 'Automated WTN Generation',
          description: 'Automatic creation and tracking of Waste Transfer Notes for all applicable jobs.',
        },
        {
          icon: Shield,
          name: 'Regulatory Compliance',
          description: 'Stay compliant with environmental regulations and reporting requirements.',
        },
        {
          icon: Lock,
          name: 'Audit Trails',
          description: 'Complete, immutable records of all waste management activities.',
        },
      ],
    },
    {
      title: 'Payments & Revenue Share',
      icon: CreditCard,
      color: 'from-[#A6F750] to-[#2AD1C8]',
      features: [
        {
          icon: CreditCard,
          name: 'Unified Payment Processing',
          description: 'Single payment gateway with automated splits and contractor payouts.',
        },
        {
          icon: Users,
          name: 'Flexible Revenue Models',
          description: 'Support for commission, flat fees, and hybrid payment structures.',
        },
        {
          icon: Zap,
          name: 'Instant Payouts',
          description: 'Fast contractor payments with detailed earnings breakdowns.',
        },
      ],
    },
    {
      title: 'Security & Compliance',
      icon: Shield,
      color: 'from-[#0A1A2F] to-[#2AD1C8]',
      features: [
        {
          icon: Shield,
          name: 'GDPR Compliant',
          description: 'Full data protection compliance with right to deletion and data portability.',
        },
        {
          icon: Lock,
          name: 'End-to-End Encryption',
          description: 'All data encrypted in transit and at rest with industry-standard protocols.',
        },
        {
          icon: FileCheck,
          name: 'SOC 2 Type II',
          description: 'Certified infrastructure with comprehensive security controls.',
        },
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-white mb-6">Platform Features</h1>
            <p className="text-xl text-white/80">
              A comprehensive suite of tools and capabilities designed for modern multi-tenant service ecosystems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {featureSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-center mb-12">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${section.color} rounded-2xl mb-4`}
                  >
                    <section.icon className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-[#0A1A2F] mb-3">{section.title}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {section.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: featureIndex * 0.1 }}
                      className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/50 hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 rounded-xl flex items-center justify-center mb-4">
                        <feature.icon className="w-6 h-6 text-[#0A1A2F]" />
                      </div>
                      <h3 className="text-[#0A1A2F] mb-2">{feature.name}</h3>
                      <p className="text-[#0A1A2F]/60 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>

                {sectionIndex < featureSections.length - 1 && (
                  <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#0A1A2F]/10 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Technical Capabilities</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Built on modern, scalable infrastructure with enterprise-grade reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { metric: '99.99%', label: 'Uptime SLA' },
              { metric: '<50ms', label: 'API Response' },
              { metric: '10M+', label: 'Jobs Processed' },
              { metric: '24/7', label: 'Support' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 bg-white border border-[#0A1A2F]/10 rounded-2xl"
              >
                <div className="text-4xl text-[#0A1A2F] mb-2">{item.metric}</div>
                <div className="text-[#0A1A2F]/60">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & APIs */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">Integration & APIs</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Comprehensive REST APIs, webhooks, and integrations to connect with your existing systems.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'REST API',
                description: 'Full-featured REST API with comprehensive documentation and SDKs.',
                features: ['Complete CRUD operations', 'Real-time job updates', 'Batch processing'],
              },
              {
                title: 'Webhooks',
                description: 'Real-time event notifications for all platform activities.',
                features: ['Job status changes', 'Payment events', 'Contractor updates'],
              },
              {
                title: 'Integrations',
                description: 'Pre-built integrations with popular business tools.',
                features: ['Payment gateways', 'CRM systems', 'Analytics platforms'],
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6"
              >
                <h3 className="text-white mb-3">{item.title}</h3>
                <p className="text-white/70 mb-4 text-sm">{item.description}</p>
                <ul className="space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 bg-[#A6F750] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Advantages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Why Choose Nexus Crux</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              A platform built from the ground up for multi-tenant service operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Rapid Time to Market',
                description:
                  'Launch new service brands in days, not months. Pre-built infrastructure eliminates development overhead.',
              },
              {
                title: 'Reduced Operational Costs',
                description:
                  'Share resources and infrastructure across brands. Reduce operational costs by up to 60%.',
              },
              {
                title: 'Scalability Without Limits',
                description:
                  'Grow from one brand to hundreds without infrastructure changes. Add locations and contractors instantly.',
              },
              {
                title: 'Built-In Intelligence',
                description:
                  'ReClova AI handles complex decisions automatically, improving efficiency and reducing manual work.',
              },
              {
                title: 'Sustainability First',
                description:
                  'Eco-credits and WTN automation built in, not bolted on. Meet sustainability goals from day one.',
              },
              {
                title: 'Enterprise Security',
                description:
                  'Bank-level security, compliance certifications, and comprehensive audit trails included.',
              },
            ].map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-[#2AD1C8] pl-6"
              >
                <h3 className="text-[#0A1A2F] mb-2">{advantage.title}</h3>
                <p className="text-[#0A1A2F]/60">{advantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
