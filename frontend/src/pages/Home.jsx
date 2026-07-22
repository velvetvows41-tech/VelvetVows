import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import AnimatedNumber from '../components/AnimatedNumber';
import FloatingPetals from '../components/FloatingPetals';

// Professional Line Icons
const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold)' }}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
  </svg>
);

const CrownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold)' }}>
    <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    <path d="M5 20h14" />
  </svg>
);

const VideoIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginBottom: '8px' }}>
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

// Default Fallbacks
const defaultHeroImages = [];
const defaultGalleryImages = [];

const defaultServices = [
  {
    id: 1,
    badge: "BESPOKE PLANNING",
    title: "Wedding Planning",
    subtitle: "End-to-End Conceptualization",
    description: "From layout designing and budget tracking to vendor agreements, we shape your dream celebration from the ground up with absolute detail and care.",
    image: ""
  },
  {
    id: 2,
    badge: "ELITE CELEBRATIONS",
    title: "Social & Corporate Events",
    subtitle: "Unforgettable Milestones",
    description: "Bespoke styling and execution for high-profile social galas, birthdays, anniversaries, and corporate events with luxury hospitality and soundscapes.",
    image: ""
  },
  {
    id: 3,
    badge: "ROYAL HOSPITALITY",
    title: "Hospitality Desk Management",
    subtitle: "Warm & Seamless Welcomes",
    description: "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, room itinerary bags, and personal host supports at the hotel.",
    image: ""
  },
  {
    id: 4,
    badge: "PERSONALIZED ASSISTANCE",
    title: "Guest Coordination",
    subtitle: "RSVP & Comfort Curation",
    description: "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
    image: ""
  },
  {
    id: 5,
    badge: "LUXURY DESIGN",
    title: "Venue & Decor Management",
    subtitle: "Scenic Scenery & Lighting",
    description: "Scouting heritage palaces and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
    image: ""
  },
  {
    id: 6,
    badge: "LOGISTICS & TRAVEL",
    title: "Guest Transportation Support",
    subtitle: "Airport Pickups & Luxury Fleet",
    description: "Seamless airport and railway pickups with premium vehicle routing, chauffeured arrivals, and shuttle operations for guests.",
    image: ""
  }
];

const defaultTestimonials = [
  {
    _id: 'default-t-1',
    text: "Velvet Vows took care of everything from hotel check-in desks to stage timelines. We were guests at our own wedding!",
    couple: "Aditi & Kabir"
  },
  {
    _id: 'default-t-2',
    text: "The heritage mandap decor looked like a royal dream. Highly recommend their bespoke planning services!",
    couple: "Rohan & Riya"
  }
];

