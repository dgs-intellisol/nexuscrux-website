import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { TrialSignupDialog } from '../components/TrialSignupDialog';
import { SubscribeDialog } from '../components/SubscribeDialog';

export function PricingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Nexus Crux",
    "offers": [
      {
        "@type": "Offer",
        "name": "Starter Plan",
        "price": "399",
        "priceCurrency": "GBP",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Growth Plan",
        "price": "1199",
        "priceCurrency": "GBP",
        "priceValidUntil": "2025-12-31"
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": "Custom",
        "priceCurrency": "GBP"
      }
    ]
  };

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [trialDialogOpen, setTrialDialogOpen] = useState(false);
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const handleTrialClick = (planName: string, price: string) => {
    setSelectedPlan(planName);
    setSelectedPrice(price);
    setTrialDialogOpen(true);
  };

  const handleSubscribeClick = (planName: string, price: string) => {
    setSelectedPlan(planName);
    setSelectedPrice(price);
    setSubscribeDialogOpen(true);
  };

  const tiers = [
    {
      name: 'Starter',
      description: 'Perfect for small service brands launching their first operation',
      monthlyPrice: '£399',
      annualPrice: '£3,830',
      monthlyTotal: 4788,
      annualTotal: 3830,
      savings: 20,
      features: [
        'Up to 500 jobs/month',
        'Single brand tenant',
        '25 active contractors',
        'White-labeled customer app',
        'Basic AI routing',
        'Standard support',
        'WTN compliance automation',
        'Payment processing included',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Growth',
      description: 'For growing brands scaling their operations',
      monthlyPrice: '£1,099',
      annualPrice: '£10,550',
      monthlyTotal: 13188,
      annualTotal: 10550,
      savings: 20,
      features: [
        'Up to 2,500 jobs/month',
        'Up to 3 brand tenants',
        '100 active contractors',
        'Full white-label suite',
        'Advanced AI routing & quoting',
        'Priority support',
        'Eco-credit system',
        'Custom integrations',
        'Analytics dashboard',
        'API access',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Scale',
      description: 'For established brands with multiple locations',
      monthlyPrice: '£2,499',
      annualPrice: '£23,990',
      monthlyTotal: 29988,
      annualTotal: 23990,
      savings: 20,
      features: [
        'Up to 10,000 jobs/month',
        'Up to 10 brand tenants',
        'Unlimited contractors',
        'Multi-location management',
        'Full ReClova™ AI suite',
        'Dedicated support',
        'Advanced analytics',
        'Custom workflows',
        'SSO integration',
        'White-glove onboarding',
        'SLA guarantees',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Enterprise',
      description: 'Custom solutions for large-scale operations',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      monthlyTotal: 0,
      annualTotal: 0,
      savings: 0,
      features: [
        'Unlimited jobs',
        'Unlimited brands & locations',
        'Unlimited contractors',
        'Custom infrastructure',
        'Dedicated AI training',
        '24/7 premium support',
        'Custom SLAs',
        'On-premise deployment option',
        'Dedicated account manager',
        'Custom feature development',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Pricing - Transparent Plans for Every Scale"
        description="Nexus Crux pricing plans: From startups to enterprise. Multi-tenant service bus platform with AI routing, white-label apps, and contractor management. 14-day free trial."
        keywords="pricing, SaaS pricing, multi-tenant pricing, service platform cost, subscription plans, enterprise pricing"
        structuredData={structuredData}
      />
      
      {/* Hero */}
      <section className="bg-[#0A1A2F] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-white mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-white/80 mb-8">
              Choose the plan that fits your needs. All plans include our core platform features and ReClova™ AI.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F]'
                    : 'text-white/80'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F]'
                    : 'text-white/80'
                }`}
              >
                Annual
                <span className="ml-2 text-xs">(Save 20%)</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl border ${
                  tier.popular ? 'border-[#2AD1C8] shadow-xl' : 'border-[#0A1A2F]/10'
                } p-8 flex flex-col`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-[#0A1A2F] mb-2">{tier.name}</h3>
                  <p className="text-sm text-[#0A1A2F]/60">{tier.description}</p>
                </div>

                <div className="mb-6">
                  {billingCycle === 'annual' && tier.savings > 0 && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-[#A6F750]/20 text-[#0A1A2F] rounded-full text-xs mb-3">
                      <span>💰</span>
                      <span>Save {tier.savings}% annually</span>
                    </div>
                  )}
                  <div className="text-4xl text-[#0A1A2F] mb-1">
                    {billingCycle === 'monthly' ? tier.monthlyPrice : tier.annualPrice}
                  </div>
                  {tier.monthlyPrice !== 'Custom' && (
                    <>
                      <div className="text-sm text-[#0A1A2F]/60">
                        {billingCycle === 'monthly' ? 'per month' : 'per year'}
                      </div>
                      {billingCycle === 'annual' && tier.savings > 0 && (
                        <div className="text-xs text-[#2AD1C8] mt-1">
                          £{((tier.monthlyTotal - tier.annualTotal) / 100).toFixed(0)} saved vs monthly
                        </div>
                      )}
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2AD1C8] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0A1A2F]/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {tier.cta === 'Contact Sales' ? (
                  <Link
                    to="/contact"
                    className={`w-full py-3 rounded-lg text-center transition-all ${
                      tier.popular
                        ? 'bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90'
                        : 'bg-[#0A1A2F] text-white hover:bg-[#0A1A2F]/90'
                    }`}
                  >
                    {tier.cta}
                  </Link>
                ) : (
                  <div className="space-y-2">
                    <Button
                      onClick={() => handleTrialClick(tier.name, tier.monthlyPrice)}
                      className={`w-full py-3 rounded-lg text-center transition-all ${
                        tier.popular
                          ? 'bg-gradient-to-r from-[#2AD1C8] to-[#A6F750] text-[#0A1A2F] hover:opacity-90'
                          : 'bg-[#0A1A2F] text-white hover:bg-[#0A1A2F]/90'
                      }`}
                    >
                      Start 14-Day Free Trial
                    </Button>
                    <button
                      onClick={() => handleSubscribeClick(tier.name, tier.monthlyPrice)}
                      className="w-full py-2 text-center text-sm text-[#0A1A2F]/60 hover:text-[#2AD1C8] transition-colors"
                    >
                      or Subscribe Now →
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">All Plans Include</h2>
            <p className="text-[#0A1A2F]/60 max-w-2xl mx-auto">
              Core platform features available across all tiers to ensure quality and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                category: 'Platform Core',
                features: [
                  'Multi-tenant architecture',
                  'Contractor pool management',
                  'Job routing & scheduling',
                  'Payment processing',
                  'Mobile apps (iOS & Android)',
                ],
              },
              {
                category: 'AI & Automation',
                features: [
                  'ReClova™ AI engine',
                  'Intelligent job routing',
                  'Automated compliance',
                  'WTN generation',
                  'Eco-credit tracking',
                ],
              },
              {
                category: 'Security & Support',
                features: [
                  'GDPR compliance',
                  'End-to-end encryption',
                  'SOC 2 certification',
                  'Regular backups',
                  'Email & chat support',
                ],
              },
            ].map((group, index) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 border border-[#0A1A2F]/10 rounded-2xl p-6"
              >
                <h3 className="text-[#0A1A2F] mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#0A1A2F]/80">
                      <Check className="w-4 h-4 text-[#2AD1C8]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#0A1A2F] mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
              },
              {
                q: 'What counts as a job?',
                a: 'A job is a single service request from booking to completion, regardless of complexity or duration.',
              },
              {
                q: 'Are there setup fees?',
                a: 'No setup fees for Starter, Growth, and Scale plans. Enterprise plans include white-glove onboarding.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, ACH transfers, and wire transfers for annual plans.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! All paid plans include a 14-day free trial with full access to features.',
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-[#0A1A2F]/10 rounded-xl p-6"
              >
                <h3 className="text-[#0A1A2F] mb-2">{faq.q}</h3>
                <p className="text-[#0A1A2F]/60">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#2AD1C8] to-[#A6F750]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#0A1A2F] mb-4">Ready to Get Started?</h2>
            <p className="text-[#0A1A2F]/80 mb-8 text-lg">
              Join leading service brands powered by Nexus Crux. Start your free trial today.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#0A1A2F] text-white rounded-lg hover:bg-[#0A1A2F]/90 transition-colors"
            >
              Book a Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trial Dialog */}
      <TrialSignupDialog
        open={trialDialogOpen}
        onOpenChange={setTrialDialogOpen}
        selectedPlan={selectedPlan}
        price={selectedPrice}
        billingCycle={billingCycle}
      />

      {/* Subscribe Dialog */}
      <SubscribeDialog
        open={subscribeDialogOpen}
        onOpenChange={setSubscribeDialogOpen}
        selectedPlan={selectedPlan}
        price={selectedPrice}
        billingCycle={billingCycle}
      />
    </div>
  );
}