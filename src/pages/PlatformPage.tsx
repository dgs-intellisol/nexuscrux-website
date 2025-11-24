import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Network, Lock, Zap, CreditCard, Palette, Users, Shield, GitBranch } from 'lucide-react';

export function PlatformPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Nexus Crux Platform",
    "description": "Multi-tenant federated service bus platform with AI-powered orchestration",
    "brand": {
      "@type": "Brand",
      "name": "Nexus Crux"
    },
    "category": "Business Software"
  };

  const features = [
    {
      icon: Network,
      title: 'Brand Segmentation',
      description: 'Complete tenant isolation with custom domains, branding, and workflows for each service brand.',
    },
    {
      icon: Zap,
      title: 'Intelligent Job Routing',
      description: 'AI-powered matching and routing based on skills, location, availability, and brand preferences.',
    },
    {
      icon: Lock,
      title: 'Identity & Verification',
      description: 'Multi-level verification system with background checks, credential management, and audit trails.',
    },
    {
      icon: CreditCard,
      title: 'Unified Payments',
      description: 'Consolidated payment processing with automated splits, revenue sharing, and contractor payouts.',
    },
    {
      icon: Palette,
      title: 'Tenant-Specific Branding',
      description: 'White-labeled apps and portals that reflect each tenant brand\'s unique identity and guidelines.',
    },
    {
      icon: Users,
      title: 'Shared Contractor Pool',
      description: 'Enable contractors to work across multiple brands from a single profile with unified scheduling.',
    },
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Platform - Multi-Tenant Service Bus Architecture"
        description="Explore Nexus Crux's federated service bus platform. Multi-tenant architecture with AI-powered routing, unified payments, brand isolation, and shared contractor pools."
        keywords="multi-tenant platform, service bus architecture, federated system, brand segmentation, contractor pooling, AI routing"
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
            <h1 className="text-white mb-6">The Multi-Tenant Engine</h1>
            <p className="text-xl text-white/80 mb-8">
              A federated service bus architecture designed to power multiple service brands from a single, scalable platform while maintaining complete tenant isolation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Federated Service Bus Architecture</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              A sophisticated multi-tenant system that connects brands, contractors, and customers through intelligent orchestration.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl border border-[#0A1A2F]/10 p-8 md:p-12">
            <div className="space-y-8">
              {/* Layer 1: Tenant Brands */}
              <div className="border-l-4 border-[#2AD1C8] pl-6">
                <h3 className="text-[#0A1A2F] mb-2">Tenant Brand Layer</h3>
                <p className="text-[#0A1A2F]/60 mb-4">
                  Each service brand operates with complete isolation, custom branding, and independent workflows.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Brand A', 'Brand B', 'Brand C', 'Brand D'].map((brand) => (
                    <span
                      key={brand}
                      className="px-3 py-2 bg-[#2AD1C8]/10 border border-[#2AD1C8]/30 rounded-lg text-sm text-[#0A1A2F] text-center"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-px h-12 bg-gradient-to-b from-[#2AD1C8] to-[#A6F750]" />
              </div>

              {/* Layer 2: Nexus Crux Core */}
              <div className="border-l-4 border-[#A6F750] pl-6">
                <h3 className="text-[#0A1A2F] mb-2">Nexus Crux Core</h3>
                <p className="text-[#0A1A2F]/60 mb-4">
                  The federated service bus that orchestrates jobs, manages identity, processes payments, and ensures compliance.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Job Router', 'Identity Hub', 'Payment Engine', 'Compliance Layer'].map((component) => (
                    <div
                      key={component}
                      className="px-3 py-2 bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 border border-[#A6F750]/30 rounded-lg text-sm text-[#0A1A2F] text-center"
                    >
                      {component}
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <div className="w-px h-12 bg-gradient-to-b from-[#A6F750] to-[#2AD1C8]" />
              </div>

              {/* Layer 3: Contractor Pool */}
              <div className="border-l-4 border-[#0A1A2F] pl-6">
                <h3 className="text-[#0A1A2F] mb-2">Shared Contractor Pool</h3>
                <p className="text-[#0A1A2F]/60 mb-4">
                  Verified contractors with unified profiles serve multiple brands, maximizing utilization and earnings.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['Verified Contractors', 'Single Profile', 'Multi-Brand Jobs', 'Unified Calendar'].map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-2 bg-[#0A1A2F]/10 border border-[#0A1A2F]/30 rounded-lg text-sm text-[#0A1A2F] text-center"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Platform Capabilities</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Everything you need to run a multi-tenant service ecosystem at scale.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/0 to-[#A6F750]/0 group-hover:from-[#2AD1C8]/5 group-hover:to-[#A6F750]/5 transition-all duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#2AD1C8]/20 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[#0A1A2F] mb-2">{feature.title}</h3>
                  <p className="text-[#0A1A2F]/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contractor Multi-Brand Flow */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/95 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">One Profile, Multiple Brands</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Contractors maintain a single verified profile while serving jobs from multiple tenant brands seamlessly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-[#2AD1C8]/20 border border-[#2AD1C8] rounded-xl flex items-center justify-center mb-4 text-[#2AD1C8]">
                1
              </div>
              <h3 className="text-white mb-2">Single Onboarding</h3>
              <p className="text-white/60">
                Contractors complete one verification process with unified identity, credentials, and background checks.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-[#A6F750]/20 border border-[#A6F750] rounded-xl flex items-center justify-center mb-4 text-[#A6F750]">
                2
              </div>
              <h3 className="text-white mb-2">Unified Job Queue</h3>
              <p className="text-white/60">
                View and accept jobs from all brands in a single calendar with intelligent scheduling and routing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4 text-white">
                3
              </div>
              <h3 className="text-white mb-2">Brand Context</h3>
              <p className="text-white/60">
                Automatically adapt to each brand's guidelines, pricing, and customer expectations per job.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0A1A2F] mb-4">Enterprise-Grade Security</h2>
              <p className="text-[#0A1A2F]/60 mb-6">
                Built with security and compliance at the core, ensuring data isolation, audit trails, and regulatory adherence.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, text: 'GDPR & SOC 2 compliant' },
                  { icon: Lock, text: 'End-to-end encryption' },
                  { icon: GitBranch, text: 'Complete tenant isolation' },
                  { icon: Network, text: 'Comprehensive audit trails' },
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-[#0A1A2F]">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-8"
            >
              <h3 className="text-[#0A1A2F] mb-6">Data Isolation Architecture</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-[#2AD1C8] pl-4">
                  <div className="text-sm text-[#0A1A2F]/60 mb-1">Tenant Data</div>
                  <div className="text-[#0A1A2F]">Complete logical separation per tenant</div>
                </div>
                <div className="border-l-4 border-[#A6F750] pl-4">
                  <div className="text-sm text-[#0A1A2F]/60 mb-1">Access Control</div>
                  <div className="text-[#0A1A2F]">Role-based permissions with OAuth 2.0</div>
                </div>
                <div className="border-l-4 border-[#0A1A2F] pl-4">
                  <div className="text-sm text-[#0A1A2F]/60 mb-1">Audit Trails</div>
                  <div className="text-[#0A1A2F]">Immutable logs for all operations</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}