import { motion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Brain, Zap, Leaf, Route, DollarSign, FileCheck, Sparkles, TrendingUp } from 'lucide-react';

export function ReclovaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ReClova AI Engine",
    "description": "AI-powered orchestration engine for intelligent job routing, automated quoting, and compliance management",
    "brand": {
      "@type": "Brand",
      "name": "Nexus Crux"
    }
  };

  const features = [
    {
      icon: Route,
      title: 'Intelligent Job Routing',
      description: 'AI-powered matching based on skills, location, availability, ratings, and historical performance.',
    },
    {
      icon: DollarSign,
      title: 'Automated Quoting',
      description: 'Generate accurate quotes instantly using machine learning trained on historical job data.',
    },
    {
      icon: Leaf,
      title: 'Eco-Credit System',
      description: 'Track, manage, and optimize sustainability credits with AI-driven eco-impact analysis.',
    },
    {
      icon: FileCheck,
      title: 'WTN Automation',
      description: 'Automated Waste Transfer Note generation, tracking, and compliance reporting.',
    },
    {
      icon: Sparkles,
      title: 'Marketplace Classification',
      description: 'Intelligent categorization and tagging of services, contractors, and job requirements.',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast demand, optimize pricing, and predict resource needs with advanced ML models.',
    },
  ];

  const capabilities = [
    {
      title: 'Real-Time Decision Making',
      description: 'ReClova processes thousands of data points in milliseconds to make optimal routing and pricing decisions.',
      metrics: ['<50ms', 'response time', '99.9%', 'accuracy'],
    },
    {
      title: 'Continuous Learning',
      description: 'Our AI models improve with every job, learning from outcomes to optimize future decisions.',
      metrics: ['10M+', 'jobs analyzed', '95%', 'efficiency gain'],
    },
    {
      title: 'Explainable AI',
      description: 'Transparent decision-making with full audit trails and clear reasoning for every AI action.',
      metrics: ['100%', 'traceable', 'Full', 'transparency'],
    },
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="ReClova AI Engine - Intelligent Orchestration"
        description="ReClova™: AI-powered orchestration engine for intelligent job routing, automated quoting, eco-credit management, and WTN compliance automation."
        keywords="AI engine, machine learning, job routing, automated quoting, eco-credits, compliance automation, ReClova"
        structuredData={structuredData}
      />
      
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#0A1A2F] via-[#0A1A2F] to-[#0A1A2F]/90 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2AD1C8] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#A6F750] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-3xl mx-auto flex items-center justify-center mb-4">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-white mb-6">ReClova™</h1>
            <p className="text-xl text-white/80 mb-4">The AI Orchestration Engine</p>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Intelligent routing, automated quoting, eco-credit management, and compliance automation—powered by advanced machine learning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">What ReClova Powers</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              From intelligent routing to sustainability tracking, ReClova is the brain behind Nexus Crux.
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
                className="group bg-white border border-[#0A1A2F]/10 rounded-2xl p-6 hover:border-[#A6F750]/50 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#2AD1C8] to-[#A6F750] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[#0A1A2F] mb-2">{feature.title}</h3>
                <p className="text-[#0A1A2F]/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">How ReClova Works</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              A sophisticated AI pipeline that turns complex decisions into instant actions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Data Ingestion',
                description: 'Collect real-time data from jobs, contractors, customers, and environmental factors.',
              },
              {
                step: '2',
                title: 'AI Analysis',
                description: 'Process data through multiple ML models for routing, pricing, and classification.',
              },
              {
                step: '3',
                title: 'Decision Making',
                description: 'Generate optimal decisions with confidence scores and reasoning trails.',
              },
              {
                step: '4',
                title: 'Continuous Learning',
                description: 'Learn from outcomes to improve accuracy and adapt to changing patterns.',
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
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 h-px bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">AI Capabilities</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Built on cutting-edge machine learning with enterprise-grade reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-[#0A1A2F]/10 rounded-2xl p-8"
              >
                <h3 className="text-[#0A1A2F] mb-3">{capability.title}</h3>
                <p className="text-[#0A1A2F]/60 mb-6">{capability.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-[#2AD1C8]/10 to-[#2AD1C8]/5 rounded-xl">
                    <div className="text-2xl text-[#0A1A2F] mb-1">{capability.metrics[0]}</div>
                    <div className="text-xs text-[#0A1A2F]/60">{capability.metrics[1]}</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-[#A6F750]/10 to-[#A6F750]/5 rounded-xl">
                    <div className="text-2xl text-[#0A1A2F] mb-1">{capability.metrics[2]}</div>
                    <div className="text-xs text-[#0A1A2F]/60">{capability.metrics[3]}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Routing Optimization */}
      <section className="py-20 bg-gradient-to-br from-[#0A1A2F] to-[#0A1A2F]/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Zap className="w-12 h-12 text-[#A6F750] mb-4" />
              <h2 className="text-white mb-4">Intelligent Job Routing</h2>
              <p className="text-white/80 mb-6">
                ReClova analyzes hundreds of factors to match each job with the perfect contractor in real-time.
              </p>
              <div className="space-y-3">
                {[
                  'Skills & certifications matching',
                  'Location & travel time optimization',
                  'Availability & schedule conflicts',
                  'Historical performance & ratings',
                  'Customer preferences & requirements',
                  'Eco-impact & carbon footprint',
                  'Pricing & profitability optimization',
                ].map((factor, index) => (
                  <motion.div
                    key={factor}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-1.5 h-1.5 bg-[#A6F750] rounded-full" />
                    {factor}
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
              <h3 className="text-white mb-6">Routing Decision Process</h3>
              <div className="space-y-4">
                {[
                  { stage: 'Job Request', time: '0ms', status: 'Received' },
                  { stage: 'Data Analysis', time: '12ms', status: 'Processing' },
                  { stage: 'Contractor Matching', time: '28ms', status: 'Analyzing' },
                  { stage: 'Optimization', time: '41ms', status: 'Complete' },
                  { stage: 'Assignment', time: '47ms', status: 'Assigned' },
                ].map((stage, index) => (
                  <motion.div
                    key={stage.stage}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                  >
                    <div>
                      <div className="text-white text-sm">{stage.stage}</div>
                      <div className="text-xs text-white/60">{stage.time}</div>
                    </div>
                    <div className="px-3 py-1 bg-[#A6F750]/20 border border-[#A6F750]/40 rounded text-[#A6F750] text-xs">
                      {stage.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Eco-Credits */}
      <section className="py-20 bg-gradient-to-br from-[#A6F750]/10 to-[#2AD1C8]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="bg-white rounded-2xl border border-[#0A1A2F]/10 p-8">
                <Leaf className="w-12 h-12 text-[#A6F750] mb-4" />
                <h3 className="text-[#0A1A2F] mb-6">Eco-Credit Tracking</h3>
                <div className="space-y-4">
                  {[
                    { metric: 'Carbon Saved', value: '12.4 tons', trend: '+23%' },
                    { metric: 'Waste Diverted', value: '8,900 kg', trend: '+18%' },
                    { metric: 'Eco Jobs', value: '1,247', trend: '+31%' },
                    { metric: 'Green Score', value: '94/100', trend: '+5 pts' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.metric}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-[#A6F750]/10 to-[#2AD1C8]/10 rounded-lg"
                    >
                      <div>
                        <div className="text-sm text-[#0A1A2F]/60">{item.metric}</div>
                        <div className="text-xl text-[#0A1A2F]">{item.value}</div>
                      </div>
                      <div className="text-sm text-[#2AD1C8]">{item.trend}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-[#0A1A2F] mb-4">AI-Powered Sustainability</h2>
              <p className="text-[#0A1A2F]/60 mb-6">
                ReClova automatically tracks, calculates, and optimizes eco-impact across all jobs, helping brands meet sustainability goals.
              </p>
              <ul className="space-y-3">
                {[
                  'Automated carbon footprint calculation',
                  'Eco-friendly routing optimization',
                  'Waste tracking & diversion metrics',
                  'Sustainability reporting & analytics',
                  'Green contractor preference system',
                  'Carbon offset integration',
                ].map((feature, index) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-3 text-[#0A1A2F]"
                  >
                    <div className="w-6 h-6 bg-[#A6F750]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-4 h-4 text-[#A6F750]" />
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}