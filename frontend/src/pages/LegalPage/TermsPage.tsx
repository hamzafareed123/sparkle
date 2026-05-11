import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react'
import './LegalPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export function TermsPage() {
  return (
    <div className="legal-page">
      {/* Hero */}
      <motion.div className="legal-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="legal-hero-content">
          <Link to="/" className="legal-back-link"><ArrowLeft size={16} /> Back to Home</Link>
          <div className="legal-hero-icon">📋</div>
          <h1>Terms of Service</h1>
          <p>Please read these terms carefully before using our services</p>
          <div className="legal-updated"><FileText size={14} /> Last updated: May 2026</div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div className="legal-content" variants={fadeUp} initial="hidden" animate="visible">
        <div className="legal-card">
          <h2><span className="section-num">1</span> Acceptance of Terms</h2>
          <p>By accessing or using Sparkle &amp; Shine's website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
          <p>These terms apply to all visitors, users, and customers of our platform. We reserve the right to update these terms at any time, and your continued use constitutes acceptance of any changes.</p>

          <h2><span className="section-num">2</span> Our Services</h2>
          <p>Sparkle &amp; Shine provides professional cleaning services including but not limited to:</p>
          <ul>
            <li>Residential home cleaning (regular, deep clean, and move-in/move-out)</li>
            <li>Commercial and office cleaning</li>
            <li>Specialized cleaning (carpet, upholstery, window cleaning)</li>
            <li>Post-construction and renovation cleaning</li>
            <li>Eco-friendly and green cleaning options</li>
          </ul>
          <p>Services are subject to availability in your area. We strive to provide the best quality cleaning, but results may vary based on the condition of the premises.</p>

          <h2><span className="section-num">3</span> Account Registration</h2>
          <p>To book our services, you must create an account and provide accurate information. You are responsible for:</p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing current and accurate contact and billing information</li>
            <li>Notifying us immediately of any unauthorized access</li>
          </ul>
          <div className="legal-callout">
            You must be at least 18 years old to create an account and use our services. Accounts created with false information may be suspended.
          </div>

          <h2><span className="section-num">4</span> Booking &amp; Cancellation Policy</h2>
          <p>When you book a cleaning service through our platform:</p>
          <ul>
            <li><strong>Confirmation:</strong> All bookings are confirmed via email and SMS notification.</li>
            <li><strong>Rescheduling:</strong> You may reschedule at no charge with at least 24 hours notice.</li>
            <li><strong>Cancellation:</strong> Cancellations made with less than 24 hours notice may incur a cancellation fee of up to 50% of the service cost.</li>
            <li><strong>No-show:</strong> If you are not available at the scheduled time, the full service fee may be charged.</li>
            <li><strong>Access:</strong> You must ensure our cleaning team has safe and reasonable access to the premises.</li>
          </ul>

          <h2><span className="section-num">5</span> Pricing &amp; Payment</h2>
          <p>All prices are displayed on our website and confirmed before booking. Payment terms include:</p>
          <ul>
            <li>Prices are inclusive of labor and standard cleaning supplies</li>
            <li>Additional services or heavily soiled areas may incur extra charges, communicated in advance</li>
            <li>Payment is processed securely through our authorized payment partners</li>
            <li>We accept major credit/debit cards and digital payment methods</li>
            <li>Invoices are sent electronically after service completion</li>
          </ul>

          <h2><span className="section-num">6</span> Liability &amp; Insurance</h2>
          <p>Sparkle &amp; Shine carries comprehensive insurance coverage. However:</p>
          <ul>
            <li>We are not liable for damage to items not disclosed before the cleaning session</li>
            <li>Claims for damage must be reported within 24 hours of service completion</li>
            <li>We are not responsible for pre-existing damage, wear, or fragile items not properly secured</li>
            <li>Our maximum liability is limited to the cost of the service provided</li>
          </ul>

          <h2><span className="section-num">7</span> Intellectual Property</h2>
          <p>All content on the Sparkle &amp; Shine website, including text, graphics, logos, images, and software, is our property and protected by copyright and trademark laws. You may not:</p>
          <ul>
            <li>Reproduce, distribute, or modify any content without written permission</li>
            <li>Use our branding or trademarks for commercial purposes</li>
            <li>Scrape, crawl, or automate access to our website</li>
          </ul>

          <h2><span className="section-num">8</span> Termination</h2>
          <p>We reserve the right to suspend or terminate your account at our discretion if you violate these terms, engage in abusive behavior toward our staff, or use our services for unlawful purposes. Upon termination, your right to use our services ceases immediately.</p>

          <h2><span className="section-num">9</span> Governing Law</h2>
          <p>These Terms of Service are governed by and construed in accordance with the laws of the applicable jurisdiction. Any disputes arising from these terms shall be resolved through binding arbitration or in the courts of the applicable jurisdiction.</p>

          <h2><span className="section-num">10</span> Contact Us</h2>
          <p>For questions regarding these Terms of Service, please contact us:</p>
          <ul>
            <li>Email: <a href="mailto:legal@sparkleandshine.com">legal@sparkleandshine.com</a></li>
            <li>Phone: +7 (495) 151-9090</li>
            <li>Address: 123 Clean Street, Suite 456, City, Country</li>
          </ul>
        </div>
      </motion.div>

      {/* Footer Links */}
      <div className="legal-footer-nav">
        <Link to="/privacy"><ExternalLink size={15} /> Privacy Policy</Link>
        <Link to="/login"><ExternalLink size={15} /> Sign In</Link>
        <Link to="/"><ExternalLink size={15} /> Home</Link>
      </div>
    </div>
  )
}
