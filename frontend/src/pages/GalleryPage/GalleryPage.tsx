import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import './GalleryPage.css'

// Verified Unsplash cleaning & home interior images
const galleryImages = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80',
    category: 'deep-clean',
    title: 'Professional Cleaning Supplies',
    description: 'Premium eco-friendly cleaning equipment',
    height: 'medium'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=80',
    category: 'residential',
    title: 'Bathroom Restoration',
    description: 'Complete bathroom deep cleaning and restoration',
    height: 'tall'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80',
    category: 'deep-clean',
    title: 'Floor Cleaning Service',
    description: 'Professional steam cleaning service',
    height: 'short'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    category: 'residential',
    title: 'Modern Living Room',
    description: 'Immaculate living room refresh and detailing',
    height: 'tall'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    category: 'residential',
    title: 'Kitchen Deep Clean',
    description: 'Thorough kitchen cleaning and sanitization',
    height: 'medium'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1497366216548-375f7037fcf0?w=800&q=80',
    category: 'commercial',
    title: 'Office Space Sanitization',
    description: 'Professional office cleaning and disinfection',
    height: 'short'
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
    category: 'residential',
    title: 'Bedroom Refresh',
    description: 'Bedroom cleaning and linen refresh service',
    height: 'tall'
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    category: 'residential',
    title: 'Living Room Deep Clean',
    description: 'Sparkling clean living space',
    height: 'medium'
  },
  {
    id: 9,
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    category: 'residential',
    title: 'Home Interior Polish',
    description: 'Complete home cleaning and organization',
    height: 'short'
  },
  {
    id: 10,
    url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    category: 'commercial',
    title: 'Conference Room Setup',
    description: 'Corporate space cleaning and preparation',
    height: 'tall'
  },
  {
    id: 11,
    url: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80',
    category: 'commercial',
    title: 'Hotel Room Cleaning',
    description: 'Luxury hotel room cleaning and preparation',
    height: 'medium'
  },
  {
    id: 12,
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    category: 'deep-clean',
    title: 'Bathroom Deep Clean',
    description: 'Complete bathroom sanitization service',
    height: 'tall'
  },
  {
    id: 13,
    url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80',
    category: 'residential',
    title: 'Spotless Kitchen',
    description: 'Full kitchen deep clean and polish',
    height: 'short'
  },
  {
    id: 14,
    url: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=800&q=80',
    category: 'deep-clean',
    title: 'Window Cleaning',
    description: 'Professional window and glass cleaning',
    height: 'medium'
  },
  {
    id: 15,
    url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    category: 'residential',
    title: 'Dining Room Excellence',
    description: 'Formal dining room cleaning and polishing',
    height: 'tall'
  }
]


const categories = [
  { id: 'all', label: 'All', value: 'all' },
  { id: 'residential', label: 'Residential', value: 'residential' },
  { id: 'commercial', label: 'Commercial', value: 'commercial' },
  { id: 'deep-clean', label: 'Deep Clean', value: 'deep-clean' }
]

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const filteredImages = galleryImages.filter(image => 
    selectedCategory === 'all' || image.category === selectedCategory
  )

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const handleImageLoad = (imageId: number) => {
    setLoadedImages(prev => new Set(prev).add(imageId))
  }

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-hero container">
        <div className="gallery-hero-content">
          <motion.h1 
            className="gallery-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span>Work Gallery</span>
          </motion.h1>
          <motion.p 
            className="gallery-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transforming spaces with professional cleaning excellence
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section container">
        <motion.div 
          className="filter-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.value ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Pinterest-Style Gallery Grid */}
      <section className="gallery-grid-section container">
        <motion.div 
          className="pinterest-gallery"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="pinterest-item"
                layout
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -50 }}
                transition={{ 
                  duration: 0.6,
                  delay: index * 0.08,
                  layout: { duration: 0.4, type: "spring" }
                }}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                onClick={() => handleImageClick(image)}
                onMouseEnter={() => setHoveredImage(image.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="pinterest-image-container">
                  <motion.img 
                    src={image.url} 
                    alt={image.title}
                    className="pinterest-image"
                    loading="lazy"
                    onLoad={() => handleImageLoad(image.id)}
                    initial={{ scale: 1.05 }}
                    animate={{ 
                      scale: hoveredImage === image.id ? 1.1 : 1,
                      transition: { duration: 0.6, type: "spring", stiffness: 200 }
                    }}
                  />
                  <motion.div 
                    className="pinterest-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredImage === image.id ? 1 : 0,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className="pinterest-content"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: hoveredImage === image.id ? 0 : 20,
                        opacity: hoveredImage === image.id ? 1 : 0,
                        transition: { duration: 0.3, delay: 0.1 }
                      }}
                    >
                      <h3 className="pinterest-title">{image.title}</h3>
                      <p className="pinterest-description">{image.description}</p>
                      <motion.div 
                        className="pinterest-icon"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ZoomIn size={16} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  <motion.div 
                    className="image-loading-placeholder"
                    initial={{ opacity: 1 }}
                    animate={{ 
                      opacity: loadedImages.has(image.id) ? 0 : 1,
                      transition: { duration: 0.3 }
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Cinematic Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="cinematic-lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={closeLightbox}
          >
            <motion.div
              className="cinematic-lightbox-content"
              initial={{ scale: 0.7, opacity: 0, rotate: 2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: -2 }}
              transition={{ 
                duration: 0.5, 
                type: "spring", 
                stiffness: 200, 
                damping: 25 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="cinematic-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close lightbox"
                initial={{ rotate: 0, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{ duration: 0.3, type: "spring" }}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
              <div className="cinematic-lightbox-image-container">
                <motion.img 
                  src={selectedImage.url} 
                  alt={selectedImage.title}
                  className="cinematic-lightbox-image"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.div 
                  className="lightbox-image-glow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
              <motion.div 
                className="cinematic-lightbox-info"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3 className="cinematic-lightbox-title">{selectedImage.title}</h3>
                <p className="cinematic-lightbox-description">{selectedImage.description}</p>
                <motion.div 
                  className="lightbox-category-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {selectedImage.category.replace('-', ' ').toUpperCase()}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
