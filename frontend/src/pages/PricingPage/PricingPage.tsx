import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Leaf, ArrowRight, ShieldCheck, CalendarX2, HeartHandshake, Loader2 } from 'lucide-react'
import { servicesApi } from '../../api/services.api'
import './PricingPage.css'

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.getAll,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const displayPrice = (price: number) => {
    const monthly = price
    const yearly = Math.round(price * 0.85)
    return isYearly ? yearly : monthly
  }

  return (
    <div className="pricing-page">
      <motion.div
        className="pricing-header section container"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="pricing-subtitle">
          Pricing Plans
          <Leaf className="leaf-icon" color="#3f704d" />
        </h2>
        <h1 className="pricing-title">
          Transparent Pricing,
          <br />
          No Surprises.
        </h1>
        <p className="pricing-desc">
          Choose the perfect cleaning plan for your home. All prices come directly from our live service catalog.
        </p>

        <div className="pricing-toggle-container">
          <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Standard</span>
          <button
            type="button"
            className={`pricing-toggle ${isYearly ? 'yearly' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
            aria-label="Toggle billing cycle"
          >
            <div className="toggle-circle" />
          </button>
          <span className={`toggle-label ${isYearly ? 'active' : ''}`}>
            Bundle <span className="save-badge">Save 15%</span>
          </span>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="container pricing-loading">
          <Loader2 className="spin" size={40} color="#3f704d" />
        </div>
      ) : isError ? (
        <div className="container pricing-empty">Unable to load pricing. Please try again later.</div>
      ) : services.length === 0 ? (
        <div className="container pricing-empty">No services listed yet. Check back soon!</div>
      ) : (
        <motion.div
          className="container pricing-grid section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
        >
          {services.map((service, index) => {
            const isPopular = index === 1 || (services.length === 1 && index === 0)
            return (
              <motion.div
                key={service._id}
                className={`pricing-card ${isPopular ? 'popular' : 'starter'}`}
                variants={fadeInUp}
                onMouseMove={handleMouseMove}
              >
                {isPopular && <div className="popular-ribbon">Popular</div>}
                <div className="card-top">
                  <h3>{service.name}</h3>
                  <p className="tier-desc">{service.description}</p>
                  <div className="price-block">
                    <span className="currency">$</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isYearly ? 'yearly' : 'monthly'}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="amount"
                      >
                        {displayPrice(service.price)}
                      </motion.span>
                    </AnimatePresence>
                    <span className="cycle">/ visit</span>
                  </div>
                  <p className="tier-duration">{service.duration}</p>
                </div>
                <div className="card-bottom">
                  <Link
                    to="/book"
                    state={{ service: service.name }}
                    className={`pricing-btn ${isPopular ? 'solid' : 'outline'}`}
                  >
                    Book Now {isPopular && <ArrowRight size={16} />}
                  </Link>
                  <ul className="feature-list">
                    <li>
                      <CheckCircle2 size={18} className="check-icon" /> Professional team
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="check-icon" /> Eco-friendly products
                    </li>
                    <li>
                      <CheckCircle2 size={18} className="check-icon" /> Satisfaction guaranteed
                    </li>
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <motion.div
        className="container trust-section section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={staggerContainer}
      >
        <div className="trust-grid">
          <motion.div className="trust-item" variants={fadeInUp}>
            <div className="trust-icon-box">
              <CalendarX2 size={28} color="#3f704d" />
            </div>
            <h4>Flexible Scheduling</h4>
            <p>Book online anytime. Reschedule with ease.</p>
          </motion.div>
          <motion.div className="trust-item" variants={fadeInUp}>
            <div className="trust-icon-box">
              <ShieldCheck size={28} color="#efcf7b" />
            </div>
            <h4>Vetted Professionals</h4>
            <p>Every cleaner is background-checked and insured.</p>
          </motion.div>
          <motion.div className="trust-item" variants={fadeInUp}>
            <div className="trust-icon-box">
              <HeartHandshake size={28} color="#ff8563" />
            </div>
            <h4>100% Satisfaction</h4>
            <p>Not happy? We will make it right.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
