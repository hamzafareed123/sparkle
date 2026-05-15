import { Check, Star, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './HeroSection.css'
import googleIcon from '../../../assets/google.png'
import heroImage from '../../../assets/hero.png'

export function HeroSection() {
  return (
    <motion.section
      className="hero container hero-exact shadow-sm"
      style={{ backgroundImage: `url(${heroImage})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Floating particles for cinematic effect */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0
            }}
            animate={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div 
        className="hero-card exact-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.span 
            className="brand-highlight"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Sparkles className="sparkle-icon" size={20} />
            FreshSpaces
          </motion.span> 
          <span className="divider">-</span> 
          <span className="tagline">Eco-Friendly Cleaning for Every Space</span>
        </motion.h1>
        
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Gentle on your home, tough on dirt. Naturally clean.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link to="/book" className="hero-btn primary">
              Free Quote
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link to="/services" className="hero-btn secondary">
              Services
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: Check, text: "Friendly" },
            { icon: Check, text: "Convenient" },
            { icon: Check, text: "Eco Friendly" }
          ].map((feature, index) => (
            <motion.p
              key={feature.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.1, x: 5 }}
            >
              <motion.i
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                <feature.icon size={12} strokeWidth={3} />
              </motion.i>
              {feature.text}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="hero-image" 
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      <motion.div 
        className="review-badge"
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.4, type: "spring" }}
        whileHover={{ y: -5, scale: 1.05 }}
      >
        <img className="google-logo" src={googleIcon} alt="Google" />
        <motion.p 
          className="stars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.6 + i * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <Star size={14} fill="currentColor" />
            </motion.div>
          ))}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.1 }}
        >
          5.0 rating from 492 reviews
        </motion.p>
        <motion.div 
          className="review-avatars"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.3 }}
        >
          {['A', 'D', 'C'].map((letter, index) => (
            <motion.span
              key={letter}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 2.3 + index * 0.1,
                type: "spring"
              }}
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {letter}
            </motion.span>
          ))}
          <motion.span 
            className="count"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
          >
            +489
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
