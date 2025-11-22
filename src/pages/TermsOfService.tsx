import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-[#2AD1C8] hover:text-[#A6F750] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-white mb-4">Terms of Service</h1>
            <p className="text-white/60">
              Last updated: 22 November 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-white mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                These Terms of Service ("Terms") constitute a legally binding agreement between you ("Customer", "you", or "your") and Nexus Crux Ltd ("Nexus Crux", "we", "us", or "our") governing your access to and use of the Nexus Crux multi-tenant federated service bus platform (the "Platform" or "Service").
              </p>
              <p>
                By accessing or using the Platform, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Platform.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">2. Service Description</h2>
              <p className="mb-3">
                Nexus Crux provides a multi-tenant, federated service bus platform designed for home-service brands and van-and-man contractors. The Platform includes:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Multi-tenant architecture with logical data separation</li>
                <li>Federated service bus for system integration</li>
                <li>API management and orchestration</li>
                <li>ReClova™ AI-powered job reconciliation</li>
                <li>Real-time data synchronisation</li>
                <li>Analytics and reporting tools</li>
                <li>Security and compliance features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white mb-4">3. Account Registration and Security</h2>
              
              <h3 className="text-white/90 mb-3">3.1 Account Creation</h3>
              <p className="mb-4">
                To use the Platform, you must create an account by providing accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials.
              </p>

              <h3 className="text-white/90 mb-3">3.2 Account Security</h3>
              <p className="mb-4">
                You are responsible for all activities that occur under your account. You must immediately notify us of any unauthorised access or security breaches.
              </p>

              <h3 className="text-white/90 mb-3">3.3 Account Eligibility</h3>
              <p>
                You must be at least 18 years old and have the legal capacity to enter into binding contracts to use the Platform. If you are using the Platform on behalf of an organisation, you represent that you have the authority to bind that organisation to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">4. Subscription Plans and Billing</h2>
              
              <h3 className="text-white/90 mb-3">4.1 Subscription Tiers</h3>
              <p className="mb-3">The Platform offers multiple subscription tiers:</p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong className="text-white">Foundation:</strong> For startups and small operations</li>
                <li><strong className="text-white">Growth:</strong> For scaling brands</li>
                <li><strong className="text-white">Professional:</strong> For established multi-brand operations</li>
                <li><strong className="text-white">Enterprise:</strong> For large-scale deployments</li>
              </ul>

              <h3 className="text-white/90 mb-3">4.2 Billing</h3>
              <p className="mb-4">
                Subscription fees are billed in advance on a monthly or annual basis. Annual subscriptions receive a 20% discount. All fees are quoted in GBP and are exclusive of applicable taxes.
              </p>

              <h3 className="text-white/90 mb-3">4.3 Payment Terms</h3>
              <p className="mb-4">
                Payment is due immediately upon subscription. You authorise us to charge your payment method for all fees. If payment fails, we may suspend or terminate your access to the Platform.
              </p>

              <h3 className="text-white/90 mb-3">4.4 Price Changes</h3>
              <p>
                We reserve the right to modify our pricing with 30 days' notice. Price changes will not affect your current billing cycle.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">5. Acceptable Use Policy</h2>
              
              <h3 className="text-white/90 mb-3">5.1 Permitted Use</h3>
              <p className="mb-4">
                You may use the Platform only for lawful purposes and in accordance with these Terms.
              </p>

              <h3 className="text-white/90 mb-3">5.2 Prohibited Activities</h3>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit malicious code or viruses</li>
                <li>Attempt to gain unauthorised access to the Platform</li>
                <li>Interfere with or disrupt the Platform's operation</li>
                <li>Use the Platform to send spam or unsolicited communications</li>
                <li>Reverse engineer or decompile the Platform</li>
                <li>Resell or sublicense access to the Platform without authorisation</li>
                <li>Use the Platform to store or transmit illegal content</li>
                <li>Bypass any security or access control measures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white mb-4">6. Intellectual Property Rights</h2>
              
              <h3 className="text-white/90 mb-3">6.1 Platform Ownership</h3>
              <p className="mb-4">
                The Platform, including all software, technology, designs, and content, is owned by Nexus Crux and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable licence to use the Platform in accordance with these Terms.
              </p>

              <h3 className="text-white/90 mb-3">6.2 Customer Data</h3>
              <p className="mb-4">
                You retain all rights to your data. By using the Platform, you grant us a licence to process your data solely to provide the Service.
              </p>

              <h3 className="text-white/90 mb-3">6.3 Feedback</h3>
              <p>
                Any feedback, suggestions, or ideas you provide about the Platform become our property, and we may use them without obligation to you.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">7. Data Protection and Privacy</h2>
              <p className="mb-4">
                We process your personal data in accordance with our Privacy Policy and applicable data protection laws, including UK GDPR. You are responsible for ensuring that any data you process through the Platform complies with applicable data protection regulations.
              </p>
              <p>
                As a data processor, we will process customer data only in accordance with your instructions and our Data Processing Agreement (DPA).
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">8. Service Level Agreement</h2>
              
              <h3 className="text-white/90 mb-3">8.1 Availability</h3>
              <p className="mb-4">
                We aim to provide 99.9% uptime for the Platform (excluding scheduled maintenance). Specific SLA terms are detailed in your subscription agreement.
              </p>

              <h3 className="text-white/90 mb-3">8.2 Maintenance</h3>
              <p className="mb-4">
                We may perform scheduled maintenance with advance notice. Emergency maintenance may be performed without notice.
              </p>

              <h3 className="text-white/90 mb-3">8.3 Support</h3>
              <p>
                Support levels vary by subscription tier and are detailed in your subscription agreement.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">9. Warranties and Disclaimers</h2>
              
              <h3 className="text-white/90 mb-3">9.1 Limited Warranty</h3>
              <p className="mb-4">
                We warrant that the Platform will perform substantially in accordance with its documentation under normal use.
              </p>

              <h3 className="text-white/90 mb-3">9.2 Disclaimer</h3>
              <p className="mb-4">
                EXCEPT AS EXPRESSLY PROVIDED, THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>

              <h3 className="text-white/90 mb-3">9.3 Third-Party Services</h3>
              <p>
                The Platform may integrate with third-party services. We are not responsible for the availability, accuracy, or content of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">10. Limitation of Liability</h2>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEXUS CRUX SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, REVENUE, DATA, OR USE, ARISING OUT OF OR RELATED TO THESE TERMS OR THE PLATFORM.
              </p>
              <p>
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE 12 MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">11. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Nexus Crux from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Platform, violation of these Terms, or infringement of any third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">12. Term and Termination</h2>
              
              <h3 className="text-white/90 mb-3">12.1 Term</h3>
              <p className="mb-4">
                These Terms commence when you first access the Platform and continue until terminated.
              </p>

              <h3 className="text-white/90 mb-3">12.2 Termination by You</h3>
              <p className="mb-4">
                You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. No refunds are provided for partial billing periods.
              </p>

              <h3 className="text-white/90 mb-3">12.3 Termination by Us</h3>
              <p className="mb-4">
                We may suspend or terminate your account immediately if you violate these Terms or for non-payment.
              </p>

              <h3 className="text-white/90 mb-3">12.4 Effect of Termination</h3>
              <p>
                Upon termination, your right to use the Platform ceases immediately. You may request export of your data within 30 days of termination, after which we may delete your data in accordance with our retention policy.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">13. Confidentiality</h2>
              <p>
                Each party agrees to maintain the confidentiality of the other party's confidential information and use it only for purposes of performing under these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">14. Changes to Terms</h2>
              <p className="mb-4">
                We may modify these Terms at any time. We will notify you of material changes via email or through the Platform. Your continued use of the Platform after changes take effect constitutes acceptance of the modified Terms.
              </p>
              <p>
                If you do not agree to the modified Terms, you must stop using the Platform and may terminate your subscription.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">15. Governing Law and Dispute Resolution</h2>
              
              <h3 className="text-white/90 mb-3">15.1 Governing Law</h3>
              <p className="mb-4">
                These Terms are governed by the laws of England and Wales, without regard to conflict of law principles.
              </p>

              <h3 className="text-white/90 mb-3">15.2 Jurisdiction</h3>
              <p className="mb-4">
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>

              <h3 className="text-white/90 mb-3">15.3 Dispute Resolution</h3>
              <p>
                Before filing a legal claim, you agree to attempt to resolve disputes informally by contacting us at legal@nexuscrux.com.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">16. General Provisions</h2>
              
              <h3 className="text-white/90 mb-3">16.1 Entire Agreement</h3>
              <p className="mb-4">
                These Terms, together with our Privacy Policy and any applicable subscription agreement, constitute the entire agreement between you and Nexus Crux.
              </p>

              <h3 className="text-white/90 mb-3">16.2 Severability</h3>
              <p className="mb-4">
                If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
              </p>

              <h3 className="text-white/90 mb-3">16.3 Waiver</h3>
              <p className="mb-4">
                Our failure to enforce any right or provision in these Terms shall not constitute a waiver of that right or provision.
              </p>

              <h3 className="text-white/90 mb-3">16.4 Assignment</h3>
              <p>
                You may not assign or transfer these Terms without our prior written consent. We may assign these Terms without restriction.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">17. Contact Information</h2>
              <p className="mb-3">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-6 space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:legal@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">legal@nexuscrux.com</a></p>
                <p><strong className="text-white">Support:</strong> <a href="mailto:support@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">support@nexuscrux.com</a></p>
                <p><strong className="text-white">Address:</strong> Nexus Crux Ltd, London, United Kingdom</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}