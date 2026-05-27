import './TeamSection.css'
import { motion } from 'framer-motion'
import { teamMembers } from '../../../data/content'
import { Phone, Globe, Mail } from 'lucide-react'

export function TeamSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <section className="team-section section container">
      <motion.div 
        className="team-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <h2 className="team-subtitle">Our Team</h2>
        <h1 className="team-title">Meet The Experts<br/>Behind Our Success</h1>
        <p className="team-description">
          We pride ourselves on having a team of highly dedicated and trained professionals who are passionate about delivering the best cleaning services.
        </p>
      </motion.div>

      <motion.div 
        className="team-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {teamMembers.map((member, index) => (
          <motion.div key={index} className="team-card" variants={fadeInUp}>
            <div className="team-image-wrapper">
              <img src={member.image} alt={member.name} className="team-image" />
              <div className="team-social-overlay">
                <a href="/" className="social-icon" aria-label="Website"><Globe size={20} /></a>
                <a href="tel:+74951519090" className="social-icon" aria-label="Phone"><Phone size={20} /></a>
                <a href="mailto:hello@freshspaces.com" className="social-icon" aria-label="Email"><Mail size={20} /></a>
              </div>
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <span className="team-role">{member.role}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
