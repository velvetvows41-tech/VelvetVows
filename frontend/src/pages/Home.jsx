import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

// Default Fallbacks
const defaultHeroImages = [
  { id: 'h1', src: '/images/hero1.jpg', label: 'Together Forever' },
  { id: 'h2', src: '/images/hero2.jpg', label: 'Sacred Ceremonies' },
  { id: 'h3', src: '/images/hero3.jpg', label: 'Bollywood Magic' },
  { id: 'h4', src: '/images/hero4.jpg', label: 'Royal Reception' }
];

const defaultGalleryImages = [
  { id: 'g1', src: '/images/gallery1.jpg', label: 'Golden Evening' },
  { id: 'g2', src: '/images/gallery2.jpg', label: 'Under the Chandelier' },
  { id: 'g3', src: '/images/gallery3.jpg', label: 'The Bride' },
  { id: 'g4', src: '/images/gallery4.jpg', label: 'Flower Wall' }
];

const defaultServices = [
  {
    id: 1,
    badge: "BESPOKE PLANNING",
    title: "Wedding Planning",
    subtitle: "End-to-End Conceptualization",
    description: "From layout designing and budget tracking to vendor agreements, we shape your dream celebration from the ground up with absolute detail and care.",
    image: "/images/hero1.jpg"
  },
  {
    id: 2,
    badge: "ELITE CELEBRATIONS",
    title: "Social & Corporate Events",
    subtitle: "Unforgettable Milestones",
    description: "Bespoke styling and execution for high-profile social galas, birthdays, anniversaries, and corporate events with luxury hospitality and soundscapes.",
    image: "/images/bollywood.jpg"
  },
  {
    id: 3,
    badge: "ROYAL HOSPITALITY",
    title: "Hospitality Desk Management",
    subtitle: "Warm & Seamless Welcomes",
    description: "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, room itinerary bags, and personal host supports at the hotel.",
    image: "/images/gallery2.jpg"
  },
  {
    id: 4,
    badge: "PERSONALIZED ASSISTANCE",
    title: "Guest Coordination",
    subtitle: "RSVP & Comfort Curation",
    description: "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
    image: "/images/gallery3.jpg"
  },
  {
    id: 5,
    badge: "LUXURY DESIGN",
    title: "Venue & Decor Management",
    subtitle: "Scenic Scenery & Lighting",
    description: "Scouting heritage palaces and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
    image: "/images/ancient.jpg"
  },
  {
    id: 6,
    badge: "LOGISTICS & TRAVEL",
    title: "Guest Transportation Support",
    subtitle: "Airport Pickups & Luxury Fleet",
    description: "Seamless airport and railway pickups with premium vehicle routing, chauffeured arrivals, and shuttle operations for guests.",
    image: "/images/traditional.jpg"
  }
];

const defaultTestimonials = [
  {
    id: 1,
    text: "Some testimonials",
    couple: "Name"
  },
  {
    id: 2,
    text: "Some more testimonials",
    couple: "Names"
  }
];

// Helper to extract YouTube ID
const getYoutubeId = (url) => {
  if (!url) return null;
  const c = url.trim();
  const u = c.match(/youtube\.com\/embed\/([A-Za-z0-9_-]{11})/);
  if (u) return u[1];
  const f = c.match(/[?&]v=([A-Za-z0-9_-]{11})/);
  if (f) return f[1];
  const p = c.match(/youtu\.be\/([A-Za-z0-9_-]{11})/);
  if (p) return p[1];
  const v = c.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
  if (v) return v[1];
  const w = c.match(/\/live\/([A-Za-z0-9_-]{11})/);
  return w ? w[1] : /^[A-Za-z0-9_-]{11}$/.test(c) ? c : null;
};

