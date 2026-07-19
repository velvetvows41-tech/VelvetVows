import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const services = [
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

function ServiceCard({ svc }) {
  const [loaded, setLoaded] = React.useState(false);

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

export default function Services() {
  const { serviceImages } = useAdmin();

  const displayServices = serviceImages.length > 0
    ? serviceImages.map((img, index) => {
        const defaultMeta = services[index] || {
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
          description: defaultMeta.description,
          image: img.src
        };
      })
    : services;

  return (
    <main className="subpage-layout">

      {/* Services Intro */}
      <section className="services-intro">
        <span className="ornament">✦</span>
        <h2>SIGNATURE EXPERIENCE PACKAGES</h2>
        <p>Bespoke planning & themes custom tailored to reflect your identity and culture</p>
        <div className="gold-line"></div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-wrap" style={{ paddingBottom: '80px' }}>
        <div className="services-grid">
          {displayServices.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </div>
      </section>

      {/* Process flowchart section */}
      <section className="process-section" style={{ borderTop: '1px solid rgba(184, 150, 46, 0.15)', padding: '80px 24px' }}>
        <span className="ornament">✦</span>
        <h2>THE VELVET PLANNING TIMELINE</h2>
        <p>How we bring your dream milestone events to life step-by-step</p>
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
            <p>Managing vendors, hotel bookings, and travel logs.</p>
          </div>
          <div className="process-step">
            <div className="step-num">04</div>
            <h4>Celebration</h4>
            <p>Our on-site directors execute everything flawlessly on-stage.</p>
          </div>
        </div>
      </section>

      {/* Services CTA Banner */}
      <section className="services-cta">
        <span className="ornament">✦</span>
        <h3>Ready to Plan Your Next Grand Event?</h3>
        <p>Let's craft a celebration as unique as your vision.</p>
        <Link to="/contact" className="cta-btn">Consult with an Advisor</Link>
      </section>
    </main>
  );
}
