import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Target, Eye, Leaf, Users, Network, Sparkles } from 'lucide-react';

export function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Nexus Crux",
      "description": "Multi-tenant federated service bus platform connecting home-service brands with verified contractors"
    }
  };

  return (
    <div className="bg-white">
      <SEO 
        title="About Us - Where Connections Become Capability"
        description="Learn about Nexus Crux: Our mission to transform service operations through federated technology, AI orchestration, and sustainable practices."
        keywords="about us, company mission, our story, team, values, sustainability"
        structuredData={structuredData}
      />
      
      {/* Hero */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-white mb-6">About Nexus Crux</h1>
            <p className="text-xl text-white/80">
              Building the future of federated service ecosystems, where connections become capability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#0A1A2F] mb-4">Our Mission</h2>
              <p className="text-[#0A1A2F]/60 mb-4">
                To empower service brands and contractors through intelligent, federated technology that maximizes
                efficiency, reduces waste, and prioritizes sustainability.
              </p>
              <p className="text-[#0A1A2F]/60">
                We believe that the future of service operations lies in shared infrastructure, intelligent
                orchestration, and eco-conscious decision-making.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#A6F750] to-[#2AD1C8] rounded-xl flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-[#0A1A2F] mb-4">Our Vision</h2>
              <p className="text-[#0A1A2F]/60 mb-4">
                A world where every service brand can launch and scale without building infrastructure from scratch,
                where contractors maximize earnings across multiple brands, and where sustainability is built into every
                transaction.
              </p>
              <p className="text-[#0A1A2F]/60">
                We're creating the operating system for the next generation of home-service businesses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Nexus Crux ↔ ReClova Relationship */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">Nexus Crux ↔ ReClova™</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Understanding the relationship between our platform and our AI engine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <Network className="w-12 h-12 text-[#2AD1C8] mb-4" />
              <h3 className="text-white mb-3">Nexus Crux Platform</h3>
              <p className="text-white/80 mb-4">
                The multi-tenant federated service bus that connects brands, contractors, and customers. Handles
                infrastructure, security, payments, and compliance.
              </p>
              <ul className="space-y-2">
                {[
                  'Multi-tenant architecture',
                  'Service bus & routing',
                  'Identity management',
                  'Payment processing',
                  'Compliance automation',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 bg-[#2AD1C8] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <Sparkles className="w-12 h-12 text-[#A6F750] mb-4" />
              <h3 className="text-white mb-3">ReClova™ AI Engine</h3>
              <p className="text-white/80 mb-4">
                The intelligence layer that powers decision-making across the platform. Learns from every interaction to
                optimize routing, pricing, and sustainability.
              </p>
              <ul className="space-y-2">
                {[
                  'Intelligent job routing',
                  'Automated quoting',
                  'Eco-credit optimization',
                  'Predictive analytics',
                  'Marketplace classification',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                    <div className="w-1.5 h-1.5 bg-[#A6F750] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <p className="text-white/70">
              Together, they form a complete ecosystem: Nexus Crux provides the infrastructure, ReClova™ provides the
              intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Federated Ecosystem */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">The Federated Service Ecosystem</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              A new model for service operations built on collaboration, shared resources, and intelligent orchestration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Network,
                title: 'Shared Infrastructure',
                description:
                  'Multiple brands share platform resources, reducing costs and accelerating time-to-market.',
              },
              {
                icon: Users,
                title: 'Pooled Resources',
                description:
                  'Contractors work across brands, maximizing utilization and earnings while maintaining quality.',
              },
              {
                icon: Sparkles,
                title: 'Intelligent Orchestration',
                description:
                  'AI-powered routing ensures optimal matching between jobs, contractors, and customer needs.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-2">{item.title}</h3>
                <p className="text-[#0A1A2F]/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-20 bg-gradient-to-br from-[#A6F750]/10 to-[#2AD1C8]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Leaf className="w-12 h-12 text-[#A6F750] mb-4" />
              <h2 className="text-[#0A1A2F] mb-4">Our Sustainability Commitment</h2>
              <p className="text-[#0A1A2F]/60 mb-4">
                Sustainability isn't a feature—it's fundamental to how we build. Every decision, from routing
                algorithms to infrastructure choices, considers environmental impact.
              </p>
              <p className="text-[#0A1A2F]/60">
                Through automated WTN tracking, eco-credit systems, and carbon-conscious routing, we're helping the
                service industry reduce its environmental footprint while improving efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-8"
            >
              <h3 className="text-[#0A1A2F] mb-6">Sustainability by Design</h3>
              <div className="space-y-4">
                {[
                  {
                    metric: 'Carbon Tracking',
                    description: 'Automatic calculation for every job',
                  },
                  {
                    metric: 'Waste Diversion',
                    description: 'Automated WTN and compliance reporting',
                  },
                  {
                    metric: 'Eco-Routing',
                    description: 'Optimize for sustainability, not just speed',
                  },
                  {
                    metric: 'Green Credits',
                    description: 'Reward and incentivize sustainable practices',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.metric}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-4 border-[#A6F750] pl-4"
                  >
                    <div className="text-[#0A1A2F] mb-1">{item.metric}</div>
                    <div className="text-sm text-[#0A1A2F]/60">{item.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Our Values</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              The principles that guide our product decisions and company culture.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                value: 'Collaboration',
                description: 'We build platforms that enable cooperation, not competition.',
              },
              {
                value: 'Intelligence',
                description: 'AI should augment human decision-making, not replace it.',
              },
              {
                value: 'Sustainability',
                description: 'Environmental impact is a first-class consideration.',
              },
              {
                value: 'Transparency',
                description: 'Clear pricing, explainable AI, and open communication.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 border border-[#0A1A2F]/10 rounded-2xl"
              >
                <h3 className="text-[#0A1A2F] mb-2">{item.value}</h3>
                <p className="text-sm text-[#0A1A2F]/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}