export default function Home() {
  const { heroImages, galleryImages, youtubeUrl } = useAdmin();

  // State for Hero Slider
  const [currentHero, setCurrentHero] = useState(0);
  const activeHeroImages = heroImages.length > 0 ? heroImages : defaultHeroImages;

  const nextHero = useCallback(() => {
    setCurrentHero(prev => (prev + 1) % activeHeroImages.length);
  }, [activeHeroImages.length]);

  const prevHero = useCallback(() => {
    setCurrentHero(prev => (prev - 1 + activeHeroImages.length) % activeHeroImages.length);
  }, [activeHeroImages.length]);

  // Auto-scroll Hero Slider
  useEffect(() => {
    const timer = setInterval(nextHero, 6000);
    return () => clearInterval(timer);
  }, [nextHero]);

  // State for Testimonials Slider
  const [currentTesti, setCurrentTesti] = useState(0);
  const activeTestimonials = defaultTestimonials;

  const nextTesti = useCallback(() => {
    setCurrentTesti(prev => (prev + 1) % activeTestimonials.length);
  }, [activeTestimonials.length]);

  useEffect(() => {
    const timer = setInterval(nextTesti, 5000);
    return () => clearInterval(timer);
  }, [nextTesti]);

  // State for Gallery Lightbox
  const [lightboxImg, setLightboxImg] = useState(null);
  const activeGalleryImages = galleryImages.length > 0 ? galleryImages : defaultGalleryImages;
  const marqueeImages = [...activeGalleryImages, ...activeGalleryImages]; // duplicate for marquee loop

  // YouTube Embed Url
  const youtubeId = getYoutubeId(youtubeUrl);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1` : null;

  return (
    <main>
      {/* 1. Hero Slider Section */}
      <section className="hero" aria-label="Welcome slideshow">
        <div 
          className="hero-slider" 
          style={{ transform: `translateX(-${currentHero * 100}%)` }}
        >
          {activeHeroImages.map((img, idx) => (
            <div 
              key={img.id || idx} 
              className="hero-slide" 
              style={{ backgroundImage: `url(${img.src})` }}
              aria-label={img.label}
            ></div>
          ))}
        </div>

        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">✦ WELCOME TO ✦</p>
          <h1>VELVET VOWS</h1>
          <p className="hero-sub">Where Every Love Story Becomes Legend</p>
          <Link to="/about" className="hero-cta">Discover Our Story</Link>
        </div>

        <button 
          className="hero-arrow hero-arrow--prev" 
          onClick={prevHero} 
          aria-label="Previous slide"
        >
          ⟨
        </button>
        <button 
          className="hero-arrow hero-arrow--next" 
          onClick={nextHero} 
          aria-label="Next slide"
        >
          ⟩
        </button>

        <div className="hero-dots">
          {activeHeroImages.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot ${idx === currentHero ? 'hero-dot--active' : ''}`}
              onClick={() => setCurrentHero(idx)}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* 2. Tagline Strip */}
      <section className="tagline-strip">
        <h2>Ready to Begin Your Wedding Journey?</h2>
        <p>Let's craft a celebration as unique and beautiful as your love story.</p>
        <Link to="/contact" className="tagline-link">Plan My Wedding</Link>
      </section>

      {/* 3. About Section wrap */}
      <section className="about-section-wrap" aria-label="About Us summary">
        <div className="about-card">
          <div className="about-header">
            <span className="ornament">✦</span>
            <h2>Where Luxury Meets Tradition</h2>
            <p className="about-tagline">
              We design, plan and curate luxury experiences that blend the grandeur of legacy rituals with the smooth execution of modern timelines.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-box">
              <span className="stat-num">8+</span>
              <span className="stat-label">Years of Grace</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">150+</span>
              <span className="stat-label">Weddings Crafted</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">99%</span>
              <span className="stat-label">Happy Couples</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">12+</span>
              <span className="stat-label">Cities Served</span>
            </div>
          </div>

          <div className="about-content-grid">
            <div className="about-block">
              <h3><span className="block-icon">✨</span> Our Philosophy</h3>
              <p>
                A wedding is not just an event; it's a sacred narrative. We ensure your narrative is narrated with the highest degree of grandeur, precision, and heartfelt emotion, allowing you and your family to live every moment completely hassle-free.
              </p>
            </div>
            <div className="about-block">
              <h3><span className="block-icon">👑</span> Premium Offerings</h3>
              <p>
                From bespoke destination scouting, luxury floral layouts, sangeet stage management, and celebrity coordination, to custom traditional rituals, we curate every aspect with our dedicated team of hospitality professionals.
              </p>
            </div>
          </div>

          <div className="about-cta">
            <h3>Ready to Create Lifelong Memories?</h3>
            <p>Our advisors are ready to help guide your celebration planning.</p>
            <Link to="/contact" className="cta-btn">Consult with an Advisor</Link>
          </div>
        </div>
      </section>

      {/* 4. Services Grid section */}
      <section className="services-intro" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="ornament">✦</span>
        <h2>OUR SIGNATURE CELEBRATIONS</h2>
        <p>Bespoke themes custom tailored to reflect your identity and culture</p>
        <div className="gold-line"></div>
      </section>

      <section className="services-grid-wrap">
        <div className="services-grid">
          {defaultServices.map((svc) => (
            <div key={svc.id} className="svc-card">
              <div className="svc-card-img">
                <img src={svc.image} alt={svc.title} />
                <div className="svc-card-overlay">
                  <span className="svc-overlay-badge">{svc.badge}</span>
                </div>
              </div>
              <div className="svc-card-body">
                <h3>{svc.title}</h3>
                <span className="svc-subtitle">{svc.badge}</span>
                <div className="svc-divider"></div>
                <p className="svc-desc">{svc.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Process flowchart section */}
      <section className="process-section" aria-label="Our process">
        <span className="ornament">✦</span>
        <h2>THE VELVET PROCESS</h2>
        <p>How we bring your dream wedding to life step-by-step</p>
        <div className="gold-line"></div>

        <div className="process-grid">
          <div className="process-step">
            <div className="step-num">01</div>
            <h4>Consultation</h4>
            <p>Aligning on your vision, themes, and guest experiences.</p>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <h4>Design & Curation</h4>
            <p>Creating customized decorators mood boards and stage mockups.</p>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <h4>Coordination</h4>
            <p>Managing vendors, bookings, travel and many more.</p>
          </div>
          <div className="process-step">
            <div className="step-num">04</div>
            <h4>Celebration</h4>
            <p>Our on-site directors execute everything flawlessly on-stage.</p>
          </div>
        </div>
      </section>

      {/* 6. Video Section */}
      <section className="video-section" aria-label="Wedding highlights video">
        <div className="section-title">
          <span className="ornament">✦</span>
          <h2>HIGHLIGHTS GALLERY</h2>
          <p>Catch a glimpse of the cinematic magic we capture</p>
          <div className="gold-line"></div>
        </div>
        {embedUrl ? (
          <div className="video-wrap">
            <iframe 
              src={embedUrl}
              title="Wedding Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="video-placeholder">
            <span>🎬</span>
            <p>No video added yet — paste a YouTube URL in the Admin Panel.</p>
          </div>
        )}
      </section>

      {/* 7. Wedding Moments Gallery Marquee */}
      <section className="gallery-section" aria-label="Photo gallery marquee">
        <div className="section-title">
          <span className="ornament">✦</span>
          <h2>A Few MOMENTS</h2>
          <p>A curated collection of love, joy, and timeless memories</p>
          <div className="gold-line"></div>
        </div>

        <div className="gallery-outer">
          <div 
            className="gallery-track"
            style={{ animationDuration: `${Math.max(28, activeGalleryImages.length * 4)}s` }}
          >
            {marqueeImages.map((img, w) => (
              <div 
                key={`${img.id}-${w}`} 
                className="g-card"
                onClick={() => setLightboxImg(img)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.label}`}
                onKeyDown={(k) => k.key === 'Enter' && setLightboxImg(img)}
              >
                <img src={img.src} alt={img.label} loading="lazy" />
                <div className="g-card-ov">
                  <span>{img.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {lightboxImg && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightboxImg.label} onClick={() => setLightboxImg(null)}>
            <button className="lb-close" onClick={() => setLightboxImg(null)}>&times;</button>
            <img src={lightboxImg.src} alt={lightboxImg.label} onClick={e => e.stopPropagation()} />
          </div>
        )}
      </section>

      {/* 8. Testimonials carousel */}
      <section className="testimonials-section" aria-label="Client Testimonials">
        <div className="section-title">
          <span className="ornament">✦</span>
          <h2>TESTIMONIALS</h2>
          <p>Words shared by the clients we've been honoured to serve</p>
          <div className="gold-line"></div>
        </div>

        <div className="testi-slider" role="region" aria-live="polite" aria-label="Testimonial carousel">
          {activeTestimonials.map((testi, idx) => (
            <div 
              key={testi.id} 
              className={`testi-slide ${idx === currentTesti ? 'testi-slide--active' : ''}`}
              aria-hidden={idx !== currentTesti}
            >
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>
                <p className="testi-text">{testi.text}</p>
                <footer className="testi-couple">— {testi.couple}</footer>
              </blockquote>
            </div>
          ))}
        </div>

        <div className="testi-dots" role="tablist" aria-label="Testimonial navigation">
          {activeTestimonials.map((_, idx) => (
            <button
              key={idx}
              role="tab"
              aria-selected={idx === currentTesti}
              className={`testi-dot ${idx === currentTesti ? 'testi-dot--active' : ''}`}
              onClick={() => setCurrentTesti(idx)}
              aria-label={`Testimonial ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>
    </main>
  );
}
