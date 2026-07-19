import React, { useState } from 'react';

// Professional Line Icons
const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)', verticalAlign: 'middle' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)', verticalAlign: 'middle' }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)', verticalAlign: 'middle' }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gold)', verticalAlign: 'middle' }}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'royal-heritage',
    eventDate: '',
    location: '',
    guestCount: 150,
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.eventDate) newErrors.eventDate = 'Please select your celebration date';
    if (!formData.location.trim()) newErrors.location = 'Please specify the venue/location';
    if (!formData.message.trim()) newErrors.message = 'Please specify brief details of your celebration vision';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('sending');

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: 'royal-heritage', eventDate: '', location: '', guestCount: 150, message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Failed to submit enquiry:', err);
      setStatus('error');
    }
  };

  return (
    <main className="subpage-layout">

      <div className="contact-wrap-container" style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
        <div className="floral-accent floral-accent--top-left" aria-hidden="true"></div>

        <section className="contact-wrap" aria-label="Contact">
          <aside className="contact-info" aria-label="Contact information">
            <div className="contact-info-inner">
              <span className="ornament">❀</span>
              <h2>Get In Touch</h2>
              <p className="contact-info-sub">
                We'd love to hear about your dream event. Reach out and let's begin creating something unforgettable together.
              </p>
              <div className="gold-line" style={{ margin: '20px 0 32px' }}></div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PinIcon />
                </div>
                <div>
                  <h4>Our Studio</h4>
                  <p>Dalauda, Mandsaur, Madhya Pradesh</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MailIcon />
                </div>
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:eventvelvetvows@gmail.com">eventvelvetvows@gmail.com</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PhoneIcon />
                </div>
                <div>
                  <h4>Call Us</h4>
                  <a href="tel:+919302899270">+919302899270</a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon" aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <InstagramIcon />
                </div>
                <div>
                  <h4>Instagram</h4>
                  <a href="https://www.instagram.com/velvetvows.event?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer">velvetvows.event</a>
                </div>
              </div>

              <div className="contact-logo-wrap" aria-hidden="true">
                <img src="/images/logo.jpg" alt="Velvet Vows" className="contact-logo" />
              </div>
            </div>
          </aside>

          <div className="contact-form-panel">
            {status === 'success' ? (
              <div className="form-success" role="alert">
                <span className="success-icon" aria-hidden="true">❀</span>
                <h3>Request Received</h3>
                <p>Thank you for reaching out to Velvet Vows. A design advisor will review your date availability and respond within 24 hours.</p>
                <button className="form-btn" onClick={() => setStatus('idle')}>Submit Another Inquiry</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="form-header">
                  <h3>Request a Design Consultation</h3>
                  <p>Let's discuss your celebration vision. Please fill in the details below to check our calendar availability.</p>
                </div>

                {status === 'error' && (
                  <div style={{ color: '#c0392b', fontSize: '0.9rem', marginBottom: '10px' }}>
                    Something went wrong. Please check your connection and try again.
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name <span>*</span></label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={errors.name ? 'input-error' : ''}
                      placeholder="Enter your name"
                      required
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address <span>*</span></label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">Event Type / Theme</label>
                    <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                      <option value="royal-heritage">Royal Heritage Wedding</option>
                      <option value="traditional">Traditional Indian Wedding</option>
                      <option value="bollywood">Bollywood Story Wedding</option>
                      <option value="corporate-gala">Elite Corporate Gala</option>
                      <option value="social-milestone">Private Social Celebration</option>
                      <option value="other">Other / General Enquiry</option>
                    </select>
                  </div>
                </div>

                {/* New Luxury Qualification Fields */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventDate">Desired Celebration Date <span>*</span></label>
                    <input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className={errors.eventDate ? 'input-error' : ''}
                      required
                    />
                    {errors.eventDate && <span className="field-error">{errors.eventDate}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Venue & Location <span>*</span></label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleChange}
                      className={errors.location ? 'input-error' : ''}
                      placeholder="e.g. Fort Palace, Udaipur"
                      required
                    />
                    {errors.location && <span className="field-error">{errors.location}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="guestCount" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '8px' }}>
                    <span>Estimated Guest Count</span>
                    <strong style={{ color: 'var(--gold-dark)' }}>{formData.guestCount} guests</strong>
                  </label>
                  <input
                    id="guestCount"
                    name="guestCount"
                    type="range"
                    min="20"
                    max="2000"
                    step="10"
                    value={formData.guestCount}
                    onChange={handleChange}
                    style={{ width: '100%', accentColor: 'var(--gold-dark)', cursor: 'pointer' }}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Brief Vision Details <span>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    placeholder="Tell us about your celebration vision — specific design details, color themes, or special features you'd like us to create…"
                    required
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>

                <button type="submit" className="form-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <span className="btn-spinner"></span> Sending...
                    </>
                  ) : (
                    '❀ Submit Inquiry'
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
