import { ArrowLeft, Shield, Lock, FileText, Users, Database, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export function GDPR() {
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
            <h1 className="text-white mb-4">GDPR Compliance</h1>
            <p className="text-white/60">
              Our commitment to data protection and UK GDPR compliance
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 rounded-2xl p-8 mb-12 border border-[#2AD1C8]/20">
            <p className="text-white/80">
              Nexus Crux Ltd is committed to protecting the privacy and security of personal data. We comply with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. This page outlines our approach to data protection and your rights under UK GDPR.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Key Principles */}
            <section>
              <h2 className="text-white mb-6">GDPR Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Shield className="w-8 h-8 text-[#2AD1C8] mb-4" />
                  <h3 className="text-white mb-3">Lawfulness & Transparency</h3>
                  <p className="text-white/70 text-sm">
                    We process data lawfully, fairly, and transparently, ensuring you understand how your data is used.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Lock className="w-8 h-8 text-[#2AD1C8] mb-4" />
                  <h3 className="text-white mb-3">Purpose Limitation</h3>
                  <p className="text-white/70 text-sm">
                    We collect data for specific, legitimate purposes and do not process it in ways incompatible with those purposes.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Database className="w-8 h-8 text-[#2AD1C8] mb-4" />
                  <h3 className="text-white mb-3">Data Minimisation</h3>
                  <p className="text-white/70 text-sm">
                    We collect only the data necessary for our purposes and do not retain it longer than required.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <FileText className="w-8 h-8 text-[#2AD1C8] mb-4" />
                  <h3 className="text-white mb-3">Accuracy</h3>
                  <p className="text-white/70 text-sm">
                    We take steps to ensure personal data is accurate and kept up to date, and we rectify inaccuracies promptly.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Users className="w-8 h-8 text-[#2AD1C8] mb-4" />
                  <h3 className="text-white mb-3">Storage Limitation</h3>
                  <p className="text-white/70 text-sm">
                    We retain data only as long as necessary and securely delete it when no longer required.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Globe className="w-8 h-8 text-[#2AD1C8] mb-4" />
                  <h3 className="text-white mb-3">Integrity & Confidentiality</h3>
                  <p className="text-white/70 text-sm">
                    We implement appropriate security measures to protect data against unauthorised access and breaches.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Your Data Protection Rights</h2>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">1. Right to be Informed</h3>
                  <p className="text-white/70 mb-3">
                    You have the right to be informed about the collection and use of your personal data. We provide this information through our Privacy Policy and communications.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Review our Privacy Policy or contact us for specific information about data processing.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">2. Right of Access</h3>
                  <p className="text-white/70 mb-3">
                    You can request a copy of the personal data we hold about you, free of charge. We will respond within one month.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Submit a Subject Access Request (SAR) to privacy@nexuscrux.com.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">3. Right to Rectification</h3>
                  <p className="text-white/70 mb-3">
                    You can request correction of inaccurate or incomplete personal data. We will correct errors within one month.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Contact us with details of the inaccuracy at privacy@nexuscrux.com or update your account settings.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">4. Right to Erasure ("Right to be Forgotten")</h3>
                  <p className="text-white/70 mb-3">
                    You can request deletion of your personal data in certain circumstances, such as when it's no longer necessary for the purpose it was collected.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Submit a deletion request to privacy@nexuscrux.com. Note: We may need to retain some data for legal obligations.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">5. Right to Restrict Processing</h3>
                  <p className="text-white/70 mb-3">
                    You can request that we limit how we use your data in certain circumstances, such as when you contest the accuracy of the data.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Contact us at privacy@nexuscrux.com with your restriction request.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">6. Right to Data Portability</h3>
                  <p className="text-white/70 mb-3">
                    You can request a copy of your personal data in a structured, commonly used, machine-readable format, and you can request that we transfer it to another controller.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Request data export at privacy@nexuscrux.com. We provide data in JSON or CSV format.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">7. Right to Object</h3>
                  <p className="text-white/70 mb-3">
                    You can object to processing of your personal data for direct marketing purposes or where processing is based on legitimate interests.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Contact us at privacy@nexuscrux.com or use the unsubscribe link in our emails.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-white mb-3">8. Rights Related to Automated Decision-Making</h3>
                  <p className="text-white/70 mb-3">
                    You have the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects. Our ReClova™ system provides recommendations but maintains human oversight.
                  </p>
                  <p className="text-sm text-white/60">
                    <strong>How to exercise:</strong> Contact us at privacy@nexuscrux.com for information about automated processing.
                  </p>
                </div>
              </div>
            </section>

            {/* Legal Basis */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Legal Basis for Processing</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
                <div>
                  <h3 className="text-white mb-2">Contractual Necessity</h3>
                  <p className="text-white/70 text-sm">
                    We process your data to provide the Platform services as outlined in our Terms of Service.
                  </p>
                </div>
                <div>
                  <h3 className="text-white mb-2">Legitimate Interests</h3>
                  <p className="text-white/70 text-sm">
                    We process data for improving our services, preventing fraud, and ensuring security, balanced against your rights and interests.
                  </p>
                </div>
                <div>
                  <h3 className="text-white mb-2">Legal Obligation</h3>
                  <p className="text-white/70 text-sm">
                    We process data to comply with legal and regulatory requirements, including tax and accounting obligations.
                  </p>
                </div>
                <div>
                  <h3 className="text-white mb-2">Consent</h3>
                  <p className="text-white/70 text-sm">
                    For certain processing activities, such as marketing communications, we rely on your explicit consent, which you can withdraw at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Data Security Measures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> End-to-end encryption</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> ISO 27001 certified practices</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> Regular security audits</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> Multi-factor authentication</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> Data access controls</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> Incident response procedures</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> Regular penetration testing</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <p className="text-sm"><span className="text-[#2AD1C8]">✓</span> Employee security training</p>
                </div>
              </div>
            </section>

            {/* Data Breach Notification */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Data Breach Notification</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="mb-4">
                  In the event of a data breach that poses a risk to your rights and freedoms, we will:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Notify the Information Commissioner's Office (ICO) within 72 hours of becoming aware of the breach</li>
                  <li>Notify affected individuals without undue delay if the breach poses a high risk</li>
                  <li>Provide information about the nature of the breach and steps taken to mitigate it</li>
                  <li>Implement measures to prevent future breaches</li>
                </ul>
              </div>
            </section>

            {/* International Transfers */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">International Data Transfers</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="mb-4">
                  When we transfer personal data outside the UK, we ensure appropriate safeguards are in place:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Standard Contractual Clauses (SCCs) approved by the UK ICO</li>
                  <li>Adequacy decisions for countries with equivalent data protection standards</li>
                  <li>Binding corporate rules for intra-group transfers</li>
                  <li>Regular reviews of transfer mechanisms to ensure continued compliance</li>
                </ul>
              </div>
            </section>

            {/* Data Protection Officer */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Data Protection Officer</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="mb-4">
                  Our Data Protection Officer (DPO) oversees our data protection strategy and GDPR compliance. You can contact our DPO regarding:
                </p>
                <ul className="space-y-2 list-disc list-inside mb-6">
                  <li>Questions about data processing</li>
                  <li>Exercising your data protection rights</li>
                  <li>Data protection concerns or complaints</li>
                  <li>Data protection impact assessments</li>
                </ul>
                <div className="bg-[#2AD1C8]/10 rounded-lg p-4 border border-[#2AD1C8]/30">
                  <p className="text-white"><strong>Data Protection Officer</strong></p>
                  <p className="text-sm mt-2">Email: <a href="mailto:dpo@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">dpo@nexuscrux.com</a></p>
                  <p className="text-sm">Address: Nexus Crux Ltd, London, United Kingdom</p>
                </div>
              </div>
            </section>

            {/* Lodging a Complaint */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Lodging a Complaint</h2>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <p className="mb-4">
                  If you believe we have not handled your personal data properly, you have the right to lodge a complaint with the Information Commissioner's Office (ICO):
                </p>
                <div className="bg-[#A6F750]/10 rounded-lg p-4 border border-[#A6F750]/30 space-y-2">
                  <p className="text-white"><strong>Information Commissioner's Office</strong></p>
                  <p className="text-sm">Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#2AD1C8] hover:text-[#A6F750]">ico.org.uk</a></p>
                  <p className="text-sm">Helpline: 0303 123 1113</p>
                  <p className="text-sm">Address: Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF</p>
                </div>
                <p className="text-sm text-white/60 mt-4">
                  We encourage you to contact us first at privacy@nexuscrux.com so we can address your concerns directly.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="text-white/80">
              <h2 className="text-white mb-6">Contact Us About GDPR</h2>
              <div className="bg-gradient-to-br from-[#2AD1C8]/10 to-[#A6F750]/10 rounded-xl p-6 border border-[#2AD1C8]/20">
                <p className="mb-4">
                  For any questions or requests regarding GDPR and your data protection rights:
                </p>
                <div className="space-y-2">
                  <p><strong className="text-white">Privacy Team:</strong> <a href="mailto:privacy@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">privacy@nexuscrux.com</a></p>
                  <p><strong className="text-white">Data Protection Officer:</strong> <a href="mailto:dpo@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">dpo@nexuscrux.com</a></p>
                  <p><strong className="text-white">Response Time:</strong> Within 30 days (as required by UK GDPR)</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}