const defaultPortfolios = [
  {
    _id: 'default-p-1',
    title: 'Traditional Malva Heritage Decor',
    category: 'Theme Curation',
    description: 'A tribute to local heritage. We utilize raw brass vessels, native marigolds, handmade terracotta details, and block-print textiles to frame your ancestral legacy with absolute class and sophistication.',
    src: '/images/malva_heritage_decor.jpg',
    ctaText: 'Consult on Heritage Design',
    ctaLink: '/contact'
  },
  {
    _id: 'default-p-2',
    title: 'Immersive Walkways & Arrival Experiences',
    category: 'Scenography',
    description: 'Creating a sense of wonder from the very first step. Our walkway installations feature custom architectural arches, fog and mist coordination, soft lighting arrays, and lush floral tunnels to guide your guests.',
    src: '/images/immersive_way.jpg',
    ctaText: 'Request Arrival Scenography',
    ctaLink: '/contact'
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

function HomeServiceCard({ svc }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="svc-card">
      <div className={`svc-card-img ${loaded || !svc.image ? 'loaded' : 'loading'}`}>
        {!loaded && svc.image && (
          <div className="svc-card-shimmer"></div>
        )}
        {svc.image ? (
          <img 
            src={svc.image} 
            alt={svc.title} 
            loading="lazy" 
            decoding="async"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease-out' }}
          />
        ) : (
          <div className="svc-card-placeholder-bg" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2a080c, #160003)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)' }}>
            <span style={{ fontSize: '2.5rem' }}>✨</span>
          </div>
        )}
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
  );
}

export default function Home() {
  const { heroImages, galleryImages, serviceImages, youtubeUrl, stats, brandText, portfolios, testimonials } = useAdmin();

  const findDefaultMeta = (label) => {
    if (!label) return null;
    const cleanLabel = label.toLowerCase().trim();
    let match = defaultServices.find(s => 
      s.title.toLowerCase() === cleanLabel || 
      s.title.toLowerCase().includes(cleanLabel) || 
      cleanLabel.includes(s.title.toLowerCase())
    );
    if (match) return match;
    return defaultServices.find(s => 
      s.badge.toLowerCase().includes(cleanLabel) || 
      s.subtitle.toLowerCase().includes(cleanLabel)
    );
  };

  const displayServices = serviceImages.length > 0
    ? serviceImages.map((img, index) => {
        const defaultMeta = findDefaultMeta(img.label) || defaultServices[index] || {
          badge: "EXCLUSIVE SERVICE",
          title: img.label || `Custom Service ${index + 1}`,
          subtitle: "Bespoke Curation",
          description: "Custom curated services designed and executed by our expert hospitality professionals."
        };
        return {
          id: img.id || index,
          badge: defaultMeta.badge,
          title: img.label || defaultMeta.title,
          subtitle: defaultMeta.subtitle || defaultMeta.badge,
          description: img.description || defaultMeta.description,
          image: img.src
        };
      })
    : defaultServices;

  // State for Hero Slider
  const [currentHero, setCurrentHero] = useState(0);
  const activeHeroImages = heroImages.length > 0 ? heroImages : defaultHeroImages;

  const nextHero = useCallback(() => {
    if (activeHeroImages.length > 0) {
      setCurrentHero(prev => (prev + 1) % activeHeroImages.length);
    }
  }, [activeHeroImages.length]);

  const prevHero = useCallback(() => {
    if (activeHeroImages.length > 0) {
      setCurrentHero(prev => (prev - 1 + activeHeroImages.length) % activeHeroImages.length);
    }
  }, [activeHeroImages.length]);

  // Auto-scroll Hero Slider
  useEffect(() => {
    if (activeHeroImages.length === 0) return;
    const timer = setInterval(nextHero, 6000);
    return () => clearInterval(timer);
  }, [nextHero, activeHeroImages.length]);

  // State for Testimonials Slider
  const [currentTesti, setCurrentTesti] = useState(0);
  const activeTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const nextTesti = useCallback(() => {
    setCurrentTesti(prev => (prev + 1) % activeTestimonials.length);
  }, [activeTestimonials.length]);

  useEffect(() => {
    const timer = setInterval(nextTesti, 5000);
    return () => clearInterval(timer);
  }, [nextTesti]);

  // State for Gallery Lightbox
  const [lightboxImg, setLightboxImg] = useState(null);

  // Handle Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxImg(null);
      }
    };
    if (lightboxImg) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxImg]);
  const activeGalleryImages = galleryImages.length > 0 ? galleryImages : defaultGalleryImages;
  
  // Group gallery images into chunks of 3 for the curved hanging wire carousel
  const wireChunks = [];
  if (activeGalleryImages.length > 0) {
    for (let i = 0; i < activeGalleryImages.length; i += 3) {
      const chunk = activeGalleryImages.slice(i, i + 3);
      // Pad out the last group to 3 cards using wraparound items if necessary
      while (chunk.length < 3) {
        chunk.push(activeGalleryImages[chunk.length % activeGalleryImages.length]);
      }
      wireChunks.push(chunk);
    }
  }
  // Duplicate chunks 3 times to ensure a seamless infinite loop scrolling marquee width
  const marqueeChunks = [...wireChunks, ...wireChunks, ...wireChunks];

  // YouTube Embed Url
  const youtubeId = getYoutubeId(youtubeUrl);
  const embedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1` : null;

  return (
    <main>
      {/* 1. Hero Slider Section */}
      <section className="hero" aria-label="Welcome slideshow">
        <FloatingPetals />
        <div className="hero-slider-fade">
          {activeHeroImages.length > 0 ? (
            activeHeroImages.map((img, idx) => (
              <div 
                key={img.id || idx} 
                className={`hero-slide-fade ${idx === currentHero ? 'hero-slide-fade--active' : ''}`}
                aria-label={img.label}
              >
                <img 
                  src={img.src} 
                  alt={img.label || 'Velvet Vows Event'} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  fetchPriority={idx === 0 ? "high" : "low"}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              </div>
            ))
          ) : (
            <div 
              className="hero-slide-fade hero-slide-fade--active" 
              style={{ background: 'linear-gradient(135deg, #160003, #2a080c)' }}
            ></div>
          )}
        </div>

        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">{brandText.heroEyebrow || '❀ WELCOME TO ❀'}</p>
          <h1>{brandText.heroTitle || 'VELVET VOWS'}</h1>
          <p className="hero-sub">{brandText.heroSubtitle || 'Your Dream Event planned with Love and Perfection'}</p>
          <Link to="/about" className="hero-cta">Discover Our Story</Link>
        </div>

        {activeHeroImages.length > 1 && (
          <>
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
          </>
        )}
      </section>

      {/* 2. Tagline Strip */}
      <section className="tagline-strip">
        <h2>{brandText.taglineTitle || 'Ready to Begin Your Event Journey?'}</h2>
        <p>{brandText.taglineSubtitle || "Let's craft a celebration as unique and beautiful as your story."}</p>
        <Link to="/contact" className="tagline-link">Plan My Event</Link>
      </section>

      {/* 3. About Section wrap */}
      <section className="about-section-wrap" aria-label="About Us summary">
        <div className="about-card-wrapper" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto', top: '-30px' }}>
          <div className="floral-accent floral-accent--top-right" aria-hidden="true"></div>
          <div className="floral-accent floral-accent--bottom-left" aria-hidden="true"></div>
          <div className="about-card" style={{ top: '0' }}>
            <div className="about-header">
              <span className="ornament">❀</span>
              <h2>{brandText.homeAboutTitle || 'Where Luxury Meets Tradition'}</h2>
              <p className="about-tagline">
                {brandText.homeAboutTagline || 'We design, plan and curate luxury experiences that blend the grandeur of legacy rituals with the smooth execution of modern timelines.'}
              </p>
            </div>

            <div className="about-stats">
              <div className="stat-box">
                <span className="stat-num"><AnimatedNumber value={stats.yearsOfGrace || "2+"} /></span>
                <span className="stat-label">Years of Grace</span>
              </div>
              <div className="stat-box">
                <span className="stat-num"><AnimatedNumber value={stats.eventsCrafted || "150+"} /></span>
                <span className="stat-label">Events Crafted</span>
              </div>
              <div className="stat-box">
                <span className="stat-num"><AnimatedNumber value={stats.happyClients || "99%"} /></span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-box">
                <span className="stat-num"><AnimatedNumber value={stats.citiesServed || "12+"} /></span>
                <span className="stat-label">Cities Served</span>
              </div>
            </div>

            <div className="about-content-grid">
              <div className="about-block">
                <h3 style={{ display: 'flex', alignItems: 'center' }}><SparklesIcon /> {brandText.homePhilosophyTitle || 'Our Philosophy'}</h3>
                <p>
                  {brandText.homePhilosophyDesc || 'Every grand milestone celebration is a sacred narrative. Whether it is an elite corporate gala, a high-profile social anniversary, or a royal wedding, we ensure your story is told with the highest degree of grandeur, precision, and heartfelt emotion, allowing you to live every moment completely hassle-free.'}
                </p>
              </div>
              <div className="about-block">
                <h3 style={{ display: 'flex', alignItems: 'center' }}><CrownIcon /> {brandText.homeOfferingsTitle || 'Premium Offerings'}</h3>
                <p>
                  {brandText.homeOfferingsDesc || 'From bespoke destination scouting, luxury floral layouts, sangeet stage management, and celebrity coordination, to custom traditional rituals, we curate every aspect with our dedicated team of hospitality professionals.'}
                </p>
              </div>
            </div>

            <div className="about-cta">
              <h3>Ready to Create Lifelong Memories?</h3>
              <p>Our advisors are ready to help guide your celebration planning.</p>
              <Link to="/contact" className="cta-btn">Consult with an Advisor</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Portfolios Section */}
      <section className="portfolio-showcase-section" aria-label="Curated Portfolios">
        <div className="section-title">
          <span className="ornament">❀</span>
          <h2>CURATED PORTFOLIOS</h2>
          <p>A look into our signature heritage themes and arrival designs</p>
          <div className="gold-line"></div>
        </div>

        <div className="showcase-grid" style={{ display: 'flex', flexDirection: 'column', gap: '80px', maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px' }}>
          {activePortfolios.map((portfolio, idx) => {
            const isReverse = idx % 2 === 1;
            const content = (
              <>
                <div className="showcase-media-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 30px rgba(74, 18, 26, 0.08)' }}>
                  <img 
                    src={portfolio.src} 
                    alt={portfolio.title} 
                    className="zoom-hover-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      if (portfolio.src.includes('immersive_way')) {
                        e.target.src = '/images/immersive_walkway.jpg';
                      }
                    }}
                  />
                </div>
                <div className="showcase-info" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <span style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>{portfolio.category}</span>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: 'var(--brown)', margin: '0' }}>{portfolio.title}</h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--text)', lineHeight: '1.7', margin: '0' }}>
                    {portfolio.description}
                  </p>
                  <Link to={portfolio.ctaLink || '/contact'} className="tagline-link" style={{ alignSelf: 'flex-start', margin: '10px 0 0', padding: '10px 24px' }}>
                    {portfolio.ctaText || 'Consult on Design'}
                  </Link>
                </div>
              </>
            );

            return (
              <div 
                key={portfolio._id || portfolio.id || idx} 
                className={`showcase-item ${isReverse ? 'showcase-item--reverse' : ''}`}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}
              >
                {isReverse ? (
                  <>
                    <div className="showcase-info" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'Cinzel, serif', fontWeight: 'bold' }}>{portfolio.category}</span>
                      <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', color: 'var(--brown)', margin: '0' }}>{portfolio.title}</h3>
                      <p style={{ fontSize: '0.94rem', color: 'var(--text)', lineHeight: '1.7', margin: '0' }}>
                        {portfolio.description}
                      </p>
                      <Link to={portfolio.ctaLink || '/contact'} className="tagline-link" style={{ alignSelf: 'flex-start', margin: '10px 0 0', padding: '10px 24px' }}>
                        {portfolio.ctaText || 'Consult on Design'}
                      </Link>
                    </div>
                    <div className="showcase-media-container" style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 30px rgba(74, 18, 26, 0.08)' }}>
                      <img 
                        src={portfolio.src} 
                        alt={portfolio.title} 
                        className="zoom-hover-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          if (portfolio.src.includes('immersive_way')) {
                            e.target.src = '/images/immersive_walkway.jpg';
                          }
                        }}
                      />
                    </div>
                  </>
                ) : content}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Wedding Moments Hanging Wire Infinite Carousel */}
      <section className="gallery-section" aria-label="Photo gallery wire carousel">
        <div className="section-title">
          <span className="ornament">❀</span>
          <h2>A Few MOMENTS</h2>
          <p>A curated collection of love, joy, and timeless memories. Hover to focus or click to expand!</p>
          <div className="gold-line"></div>
        </div>

        {activeGalleryImages.length > 0 ? (
          <div className="wire-carousel-outer">
            <div 
              className="wire-carousel-track"
              style={{ animationDuration: `${Math.max(30, wireChunks.length * 9)}s` }}
            >
              {marqueeChunks.map((chunk, segmentIdx) => (
                <div key={`wire-seg-${segmentIdx}`} className="wire-segment">
                  {/* Sagging gold cable SVG background */}
                  <svg className="wire-svg" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id={`gold-wire-${segmentIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#805b10" />
                        <stop offset="30%" stopColor="#d4af37" />
                        <stop offset="50%" stopColor="#f3e5ab" />
                        <stop offset="70%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#805b10" />
                      </linearGradient>
                    </defs>
                    {/* 1. Wire Shadow Path */}
                    <path d="M 0 33 Q 500 133 1000 33" fill="none" stroke="rgba(74, 18, 26, 0.12)" strokeWidth="4.5" />
                    {/* 2. Main Cable Core */}
                    <path d="M 0 30 Q 500 130 1000 30" fill="none" stroke={`url(#gold-wire-${segmentIdx})`} strokeWidth="3" />
                    {/* 3. Coiled rope specular highlight overlay */}
                    <path d="M 0 30 Q 500 130 1000 30" fill="none" stroke="#fff9e6" strokeWidth="1.2" strokeDasharray="3,6" />
                    {/* 4. Gold Peg Mounts at the anchor posts */}
                    <circle cx="0" cy="30" r="7" fill="#805b10" stroke="#f3e5ab" strokeWidth="1.5" />
                    <circle cx="1000" cy="30" r="7" fill="#805b10" stroke="#f3e5ab" strokeWidth="1.5" />
                  </svg>

                  {/* Card 1: Left */}
                  <div 
                    className="wire-card wire-card--1" 
                    onClick={() => setLightboxImg(chunk[0])}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${chunk[0].label || 'Moment'}`}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImg(chunk[0])}
                  >
                    <div className="wire-string"></div>
                    <img src={chunk[0].src} alt={chunk[0].label || 'Moment'} loading="lazy" decoding="async" />
                    <div className="wire-label">
                      <span>{chunk[0].label || 'Velvet Moment'}</span>
                    </div>
                  </div>

                  {/* Card 2: Center (Sagging lowest) */}
                  <div 
                    className="wire-card wire-card--2" 
                    onClick={() => setLightboxImg(chunk[1])}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${chunk[1].label || 'Moment'}`}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImg(chunk[1])}
                  >
                    <div className="wire-string"></div>
                    <img src={chunk[1].src} alt={chunk[1].label || 'Moment'} loading="lazy" decoding="async" />
                    <div className="wire-label">
                      <span>{chunk[1].label || 'Velvet Moment'}</span>
                    </div>
                  </div>

                  {/* Card 3: Right */}
                  <div 
                    className="wire-card wire-card--3" 
                    onClick={() => setLightboxImg(chunk[2])}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${chunk[2].label || 'Moment'}`}
                    onKeyDown={(e) => e.key === 'Enter' && setLightboxImg(chunk[2])}
                  >
                    <div className="wire-string"></div>
                    <img src={chunk[2].src} alt={chunk[2].label || 'Moment'} loading="lazy" decoding="async" />
                    <div className="wire-label">
                      <span>{chunk[2].label || 'Velvet Moment'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px', background: 'rgba(255, 255, 255, 0.01)', border: '1px dashed rgba(212, 175, 55, 0.15)', borderRadius: '12px', padding: '2.5rem', margin: '1.5rem auto 3rem', maxWidth: '580px', textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📸</span>
            <h3 style={{ color: 'var(--gold-light)', fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: '400', marginBottom: '0.5rem' }}>Capturing Timeless Memories</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.88rem', lineHeight: '1.5' }}>Timeless moments from our grand celebrations will be displayed here. Please upload photos through the admin panel to populate this gallery.</p>
          </div>
        )}

        {lightboxImg && (
          <div 
            className="lightbox" 
            role="dialog" 
            aria-modal="true" 
            aria-label={lightboxImg.label} 
            onClick={() => setLightboxImg(null)}
          >
            <button className="lb-close" onClick={() => setLightboxImg(null)}>&times;</button>
            <img 
              src={lightboxImg.src} 
              alt={lightboxImg.label} 
              onClick={e => e.stopPropagation()} 
            />
          </div>
        )}
      </section>

      {/* 4. Services Grid section */}
      <section className="services-intro" style={{ backgroundColor: 'var(--cream)' }}>
        <span className="ornament">❀</span>
        <h2>OUR SIGNATURE SERVICES</h2>
        <p>Bespoke themes custom tailored to reflect your identity and culture</p>
        <div className="gold-line"></div>
      </section>

      <section className="services-grid-wrap">
        <div className="services-grid">
          {displayServices.map((svc) => (
            <HomeServiceCard key={svc.id} svc={svc} />
          ))}
        </div>
      </section>

      {/* 5. Process flowchart section */}
      <section className="process-section" aria-label="Our process">
        <span className="ornament">❀</span>
        <h2>THE VELVET PILLARS</h2>
        <p>How we bring your dream milestone events to life step-by-step</p>
        <div className="gold-line"></div>

        <div className="process-grid">
          <div className="process-step">
            <div className="step-num">01</div>
            <h4>Bespoke Spatial Design</h4>
            <p>Creating custom environments, lighting blueprints, and color palettes that fit your vision.</p>
          </div>
          <div className="process-step">
            <div className="step-num">02</div>
            <h4>Meticulous Timelines</h4>
            <p>Coordinating vendors, guest transport, hotel lists, and stage setups with absolute military precision.</p>
          </div>
          <div className="process-step">
            <div className="step-num">03</div>
            <h4>Immersive Scenography</h4>
            <p>Designing pathways, fog details, and floral setups to create a memorable atmosphere.</p>
          </div>
        </div>
      </section>

      {/* 6. Video Section */}
      <section className="video-section" aria-label="Event highlights video">
        <div className="section-title">
          <span className="ornament">❀</span>
          <h2>HIGHLIGHTS GALLERY</h2>
          <p>Catch a glimpse of the cinematic magic we capture</p>
          <div className="gold-line"></div>
        </div>
        {embedUrl ? (
          <div className="video-wrap">
            <iframe 
              src={embedUrl}
              title="Event Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="video-placeholder">
            <VideoIcon size={36} color="var(--gold-dark)" />
            <p>No video added yet</p>
          </div>
        )}
      </section>

      {/* 8. Testimonials carousel */}
      <section className="testimonials-section" aria-label="Client Testimonials">
        <div className="section-title">
          <span className="ornament">❀</span>
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
