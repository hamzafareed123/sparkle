import { useQuery } from '@tanstack/react-query'
import { Star, Loader2 } from 'lucide-react'
import { testimonialsApi } from '../../../api/testimonials.api'
import leaf from '../../../assets/leaf.png'
import './TestimonialsSection.css'

export function TestimonialsSection() {
  const { data: testimonials = [], isLoading, isError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: testimonialsApi.getApproved,
  })

  return (
    <section className="container section testimonials-section">
      <div className="testimonials-card">
        <h2 className="testimonials-title">
          What Our Happy Clients Says
          <img src={leaf} alt="" className="title-leaf" />
        </h2>

        {isLoading ? (
          <div className="testimonials-loading">
            <Loader2 className="spin" size={32} color="#3f704d" />
          </div>
        ) : isError || testimonials.length === 0 ? (
          <p className="testimonials-empty">Be the first to share your experience with us!</p>
        ) : (
          <div className="testimonials-grid">
            {testimonials.map((client) => (
              <div key={client._id} className="testimonial-item">
                <div className="testimonial-avatar">
                  <div className="avatar-img-wrap avatar-initial">
                    {client.name[0]?.toUpperCase()}
                  </div>
                  <div className="avatar-stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < client.rating ? '#fcd34d' : 'transparent'}
                        stroke={i < client.rating ? '#fcd34d' : '#d1d5db'}
                      />
                    ))}
                  </div>
                </div>
                <div className="testimonial-bubble">
                  <div className="bubble-arrow" />
                  <h4>{client.name}</h4>
                  <p>&ldquo;{client.comment}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
