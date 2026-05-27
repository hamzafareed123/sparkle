import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Plus, Minus, Loader2, CheckCircle2 } from 'lucide-react'
import { faqs } from '../../../data/content'
import { contactApi } from '../../../api/contact.api'
import { getErrorMessage } from '../../../api/axios'
import faqCleaners from '../../../assets/faq_cleaners.png'
import './FaqSection.css'

export function FaqSection({ hideNewsletter = false }: { hideNewsletter?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')

  const contactMutation = useMutation({
    mutationFn: contactApi.submit,
    onSuccess: () => {
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      setFormError('')
      setShowForm(false)
    },
    onError: (err) => setFormError(getErrorMessage(err)),
  })

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    if (!name || !email || !message) {
      setFormError('Please fill in name, email, and message.')
      return
    }
    contactMutation.mutate({ name, email, phone: phone || undefined, message })
  }

  return (
    <div className="container">
      <section className="faq-section-wrapper">
        <h2 className="faq-title">
          Frequently Asked Questions <span className="text-coral">?</span>
        </h2>

        <div className="faq-grid">
          <div className="faq-accordion-list">
            {faqs.map((question: string, idx: number) => {
              const isOpen = openIndex === idx
              return (
                <div key={idx} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
                  <button type="button" className="faq-accordion-header" onClick={() => toggleFaq(idx)}>
                    <span>{question}</span>
                    {isOpen ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                  </button>
                  <div className="faq-accordion-content" style={{ maxHeight: isOpen ? '200px' : '0px' }}>
                    <div className="faq-accordion-body">
                      We provide a wide range of services including residential, commercial, deep cleaning,
                      carpet and window cleaning, and eco-friendly options tailored to your needs.
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="faq-media-column">
            <img src={faqCleaners} alt="Cleaners at work" className="faq-cleaners-img" />

            <div className="faq-contact-card">
              {contactMutation.isSuccess ? (
                <div className="faq-contact-success">
                  <CheckCircle2 size={32} color="#3f704d" />
                  <h3>Message sent!</h3>
                  <p>
                    {(contactMutation.data?.emailSent ?? true)
                      ? 'We will get back to you shortly.'
                      : 'Your request was received, but notification email could not be delivered. We will still review it.'}
                  </p>
                </div>
              ) : showForm ? (
                <form onSubmit={handleContactSubmit} className="faq-contact-form">
                  <h3>Send us a message</h3>
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <textarea placeholder="Your message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} required />
                  {formError && <p className="faq-form-error">{formError}</p>}
                  <div className="faq-form-actions">
                    <button type="button" className="faq-contact-btn outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="faq-contact-btn" disabled={contactMutation.isPending}>
                      {contactMutation.isPending ? <Loader2 className="spin" size={18} /> : 'Send Message'}
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3>Do you have more questions?</h3>
                  <p>Reach out and our team will respond within 24 hours.</p>
                  <button type="button" className="faq-contact-btn" onClick={() => setShowForm(true)}>
                    Contact Us
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {!hideNewsletter && (
          <div className="newsletter-wrapper">
            <div className="newsletter-card">
              <div className="newsletter-copy">
                <h3>Ready for a cleaner space?</h3>
                <p>Book your first appointment online in minutes.</p>
              </div>
              <div className="newsletter-form">
                <a href="/book" className="newsletter-book-link">
                  Book Now
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
