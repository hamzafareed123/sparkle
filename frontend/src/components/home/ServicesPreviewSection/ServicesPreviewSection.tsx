import { Link } from 'react-router-dom'
import type { Service } from '../../../types'
import { getMediaUrl } from '../../../utils/media'
import './ServicesPreviewSection.css'

type ServicesPreviewSectionProps = {
  services: Service[]
  isLoading?: boolean
}

const viewServices = () => {
  scrollTo(0, 0)
}

export function ServicesPreviewSection({ services, isLoading }: ServicesPreviewSectionProps) {
  return (
    <section className="container section services-preview">
      <h2 className="services-title">Our Services</h2>
      <p className="services-subtitle">Here&apos;s What we can Do for you...</p>

      {isLoading ? (
        <div className="service-grid">
          {[1, 2, 3].map((n) => (
            <article key={n} className="service-card service-card-skeleton" aria-hidden />
          ))}
        </div>
      ) : services.length === 0 ? (
        <p className="services-empty">Services coming soon. Check back shortly!</p>
      ) : (
        <div className="service-grid">
          {services.map((item) => {
            const img = getMediaUrl(item.image)
            return (
              <article key={item._id} className="service-card">
                {img ? (
                  <img src={img} alt={item.name} />
                ) : (
                  <div className="service-card-placeholder" />
                )}
                <div className="service-card-body">
                  <h3>{item.name}</h3>
                  <p className="service-card-price">${item.price.toFixed(2)}</p>
                  <Link to="/book" state={{ service: item.name }} className="service-card-link">
                    <span aria-hidden="true">+</span>
                    Book Now
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      )}

      <Link className="services-view-all" to="/services" onClick={viewServices}>
        View Our Services
      </Link>
    </section>
  )
}
