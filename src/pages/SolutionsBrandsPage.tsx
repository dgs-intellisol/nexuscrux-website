import { motion } from 'motion/react';
import { Smartphone, Shield, BarChart3, Palette, Zap, Leaf, CheckCircle } from 'lucide-react';

export function SolutionsBrandsPage() {
  const features = [
    {
      icon: Smartphone,
      title: 'White-Labeled Apps',
      description: 'Native iOS and Android apps with your brand identity, custom workflows, and seamless customer experience.',
    },
    {
      icon: Shield,
      title: 'Compliance Automation',
      description: 'Automated WTN tracking, regulatory reporting, and industry-specific compliance management.',
    },
    {
      icon: BarChart3,
      title: 'Eco-Impact Analytics',
      description: 'Real-time sustainability metrics, carbon footprint tracking, and eco-credit management dashboards.',
    },
    {
      icon: Palette,
      title: 'Brand Customization',
      description: 'Full control over branding, color schemes, messaging, and customer-facing communications.',
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Custom business logic, automated job routing, dynamic pricing, and intelligent scheduling.',
    },
    {
      icon: Leaf,
      title: 'Sustainability Tools',
      description: 'Eco-first routing, green contractor preferences, and carbon offset integration.',
    },
  ];

  const benefits = [
    'Launch new service brands in days, not months',
    'Reduce operational overhead by up to 60%',
    'Access verified contractor pool instantly',
    'Scale across multiple locations seamlessly',
    'Maintain complete brand independence',
    'Meet compliance requirements automatically',
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-[#2AD1C8]/20 border border-[#2AD1C8]/30 rounded-full text-sm">
                For Tenant Brands
              </span>
            </div>
            <h1 className="text-white mb-6">Launch Your Service Brand Faster</h1>
            <p className="text-xl text-white/80 mb-8">
              Build and scale your home-service brand with white-labeled apps, compliance automation, and access to a verified contractor network—all from day one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Why Tenant Brands Choose Nexus Crux</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Everything you need to launch, operate, and scale a premium home-service brand.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-[#0A1A2F]">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Features Built for Brands</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              A complete platform designed specifically for multi-tenant service brands.
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
                className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-2">{feature.title}</h3>
                <p className="text-[#0A1A2F]/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* White-Label Deep Dive */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0A1A2F] mb-4">Complete Brand Control</h2>
              <p className="text-[#0A1A2F]/60 mb-6">
                Your brand, your rules. From app design to customer communications, every touchpoint reflects your unique identity.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[#2AD1C8] pl-4">
                  <div className="text-[#0A1A2F] mb-1">Custom Domain & Branding</div>
                  <div className="text-sm text-[#0A1A2F]/60">
                    Your domain, logos, colors, and brand guidelines throughout the platform
                  </div>
                </div>
                <div className="border-l-4 border-[#A6F750] pl-4">
                  <div className="text-[#0A1A2F] mb-1">Branded Customer Experience</div>
                  <div className="text-sm text-[#0A1A2F]/60">
                    Customized booking flows, notifications, and customer portals
                  </div>
                </div>
                <div className="border-l-4 border-[#0A1A2F] pl-4">
                  <div className="text-[#0A1A2F] mb-1">Independent Operations</div>
                  <div className="text-sm text-[#0A1A2F]/60">
                    Your own pricing, policies, and service offerings
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 rounded-2xl p-8 text-white"
            >
              <h3 className="text-white mb-6">What You Get</h3>
              <div className="space-y-3">
                {[
                  'Native iOS & Android apps',
                  'Customer web portal',
                  'Contractor mobile app',
                  'Admin dashboard',
                  'Custom email templates',
                  'SMS & push notifications',
                  'Branded invoices & receipts',
                  'Marketing landing pages',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-[#A6F750] rounded-full" />
                    <span className="text-white/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance & Analytics */}
      <section className="py-20 bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-[#0A1A2F]/10"
            >
              <Shield className="w-12 h-12 text-[#2AD1C8] mb-4" />
              <h3 className="text-[#0A1A2F] mb-3">Compliance Automation</h3>
              <p className="text-[#0A1A2F]/60 mb-4">
                Stay compliant effortlessly with automated WTN tracking, regulatory reporting, and industry-specific requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                  <CheckCircle className="w-4 h-4 text-[#2AD1C8]" />
                  Automated waste tracking notes (WTN)
                </li>
                <li className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                  <CheckCircle className="w-4 h-4 text-[#2AD1C8]" />
                  Contractor licensing verification
                </li>
                <li className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                  <CheckCircle className="w-4 h-4 text-[#2AD1C8]" />
                  GDPR & data protection compliance
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-[#0A1A2F]/10"
            >
              <BarChart3 className="w-12 h-12 text-[#A6F750] mb-4" />
              <h3 className="text-[#0A1A2F] mb-3">Eco-Impact Analytics</h3>
              <p className="text-[#0A1A2F]/60 mb-4">
                Track and showcase your sustainability impact with comprehensive eco-analytics and carbon reporting.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                  <CheckCircle className="w-4 h-4 text-[#A6F750]" />
                  Carbon footprint tracking
                </li>
                <li className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                  <CheckCircle className="w-4 h-4 text-[#A6F750]" />
                  Eco-credit system integration
                </li>
                <li className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                  <CheckCircle className="w-4 h-4 text-[#A6F750]" />
                  Sustainability reporting dashboards
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
