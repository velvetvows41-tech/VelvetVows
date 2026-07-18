import React from 'react';
import { Link } from 'react-router-dom';

const services = [
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

export default function Services() {
  return (
    <main>
      <div className="page-banner" role="banner">
        <div className="page-banner-text">
          <h1>OUR SERVICES</h1>
          <p className="breadcrumb">
            <Link to="/">Home</Link> &nbsp;/&nbsp; Services
          </p>
        </div>
      </div>

      {/* Services Intro */}
      <section className="services-intro">
        <span className="ornament">✦</span>
        <h2>SIGNATURE WEDDING EXPERIENCE PACKAGES</h2>
        <p>Bespoke planning & themes custom tailored to reflect your identity and culture</p>
        <div className="gold-line"></div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-wrap" style={{ paddingBottom: '80px' }}>
        <div className="services-grid">
          {services.map((svc) => (
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

      {/* Process flowchart section */}
      <section className="process-section" style={{ borderTop: '1px solid rgba(184, 150, 46, 0.15)', padding: '80px 24px' }}>
        <span className="ornament">✦</span>
        <h2>THE VELVET PLANNING TIMELINE</h2>
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
        <h3>Ready to Begin Your Wedding Journey?</h3>
        <p>Let's craft a celebration as unique as your love story.</p>
        <Link to="/contact" className="cta-btn">Consult with an Advisor</Link>
      </section>
    </main>
  );
}
