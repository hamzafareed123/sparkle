import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Shield, ExternalLink } from 'lucide-react'
import './LegalPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export function PrivacyPage() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <motion.div className="legal-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="legal-hero-content">
          <Link to="/" className="legal-back-link"><ArrowLeft size={16} /> Back to Home</Link>
          <div className="legal-hero-icon">🔒</div>
          <h1>Privacy Policy</h1>
          <p>How we collect, use, and protect your personal information</p>
          <div className="legal-updated"><Shield size={14} /> Last updated: May 2026</div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="legal-content" variants={fadeUp} initial="hidden" animate="visible">
        <div className="legal-card">
          <h2><span className="section-num">1</span> Information We Collect</h2>
          <p>At Sparkle &amp; Shine, we collect information to provide and improve our cleaning services. The types of information we collect include:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, phone number, and home address when you create an account or book a service.</li>
            <li><strong>Payment Information:</strong> Billing address and payment method details processed securely through our payment partners.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, features used, and booking history.</li>
            <li><strong>Device Information:</strong> Browser type, IP address, operating system, and device identifiers for security and analytics purposes.</li>
          </ul>

          <h2><span className="section-num">2</span> How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To process and manage your cleaning service bookings</li>
            <li>To communicate with you about appointments, updates, and promotions</li>
            <li>To personalize your experience and provide tailored service recommendations</li>
            <li>To improve our website, services, and customer experience</li>
            <li>To detect and prevent fraud, abuse, and security incidents</li>
            <li>To comply with legal obligations and enforce our terms</li>
          </ul>

          <div className="legal-callout">
            We will never sell your personal information to third parties. Your data is used solely to provide and improve our services.
          </div>

          <h2><span className="section-num">3</span> Data Sharing &amp; Third Parties</h2>
          <p>We may share your information with trusted third parties only in the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> Payment processors, email services, and analytics tools that help us operate our business.</li>
            <li><strong>Cleaning Professionals:</strong> Your name, address, and booking details are shared with assigned cleaning staff to fulfill your service.</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
          </ul>

          <h2><span className="section-num">4</span> Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information:</p>
          <ul>
            <li>SSL/TLS encryption for all data transmission</li>
            <li>Encrypted storage for sensitive data at rest</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>Role-based access controls for employee data access</li>
            <li>Two-factor authentication available for your account</li>
          </ul>

          <h2><span className="section-num">5</span> Cookies &amp; Tracking</h2>
          <p>We use cookies and similar technologies to enhance your browsing experience. These include:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for basic website functionality and security.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website to improve performance.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences for a personalized experience.</li>
          </ul>
          <p>You can manage your cookie preferences through your browser settings at any time.</p>

          <h2><span className="section-num">6</span> Your Rights</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> Request corrections to any inaccurate personal data.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data from our systems.</li>
            <li><strong>Portability:</strong> Request your data in a machine-readable format.</li>
            <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
          </ul>

          <h2><span className="section-num">7</span> Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
          <ul>
            <li>Email: <a href="mailto:privacy@sparkleandshine.com">privacy@sparkleandshine.com</a></li>
            <li>Phone: +7 (495) 151-9090</li>
            <li>Address: 123 Clean Street, Suite 456, City, Country</li>
          </ul>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="legal-footer-nav">
        <Link to="/terms"><ExternalLink size={15} /> Terms of Service</Link>
        <Link to="/login"><ExternalLink size={15} /> Sign In</Link>
        <Link to="/"><ExternalLink size={15} /> Home</Link>
      </div>
    </div>
  )
}
