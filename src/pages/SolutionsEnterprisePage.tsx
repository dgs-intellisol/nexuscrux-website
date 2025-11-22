import { motion } from 'motion/react';
import { Building2, MapPin, BarChart3, Workflow, Shield, Zap, CheckCircle } from 'lucide-react';

export function SolutionsEnterprisePage() {
  const features = [
    {
      icon: MapPin,
      title: 'Multi-Location Orchestration',
      description: 'Manage service operations across unlimited locations with centralized control and local customization.',
    },
    {
      icon: BarChart3,
      title: 'Enterprise Dashboards',
      description: 'Real-time analytics, KPI tracking, and performance insights across your entire service network.',
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Custom business logic, approval chains, and automated processes tailored to your organization.',
    },
    {
      icon: Shield,
      title: 'Advanced Security & Compliance',
      description: 'Enterprise-grade security with SSO, role-based access control, and comprehensive audit trails.',
    },
    {
      icon: Zap,
      title: 'API & Integration',
      description: 'Connect to your existing systems with our comprehensive API and webhook infrastructure.',
    },
    {
      icon: Building2,
      title: 'White-Label Multi-Tenancy',
      description: 'Run multiple brands under one enterprise umbrella with shared resources and unified management.',
    },
  ];

  const capabilities = [
    {
      category: 'Scale',
      items: [
        'Unlimited locations & brands',
        'Contractor pool sharing across locations',
        'Centralized training & onboarding',
        'Cross-location resource allocation',
      ],
    },
    {
      category: 'Control',
      items: [
        'Hierarchical organization structure',
        'Custom approval workflows',
        'Brand-specific policies',
        'Granular permission management',
      ],
    },
    {
      category: 'Insights',
      items: [
        'Real-time operational dashboards',
        'Predictive analytics & forecasting',
        'Performance benchmarking',
        'Custom report generation',
      ],
    },
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
              <span className="px-4 py-2 bg-gradient-to-r from-[#2AD1C8]/20 to-[#A6F750]/20 border border-[#2AD1C8]/30 rounded-full text-sm">
                For Enterprises
              </span>
            </div>
            <h1 className="text-white mb-6">Enterprise-Scale Service Operations</h1>
            <p className="text-xl text-white/80 mb-8">
              Orchestrate multi-location, multi-brand service operations with enterprise-grade security, unified management, and real-time insights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Built for Enterprise Scale</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Everything you need to manage complex, multi-location service operations at scale.
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

      {/* Enterprise Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Enterprise Capabilities</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Comprehensive tools for managing large-scale service operations across your organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-[#0A1A2F]/10 p-6"
              >
                <h3 className="text-[#0A1A2F] mb-4">{capability.category}</h3>
                <ul className="space-y-3">
                  {capability.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                      <span className="text-[#0A1A2F]/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Location Management */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#0A1A2F] mb-4">Unified Multi-Location Management</h2>
              <p className="text-[#0A1A2F]/60 mb-6">
                Manage all your locations from a single dashboard while maintaining local autonomy and customization.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-[#2AD1C8] pl-4">
                  <div className="text-[#0A1A2F] mb-1">Centralized Control</div>
                  <div className="text-sm text-[#0A1A2F]/60">
                    Set global policies, pricing strategies, and operational standards
                  </div>
                </div>
                <div className="border-l-4 border-[#A6F750] pl-4">
                  <div className="text-[#0A1A2F] mb-1">Local Customization</div>
                  <div className="text-sm text-[#0A1A2F]/60">
                    Allow location managers to adapt to local markets and regulations
                  </div>
                </div>
                <div className="border-l-4 border-[#0A1A2F] pl-4">
                  <div className="text-[#0A1A2F] mb-1">Resource Sharing</div>
                  <div className="text-sm text-[#0A1A2F]/60">
                    Share contractors and resources across locations during peak demand
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
              <MapPin className="w-12 h-12 text-[#2AD1C8] mb-4" />
              <h3 className="text-white mb-6">Location Hierarchy</h3>
              <div className="space-y-3">
                <div className="bg-white/10 rounded-lg p-4 border-l-4 border-[#2AD1C8]">
                  <div className="text-white mb-1">Corporate HQ</div>
                  <div className="text-xs text-white/60">Global policies & oversight</div>
                </div>
                <div className="ml-6 bg-white/10 rounded-lg p-4 border-l-4 border-[#A6F750]">
                  <div className="text-white mb-1">Regional Offices (3)</div>
                  <div className="text-xs text-white/60">Regional management & compliance</div>
                </div>
                <div className="ml-12 bg-white/10 rounded-lg p-4 border-l-4 border-white/40">
                  <div className="text-white mb-1">Local Branches (24)</div>
                  <div className="text-xs text-white/60">Day-to-day operations</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard */}
      <section className="py-20 bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Real-Time Enterprise Analytics</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Comprehensive insights into your service operations with customizable dashboards and reports.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl border border-[#0A1A2F]/10 p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Active Jobs', value: '1,247', trend: '+12%' },
                { label: 'Contractors', value: '856', trend: '+8%' },
                { label: 'Locations', value: '24', trend: '+2' },
                { label: 'Revenue', value: '$2.4M', trend: '+18%' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 bg-gray-50 rounded-xl"
                >
                  <div className="text-2xl text-[#0A1A2F] mb-1">{stat.value}</div>
                  <div className="text-xs text-[#0A1A2F]/60 mb-2">{stat.label}</div>
                  <div className="text-xs text-[#2AD1C8]">{stat.trend}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-[#0A1A2F]/10 rounded-xl p-6">
                <h3 className="text-[#0A1A2F] mb-4">Top Performing Locations</h3>
                <div className="space-y-3">
                  {['Boston', 'New York', 'Chicago', 'Seattle'].map((location, index) => (
                    <div key={location} className="flex items-center justify-between">
                      <span className="text-[#0A1A2F]/80">{location}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750]"
                            style={{ width: `${100 - index * 15}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#0A1A2F]/60">{100 - index * 15}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#0A1A2F]/10 rounded-xl p-6">
                <h3 className="text-[#0A1A2F] mb-4">Service Categories</h3>
                <div className="space-y-3">
                  {[
                    { category: 'Plumbing', percentage: 35 },
                    { category: 'Electrical', percentage: 28 },
                    { category: 'Cleaning', percentage: 22 },
                    { category: 'HVAC', percentage: 15 },
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <span className="text-[#0A1A2F]/80">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#2AD1C8] to-[#A6F750]"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#0A1A2F]/60">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-20 bg-[#0A1A2F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-white mb-4">Enterprise Security & Compliance</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Built to meet the strictest security and compliance requirements of large organizations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'SSO Integration', description: 'SAML, OAuth, AD integration' },
              { title: 'SOC 2 Compliant', description: 'Type II certified infrastructure' },
              { title: 'GDPR Ready', description: 'Full data protection compliance' },
              { title: 'Audit Trails', description: 'Immutable activity logs' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6"
              >
                <h3 className="text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
