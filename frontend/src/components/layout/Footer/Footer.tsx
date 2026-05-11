import "./Footer.css";
import { motion } from "framer-motion";
import leafImage from "../../../assets/leaf.png"
import { Globe, Share2, MessageCircle, Users, Mail, Phone, MapPin, Heart, Sparkles } from "lucide-react";

const socialLinks = [
  { icon: Globe, label: "Website", href: "#" },
  { icon: Share2, label: "Share", href: "#" },
  { icon: MessageCircle, label: "Chat", href: "#" },
  { icon: Users, label: "Community", href: "#" }
];

const footerSections = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Gallery", "Services"]
  },
  {
    title: "Company",
    links: ["About", "Terms", "Privacy", "Legal"]
  },
  {
    title: "Support",
    links: ["Feedback", "Help Center", "Contact", "FAQ"]
  }
];

export function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {/* Enhanced background effects */}
      <div className="footer-glow"></div>
      <div className="footer-particles">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="footer-particle"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="footer-container">

        {/* LEFT SECTION */}
        <motion.div
          className="footer-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            FreshSpaces
            <motion.span
              className="logo-leaf"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src={leafImage} alt="leaf" width={40} height={40} />
            </motion.span>
          </motion.h2>

          <motion.p
            className="description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Building calm, modern digital spaces with thoughtful design and smooth experiences.
          </motion.p>

          {/* Enhanced contact info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="contact-item">
              <Mail size={14} />
              <span>hello@freshspaces.com</span>
            </div>
            <div className="contact-item">
              <Phone size={14} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <MapPin size={14} />
              <span>New York, NY</span>
            </div>
          </motion.div>

          {/* Enhanced social icons */}
          <motion.div
            className="social-icons"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="icon"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + index * 0.1,
                  type: "spring"
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3, type: "spring" }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* LINKS SECTION */}
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + sectionIndex * 0.1
              }}
              viewport={{ once: true }}
            >
              <motion.h4
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {section.title}
              </motion.h4>
              {section.links.map((link, linkIndex) => (
                <motion.a
                  key={link}
                  href="#"
                  className="footer-link"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + sectionIndex * 0.1 + linkIndex * 0.05
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    x: 8,
                    color: "var(--primary-color)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Enhanced bottom section */}
      <motion.div
        className="footer-bottom"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.p
          className="copyright"
          whileHover={{ scale: 1.02 }}
        >
          2026 FreshSpaces — Made with{" "}
          <motion.span
            className="heart"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={12} fill="currentColor" />
          </motion.span>
          {" "}by Hamza Fareed
        </motion.p>

        {/* Additional bottom links */}
        <div className="bottom-links">
          <motion.a
            href="#"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={14} />
            Back to top
          </motion.a>
        </div>
      </motion.div>
    </motion.footer>
  );
}