import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicy() {
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
            <h1 className="text-white mb-4">Privacy Policy</h1>
            <p className="text-white/60">
              Last updated: 22 November 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-white/80">
            <section>
              <h2 className="text-white mb-4">1. Introduction</h2>
              <p className="mb-4">
                Nexus Crux Ltd ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our multi-tenant federated service bus platform (the "Platform").
              </p>
              <p>
                We are registered in the United Kingdom and comply with UK GDPR and the Data Protection Act 2018.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">2. Information We Collect</h2>
              
              <h3 className="text-white/90 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Account registration details (name, email address, company name)</li>
                <li>Payment and billing information</li>
                <li>Communication preferences</li>
                <li>Support requests and correspondence</li>
                <li>Profile information and settings</li>
              </ul>

              <h3 className="text-white/90 mb-3">2.2 Information Collected Automatically</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Usage data and analytics (page views, features accessed, time spent)</li>
                <li>Device information (browser type, IP address, operating system)</li>
                <li>Log files and error reports</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-white/90 mb-3">2.3 Platform Data</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>API requests and responses processed through the service bus</li>
                <li>Integration configurations and settings</li>
                <li>Performance metrics and system logs</li>
                <li>Metadata about data flows and connections</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide, maintain, and improve the Platform</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative information, updates, and security alerts</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Monitor and analyse usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues and security threats</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Conduct research and development for new features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white mb-4">4. Data Sharing and Disclosure</h2>
              
              <h3 className="text-white/90 mb-3">4.1 Service Providers</h3>
              <p className="mb-4">
                We may share your information with third-party service providers who perform services on our behalf, including payment processing, data analysis, email delivery, hosting services, and customer service.
              </p>

              <h3 className="text-white/90 mb-3">4.2 Business Transfers</h3>
              <p className="mb-4">
                If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>

              <h3 className="text-white/90 mb-3">4.3 Legal Requirements</h3>
              <p className="mb-4">
                We may disclose your information where required by law, court order, or governmental authority, or to protect our rights, property, or safety.
              </p>

              <h3 className="text-white/90 mb-3">4.4 Multi-Tenant Architecture</h3>
              <p>
                While our Platform operates in a multi-tenant environment, we maintain strict logical separation between tenant data. Your data is not shared with other tenants unless explicitly configured by you for integration purposes.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">5. Data Security</h2>
              <p className="mb-3">
                We implement appropriate technical and organisational measures to protect your information, including:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and penetration testing</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection and security</li>
                <li>Incident response and disaster recovery procedures</li>
                <li>ISO 27001 compliant security practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white mb-4">6. Data Retention</h2>
              <p className="mb-3">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records as required by law</li>
              </ul>
              <p>
                When data is no longer required, we securely delete or anonymise it in accordance with our data retention policy.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">7. Your Rights Under UK GDPR</h2>
              <p className="mb-3">You have the following rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-white">Right of Access:</strong> Request copies of your personal data</li>
                <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate data</li>
                <li><strong className="text-white">Right to Erasure:</strong> Request deletion of your data</li>
                <li><strong className="text-white">Right to Restrict Processing:</strong> Request limitation on how we use your data</li>
                <li><strong className="text-white">Right to Data Portability:</strong> Request transfer of your data</li>
                <li><strong className="text-white">Right to Object:</strong> Object to processing of your data</li>
                <li><strong className="text-white">Rights Related to Automated Decision-Making:</strong> Rights regarding automated decisions</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at <a href="mailto:privacy@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">privacy@nexuscrux.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="mb-3">
                We use cookies and similar tracking technologies to collect and track information about your use of the Platform. You can control cookies through your browser settings.
              </p>
              <p className="mb-3">Types of cookies we use:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-white">Essential Cookies:</strong> Required for the Platform to function</li>
                <li><strong className="text-white">Performance Cookies:</strong> Help us understand how visitors use the Platform</li>
                <li><strong className="text-white">Functional Cookies:</strong> Remember your preferences and settings</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white mb-4">9. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than the UK. When we transfer data internationally, we ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by the UK Information Commissioner's Office.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">10. Children's Privacy</h2>
              <p>
                Our Platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you become aware that a child has provided us with personal data, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-white mb-4">12. Contact Us</h2>
              <p className="mb-3">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-white/5 rounded-lg p-6 space-y-2">
                <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">privacy@nexuscrux.com</a></p>
                <p><strong className="text-white">Data Protection Officer:</strong> <a href="mailto:dpo@nexuscrux.com" className="text-[#2AD1C8] hover:text-[#A6F750]">dpo@nexuscrux.com</a></p>
                <p><strong className="text-white">Address:</strong> Nexus Crux Ltd, London, United Kingdom</p>
              </div>
              <p className="mt-4">
                You also have the right to lodge a complaint with the Information Commissioner's Office (ICO), the UK's supervisory authority for data protection issues.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}