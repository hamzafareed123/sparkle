import { CalendarCheck2, Leaf, Search, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import basketImage from '../../../assets/basket.png'
import './HowItWorksSection.css'

const steps = [
  {
    title: 'Find Us Fast Now',
    description: 'Sed ut perspiciatis unde omnis iste natus error voluptatem.',
    icon: Search,
    number: 1,
  },
  {
    title: 'Choose Services',
    description: 'Sed ut perspiciatis unde omnis iste natus error voluptatem.',
    icon: Sparkles,
    number: 2,
  },
  {
    title: 'Book Appointment',
    description: 'Sed ut perspiciatis unde omnis iste natus error voluptatem.',
    icon: CalendarCheck2,
    number: 3,
  },
]

export function HowItWorksSection() {
  return (
    <motion.section 
      className="container section works-section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="works-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        How <span className="brand-text">'FreshSpaces'</span> Works
      </motion.h2>
      
      <div className="works-steps">
        {steps.map((step, index) => (
          <motion.article
            key={step.title}
            className="works-step"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.4 + index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              transition: { duration: 0.3, type: "spring", stiffness: 400 }
            }}
          >
            <motion.div 
              className="works-icon-wrap"
              whileHover={{ 
                rotate: 360, 
                scale: 1.1,
                transition: { duration: 0.6, type: "spring" }
              }}
            >
              <step.icon size={18} strokeWidth={2} />
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.6 + index * 0.2,
                  type: "spring"
                }}
                viewport={{ once: true }}
              >
                {step.number}
              </motion.span>
            </motion.div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.article>
        ))}
      </div>

      <motion.div 
        className="who-we-are-shell"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
      >
        <motion.article 
          className="who-we-are-card"
          whileHover={{ 
            y: -5, 
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.3 }
          }}
        >
          <div>
            <motion.p 
              className="who-tag"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            >
              who we are <Leaf size={14} strokeWidth={2.4} />
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
            >
              We&apos;re Your Trusted Partner for a Fresh, Sparkling Space
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              viewport={{ once: true }}
            >
              At FreshSpaces, our mission is to make cleaning effortless and enjoyable
              by connecting you with reliable, professional cleaners who care about your
              home as much as you do.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/about" className="who-we-are-btn">Learn More</Link>
            </motion.div>
          </div>
          <motion.img 
            src={basketImage} 
            alt="Cleaning tools basket and flowers"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          />
        </motion.article>
      </motion.div>
    </motion.section>
  )
}
