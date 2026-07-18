import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  subject: 'royal-heritage',
  message: ''
};

export default function Contact() {
  const { submitEnquiry } = useAdmin();
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errs.message = 'Please write a message.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    const success = await submitEnquiry(formData);
    if (success) {
      setStatus('success');
      setFormData(emptyForm);
    } else {
      setStatus('error');
    }
  };

  return (
    <main>
      <div className="page-banner" role="banner">
        <div className="page-banner-text">
          <h1>CONTACT US</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; Contact Us
          </p>
        </div>
      </div>

      <section className="contact-wrap" aria-label="Contact">
        <aside className="contact-info" aria-label="Contact information">
          <div className="contact-info-inner">
            <span className="ornament">✦</span>
            <h2>Get In Touch</h2>
            <p className="contact-info-sub">
              We'd love to hear about your dream wedding. Reach out and let's begin creating something unforgettable together.
            </p>
            <div className="gold-line" style={{ margin: '20px 0 32px' }}></div>

            <div className="info-item">
              <div className="info-icon" aria-hidden="true">📍</div>
              <div>
                <h4>Our Studio</h4>
                <p>107, Center Point, Sapna Sangeeta Road, Indore, MP</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon" aria-hidden="true">✉️</div>
              <div>
                <h4>Email Us</h4>
                <a href="mailto:info@velvetvows.in">info@velvetvows.in</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon" aria-hidden="true">📞</div>
              <div>
                <h4>Call Us</h4>
                <a href="tel:+919203781838">+91 9203781838</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon" aria-hidden="true">📷</div>
              <div>
                <h4>Instagram</h4>
                <a href="https://www.instagram.com/velvetvows.in" target="_blank" rel="noopener noreferrer">@velvetvows.wedding</a>
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
              <span className="success-icon" aria-hidden="true">✦</span>
              <h3>Message Received!</h3>
              <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
              <button className="form-btn" onClick={() => setStatus('idle')}>Send Another Message</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
              <div className="form-header">
                <h3>Send Us a Message</h3>
                <p>Fill in the form and we'll be in touch soon</p>
              </div>

              {status === 'error' && (
                <div style={{ color: '#c0392b', fontSize: '0.9rem', marginBottom: '10px' }}>
                  ❌ Something went wrong. Please check your network and try again.
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
                  <label htmlFor="subject">Wedding Theme</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                    <option value="royal-heritage">Royal Heritage Wedding</option>
                    <option value="traditional">Traditional Indian Wedding</option>
                    <option value="bollywood">Bollywood Story Wedding</option>
                    <option value="other">Other / General Enquiry</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message <span>*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'input-error' : ''}
                  placeholder="Tell us about your dream wedding — date, location, guest count, or anything you'd like us to know…"
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
                  '✦ Submit Enquiry'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
