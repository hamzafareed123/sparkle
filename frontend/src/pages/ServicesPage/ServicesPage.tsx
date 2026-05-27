import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, ArrowUpRight, Loader2 } from 'lucide-react'
import { servicesApi } from '../../api/services.api'
import { getMediaUrl } from '../../utils/media'
import { FaqSection } from '../../components/home/FaqSection/FaqSection'
import './ServicesPage.css'

export function ServicesPage() {
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: servicesApi.getAll,
  })

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  return (
    <div className="services-page">
      <motion.div
        className="services-header section container"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="services-subtitle">
          Services
          <Leaf className="leaf-icon" color="#3f704d" />
        </h2>
        <h1 className="services-title">Services We Provide..</h1>
      </motion.div>

      {isLoading ? (
        <div className="container services-loading">
          <Loader2 className="spin" size={40} color="#3f704d" />
          <p>Loading services...</p>
        </div>
      ) : isError ? (
        <div className="container services-empty">
          <p>Unable to load services. Please try again later.</p>
        </div>
      ) : services.length === 0 ? (
        <div className="container services-empty">
          <p>No services available at the moment.</p>
        </div>
      ) : (
        <motion.div
          className="container service-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          {services.map((item) => {
            const img = getMediaUrl(item.image)
            return (
              <motion.article key={item._id} className="service-card" variants={fadeInUp}>
                <div className="service-card-inner">
                  <div className="image-wrapper">
                    {img ? (
                      <img src={img} alt={item.name} />
                    ) : (
                      <div className="service-image-placeholder" />
                    )}
                  </div>
                  <h3>{item.name}</h3>
                  <p className="service-duration">{item.duration}</p>
                  <p className="service-price">${item.price.toFixed(2)}</p>
                  <p className="service-desc">{item.description}</p>
                  <Link to="/book" state={{ service: item.name }} className="learn-more-btn">
                    <ArrowUpRight size={18} /> Book Now
                  </Link>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      )}

      <motion.div
        className="container section dont-do-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <div className="dont-do-box">
          <Leaf className="dont-do-leaf" color="#69a341" fill="#437728" />
          <div className="dont-do-header">
            <h2>What We Dont Do?</h2>
            <div className="green-line"></div>
          </div>
          <div className="dont-do-content">
            <ul className="dont-do-list">
              <li>We don&apos;t compromise on quality.</li>
              <li>We don&apos;t use harsh or harmful chemicals.</li>
              <li>We don&apos;t cut corners during cleaning.</li>
              <li>We don&apos;t miss hidden spots or details.</li>
              <li>We don&apos;t ignore customer feedback.</li>
            </ul>
            <ul className="dont-do-list right">
              <li>We don&apos;t rush the job - we clean with care.</li>
              <li>We don&apos;t leave a mess behind.</li>
              <li>We don&apos;t charge hidden or surprise fees.</li>
              <li>We don&apos;t let unverified cleaners handle your home.</li>
            </ul>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeInUp}
      >
        <FaqSection hideNewsletter />
      </motion.div>
    </div>
  )
}
