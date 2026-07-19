import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const services = [
  {
    id: 1,
    badge: "BESPOKE CURATION",
    title: "Wedding Curation",
    subtitle: "End-to-End Conceptualization",
    description: "From architectural floor plans and visual curation to custom vendor agreements, we design your milestone celebrations with meticulous attention to detail.",
    image: ""
  },
  {
    id: 2,
    badge: "ELITE CELEBRATIONS",
    title: "Social & Corporate Galas",
    subtitle: "Unforgettable Milestones",
    description: "Bespoke spatial design and execution for high-profile anniversaries, luxury birthdays, and corporate galas with premium hospitality.",
    image: ""
  },
  {
    id: 3,
    badge: "ROYAL HOSPITALITY",
    title: "Hospitality Desk Curation",
    subtitle: "Warm & Seamless Welcomes",
    description: "Dedicated coordinators managing 24/7 guest check-in desks, key card handovers, custom itinerary bags, and personal host supports.",
    image: ""
  },
  {
    id: 4,
    badge: "PERSONALIZED ASSISTANCE",
    title: "Guest Curation & RSVP Logs",
    subtitle: "RSVP & Comfort Curation",
    description: "Handling digital RSVPs, family travel schedules, luggage tagging, and arranging welcome hampers and cards for every guest.",
    image: ""
  },
  {
    id: 5,
    badge: "LUXURY DESIGN",
    title: "Venue & Spatial Design",
    subtitle: "Scenic Scenery & Lighting",
    description: "Scouting historic heritage locations and crafting grand floral avenues, cascading chandeliers, luxury mandaps, and high-fidelity stage designs.",
    image: ""
  },
  {
    id: 6,
    badge: "LOGISTICS & TRAVEL",
    title: "Guest Logistics Support",
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
            <span style={{ fontSize: '1.8rem', fontFamily: 'Cinzel, serif' }}>❀</span>
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
      <section className="services-intro" style={{ position: 'relative' }}>
        <div className="floral-accent floral-accent--top-right" style={{ width: '100px', height: '100px', top: '-10px', right: '10px' }} aria-hidden="true"></div>
        <span className="ornament">❀</span>
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

      {/* Pillars Section */}
      <section className="process-section" style={{ borderTop: '1px solid rgba(184, 150, 46, 0.15)', padding: '80px 24px' }}>
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

      {/* Services CTA Banner */}
      <section className="services-cta">
        <span className="ornament">❀</span>
        <h3>Ready to Plan Your Next Grand Event?</h3>
        <p>Let's craft a celebration as unique as your vision.</p>
        <Link to="/contact" className="cta-btn">Consult with an Advisor</Link>
      </section>
    </main>
  );
}
