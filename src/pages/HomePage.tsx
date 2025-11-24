import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { NetworkNodes } from '../components/NetworkNodes';
import { ValuePropCard } from '../components/ValuePropCard';
import { SEO } from '../components/SEO';
import { Network, Users, Sparkles, Leaf, ArrowRight, CheckCircle, Star } from 'lucide-react';

export function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nexus Crux",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Multi-tenant federated service bus platform for home-service brands and contractors",
    "operatingSystem": "Web"
  };

  const valueProps = [
    {
      icon: Network,
      title: 'Multi-Tenant Engine',
      description: 'Seamlessly manage multiple service brands from a single, unified platform with complete tenant isolation.',
    },
    {
      icon: Users,
      title: 'Shared Contractor Pool',
      description: 'Enable contractors to serve multiple brands from one profile, maximizing efficiency and earnings potential.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Orchestration',
      description: 'Leverage ReClova™ for intelligent job routing, automated quoting, and marketplace classification.',
    },
    {
      icon: Leaf,
      title: 'Eco-First Compliance',
      description: 'Built-in WTN automation and eco-credit systems that prioritize sustainability and regulatory compliance.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'COO, ServicePro',
      company: 'ServicePro',
      quote: 'Nexus Crux transformed how we manage our multi-brand operations. The federated approach is genius.',
      rating: 5,
    },
    {
      name: 'Marcus Wright',
      role: 'Operations Director, HomeHub',
      company: 'HomeHub',
      quote: 'The AI routing and contractor pooling saved us 40% in operational costs within the first quarter.',
      rating: 5,
    },
    {
      name: 'Lisa Rodriguez',
      role: 'CEO, EcoClean Network',
      company: 'EcoClean Network',
      quote: 'Their compliance automation and eco-tracking gave us a competitive edge in sustainability.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Home - Multi-Tenant Federated Service Bus Platform"
        description="Nexus Crux: The federated SaaS platform connecting home-service brands with verified contractors through AI-powered orchestration. Multi-tenant architecture, shared contractor pools, and intelligent routing."
        keywords="service bus platform, multi-tenant SaaS, home service software, contractor management, federated platform, ReClova AI, service orchestration"
        structuredData={structuredData}
      />
      
      {/* Hero Section */}
      <section className="relative bg-[#0A1A2F] text-white overflow-hidden">
        <NetworkNodes />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-[#2AD1C8]/20 to-[#A6F750]/20 border border-[#2AD1C8]/30 rounded-full text-sm">
                Federated Service Bus Platform
              </span>
            </motion.div>

            <h1 className="text-white mb-6">
              Where Connections Become Capability.
            </h1>
            
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              A federated SaaS platform powering multi-tenant service brands, connecting home-service companies with verified contractors through intelligent orchestration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-2"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/platform"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
              >
                Explore Platform
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2AD1C8] to-transparent" />
      </section>

      {/* Value Propositions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Why Nexus Crux?</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Built for the complexity of modern service ecosystems, designed for the simplicity you deserve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, index) => (
              <ValuePropCard key={prop.title} {...prop} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Diagram */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">The Federated Architecture</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              A unified platform that connects tenant brands with contractors through intelligent orchestration.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* Tenant Brands */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2AD1C8] to-[#2AD1C8]/70 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Network className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white mb-2">Tenant Brands</h3>
                  <p className="text-white/60 text-sm">White-labeled apps, custom workflows, brand segmentation</p>
                </div>

                {/* Nexus Crux Hub */}
                <div className="text-center relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-16 h-px bg-gradient-to-r from-[#2AD1C8] to-[#A6F750]" />
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block">
                    <div className="w-16 h-px bg-gradient-to-r from-[#A6F750] to-[#2AD1C8]" />
                  </div>
                  
                  <div className="relative">
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(42, 209, 200, 0.3)',
                          '0 0 40px rgba(166, 247, 80, 0.4)',
                          '0 0 20px rgba(42, 209, 200, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-24 h-24 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-3xl mx-auto mb-4 flex items-center justify-center"
                    >
                      <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-white mb-2">Nexus Crux</h3>
                    <p className="text-white/60 text-sm">Federated service bus powered by ReClova™</p>
                  </div>
                </div>

                {/* Contractors */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#A6F750] to-[#A6F750]/70 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-white mb-2">Contractors</h3>
                  <p className="text-white/60 text-sm">Unified profile, multi-brand jobs, identity verification</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ReClova Section */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/95 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#2AD1C8] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#A6F750] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-[#A6F750]/20 border border-[#A6F750]/30 rounded-full text-sm">
                  AI Orchestration Engine
                </span>
              </div>
              <h2 className="text-white mb-4">Powered by ReClova™</h2>
              <p className="text-white/80 mb-6">
                Our proprietary AI engine handles intelligent routing, automated quoting, marketplace classification, and eco-credit optimization—turning complex decisions into instant actions.
              </p>
              <Link
                to="/reclova"
                className="inline-flex items-center gap-2 text-[#A6F750] hover:text-[#A6F750]/80 transition-colors"
              >
                Learn about ReClova™
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                'AI-powered job routing & matching',
                'Automated quote generation',
                'Eco-credit system management',
                'WTN compliance automation',
                'Predictive demand forecasting',
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
                >
                  <CheckCircle className="w-5 h-5 text-[#A6F750] flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Trusted by Industry Leaders</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              See how organizations are transforming their operations with Nexus Crux.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-white via-white to-[#2AD1C8]/5 border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#2AD1C8]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2AD1C8]/0 to-[#A6F750]/0 group-hover:from-[#2AD1C8]/5 group-hover:to-[#A6F750]/5 transition-all duration-500 rounded-2xl" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#A6F750] text-[#A6F750]" />
                    ))}
                  </div>
                  <p className="text-[#0A1A2F]/80 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <div className="text-[#0A1A2F]">{testimonial.name}</div>
                    <div className="text-[#0A1A2F]/60 text-sm">{testimonial.role}</div>
                    <div className="text-[#0A1A2F]/60 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#0A1A2F] mb-4">Ready to Transform Your Operations?</h2>
            <p className="text-[#0A1A2F]/80 mb-8 text-lg">
              Join the federated service revolution. See how Nexus Crux can power your multi-tenant ecosystem.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#0A1A2F]/90 transition-colors"
            >
              Schedule a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}