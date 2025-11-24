import { motion } from 'motion/react';
import { Calendar, Briefcase, Star, Shield, CreditCard, Layers, CheckCircle } from 'lucide-react';

export function SolutionsContractorsPage() {
  const features = [
    {
      icon: Calendar,
      title: 'Unified Calendar',
      description: 'Single view of all jobs across brands with intelligent scheduling and conflict prevention.',
    },
    {
      icon: Briefcase,
      title: 'Multi-Brand Job Queue',
      description: 'Access jobs from all connected brands in one place with smart filtering and prioritization.',
    },
    {
      icon: Star,
      title: 'Unified Ratings & Reviews',
      description: 'Build your reputation across all brands with a consolidated rating system and portfolio.',
    },
    {
      icon: Shield,
      title: 'Identity Management',
      description: 'One verification process for all brands with secure credential and license management.',
    },
    {
      icon: CreditCard,
      title: 'Consolidated Payments',
      description: 'Single payout dashboard for earnings across all brands with detailed breakdowns.',
    },
    {
      icon: Layers,
      title: 'Brand Context Switching',
      description: 'Seamlessly adapt to each brand\'s requirements, pricing, and customer expectations.',
    },
  ];

  const benefits = [
    'Maximize earnings by working for multiple brands',
    'Reduce downtime with unified scheduling',
    'One onboarding, unlimited opportunities',
    'Build reputation across entire network',
    'Simplified payment tracking and tax reporting',
    'Flexible work across service types',
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
              <span className="px-4 py-2 bg-[#A6F750]/20 border border-[#A6F750]/30 rounded-full text-sm">
                For Contractors
              </span>
            </div>
            <h1 className="text-white mb-6">One Profile, Unlimited Opportunities</h1>
            <p className="text-xl text-white/80 mb-8">
              Join the shared contractor pool and access jobs from multiple service brands with a single profile, unified scheduling, and streamlined payments.
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
            <h2 className="text-[#0A1A2F] mb-4">Why Contractors Love Nexus Crux</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Work smarter, earn more, and build your reputation across an entire ecosystem of service brands.
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
            <h2 className="text-[#0A1A2F] mb-4">Built for Contractors</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Everything you need to manage multi-brand work from a single, powerful platform.
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
              Get started in minutes and access opportunities from multiple brands instantly.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Sign Up Once',
                description: 'Complete one verification with background checks, credentials, and licensing.',
              },
              {
                step: '2',
                title: 'Get Verified',
                description: 'Our identity hub validates your credentials across all connected brands.',
              },
              {
                step: '3',
                title: 'Browse Jobs',
                description: 'View opportunities from multiple brands in your unified job queue.',
              },
              {
                step: '4',
                title: 'Start Earning',
                description: 'Accept jobs, complete work, and receive consolidated payments.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                  {item.step}
                </div>
                <h3 className="text-[#0A1A2F] mb-2">{item.title}</h3>
                <p className="text-[#0A1A2F]/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Identity & Security */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-white mb-4">Your Identity, Secured & Verified</h2>
              <p className="text-white/80 mb-6">
                One comprehensive verification process gives you access to all brands while keeping your credentials secure and up-to-date.
              </p>
              <div className="space-y-4">
                {[
                  'Background checks & clearances',
                  'License & credential management',
                  'Skills & certification tracking',
                  'Insurance verification',
                  'Continuous compliance monitoring',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-[#A6F750] flex-shrink-0" />
                    <span className="text-white/90">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8"
            >
              <Shield className="w-12 h-12 text-[#2AD1C8] mb-4" />
              <h3 className="text-white mb-3">Secure Identity Hub</h3>
              <p className="text-white/70 mb-6">
                Your verified profile is the single source of truth across all brands, eliminating redundant checks and streamlining onboarding.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/80 text-sm">Background Check</span>
                  <span className="text-[#A6F750] text-sm">Verified</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/80 text-sm">Licenses</span>
                  <span className="text-[#A6F750] text-sm">Current</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-white/80 text-sm">Insurance</span>
                  <span className="text-[#A6F750] text-sm">Active</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Earnings Dashboard */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Simplified Payment Tracking</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              All your earnings in one place with detailed breakdowns by brand, service type, and time period.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white border border-[#0A1A2F]/10 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-[#2AD1C8]/10 to-[#2AD1C8]/5 rounded-xl">
                <div className="text-3xl text-[#0A1A2F] mb-1">$12,450</div>
                <div className="text-sm text-[#0A1A2F]/60">This Month</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#A6F750]/10 to-[#A6F750]/5 rounded-xl">
                <div className="text-3xl text-[#0A1A2F] mb-1">47</div>
                <div className="text-sm text-[#0A1A2F]/60">Jobs Completed</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#0A1A2F]/10 to-[#0A1A2F]/5 rounded-xl">
                <div className="text-3xl text-[#0A1A2F] mb-1">4.9</div>
                <div className="text-sm text-[#0A1A2F]/60">Average Rating</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { brand: 'CleanPro Services', amount: '$4,200', jobs: 18 },
                { brand: 'HomeHub Solutions', amount: '$3,850', jobs: 15 },
                { brand: 'EcoClean Network', amount: '$2,900', jobs: 10 },
                { brand: 'ServiceMaster Plus', amount: '$1,500', jobs: 4 },
              ].map((earning, index) => (
                <motion.div
                  key={earning.brand}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="text-[#0A1A2F]">{earning.brand}</div>
                    <div className="text-sm text-[#0A1A2F]/60">{earning.jobs} jobs</div>
                  </div>
                  <div className="text-[#0A1A2F]">{earning.amount}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}