import './AboutPage.css'
import heroImg from '../../assets/Mask group.png'
import { motion } from 'framer-motion'
import { Target, Flower2, Leaf } from 'lucide-react'
import { TeamSection } from '../../components/about/TeamSection/TeamSection'

export function AboutPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="about-page">
      {/* Header Section */}
      <motion.div 
        className="about-header section container"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <h2 className="about-subtitle">
          About Us
          <Leaf className="leaf-icon" color="#3f704d" />
        </h2>
        <h1 className="about-title">Who We Are..</h1>
      </motion.div>

      {/* Hero Image */}
      <motion.div 
        className="about-hero-container container"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <img src={heroImg} alt="Cleaning team at work in office" className="about-hero-image" />
        <div className="center-leaf-icon">
          <Leaf size={48} color="#69a341" fill="#437728" />
        </div>
      </motion.div>

      <motion.div 
        className="container section deals-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="deals-header">
          <h2>Why Our Deals Are<br />Best In The Market</h2>
        </div>
        <div className="deals-text">
          <p>
            At Paleovalley, our mission is to help people reclaim vibrant health. We provide products that prioritize nutrient density in an industry that prioritizes everything else. We believe that every dietary choice and every added ingredient is a powerful opportunity to love and care for onese
          </p>
        </div>
      </motion.div>

      <motion.div 
        className="container three-col cards-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="feature-card" variants={fadeInUp}>
           <Leaf className="card-leaf" color="#5ea83c" fill="#8ed16d" strokeWidth={1} />
           <div className="card-header">
             <h3>Our Story</h3>
             <Target size={28} color="#5ea83c" />
           </div>
           <p>We launched Paleovalley with the belief that every ingredient is an opportunity to improve your health.</p>
           <span className="learn-more">Learn more</span>
        </motion.div>
        <motion.div className="feature-card" variants={fadeInUp}>
           <Leaf className="card-leaf" color="#5ea83c" fill="#8ed16d" strokeWidth={1} />
           <div className="card-header">
             <h3>Our Mission</h3>
             <Target size={28} color="#5ea83c" />
           </div>
           <p>Our mission is to create products that always prioritize health over profit.</p>
           <span className="learn-more">Learn more</span>
        </motion.div>
        <motion.div className="feature-card" variants={fadeInUp}>
           <Leaf className="card-leaf" color="#5ea83c" fill="#8ed16d" strokeWidth={1} />
           <div className="card-header">
             <h3>100% Organic</h3>
             <Flower2 size={28} color="#5ea83c" />
           </div>
           <p>Many products claimed that their products are 100% pure, but our products are 100% Original.</p>
           <span className="learn-more">Learn more</span>
        </motion.div>
      </motion.div>

      {/* Process Section */}
      <div className="process-section">
        <div className="container relative-container">
          
          <motion.div 
            className="process-header"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h2>We have best team<br />and best process</h2>
            <p>We work passionately to ensure your environment is healthy. High thoughts and services exceeding challenges away everyday joy.</p>
            <button className="btn process-btn">Get Started</button>
          </motion.div>

          <motion.div 
            className="timeline-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
             <svg className="wavy-line" preserveAspectRatio="none" viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 100 C 200 150 300 20 500 100 C 700 180 800 -20 1000 80" stroke="#ff5c5c" strokeWidth="4" fill="none" strokeDasharray="6 6"/>
             </svg>
             
             <motion.div className="step step-1" variants={fadeInUp}>
                <div className="step-number">1</div>
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                <h4>Expert Professionals</h4>
                <p>Our team consists of highly skilled experts dedicated to delivering top-quality work with precision and creativity.</p>
             </motion.div>
             
             <motion.div className="step step-2" variants={fadeInUp}>
                <div className="step-number">2</div>
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                <h4>Streamlined Process</h4>
                <p>From planning to delivery, every step follows a smooth, transparent and efficient process to ensure timely results.</p>
             </motion.div>
             
             <motion.div className="step step-3" variants={fadeInUp}>
                <div className="step-number">3</div>
                <div className="step-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                <h4>Collaborative Approach</h4>
                <p>From the first job in he give enriching. They ego and draw mistakes. Improving end client instantly.</p>
             </motion.div>
          </motion.div>
          <button className="btn process-contact-btn">Contact Us</button>
        </div>
      </div>

      <TeamSection />

      {/* Partners Section */}
      <motion.section 
        className="partners-section container section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <Leaf className="partners-leaf" color="#69a341" fill="#437728" />
        <div className="partners-inner">
          <div className="partners-left">
            <h2 className="partners-heading">Our Business<br />Partners</h2>
            <p>The purpose of fashion is to negate our persistent fear of death. Decorating ourselves in particular things.</p>
          </div>
          <div className="partners-right">
            <div className="logo-grid">
              <div className="logo-box iconic">
                <h3>Iconic</h3>
              </div>
              <div className="logo-box microwave">
                <h3>MICROWAVE<br/><span>HAIR SALON</span></h3>
              </div>
              <div className="logo-box smile">
                <h3>Smile</h3>
              </div>
              <div className="logo-box retro">
                <h3><span>THE</span><br/>RETRO<br/><span className="bottom">STUDIO</span></h3>
              </div>
              <div className="logo-box natural">
                <h3>natural<br/><span>MINERAL WATER</span></h3>
              </div>
              <div className="logo-box hipster">
                <h3>Hipster<br/><span>DESIGN STUDIO</span></h3>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

    </div>
  )
}
