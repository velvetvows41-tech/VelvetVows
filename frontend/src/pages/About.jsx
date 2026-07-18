import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedNumber from '../components/AnimatedNumber';

export default function About() {
  return (
    <main className="subpage-layout">

      <section style={{ padding: '80px 24px', backgroundColor: 'var(--bg)' }} aria-label="About Velvet Vows">
        <div className="about-card" style={{ top: '0', margin: '0 auto' }}>
          <div className="about-header" style={{ borderBottom: '1px solid rgba(184, 150, 46, 0.15)' }}>
            <span className="ornament">✦</span>
            <h2>OUR STORY & VISION</h2>
            <p className="about-tagline">
              Velvet Vows has defined luxury event planning by seamlessly executing traditional heritage integrated with modern grandeur.
            </p>
          </div>

          <div className="about-stats">
            <div className="stat-box">
              <span className="stat-num"><AnimatedNumber value="2+" /></span>
              <span className="stat-label">Years of Grace</span>
            </div>
            <div className="stat-box">
              <span className="stat-num"><AnimatedNumber value="150+" /></span>
              <span className="stat-label">Events Crafted</span>
            </div>
            <div className="stat-box">
              <span className="stat-num"><AnimatedNumber value="99%" /></span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat-box">
              <span className="stat-num"><AnimatedNumber value="12+" /></span>
              <span className="stat-label">Cities Served</span>
            </div>
          </div>

          <div className="about-content-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="about-block" style={{ borderRight: 'none', borderBottom: '1px solid rgba(184, 150, 46, 0.15)' }}>
              <h3><span className="block-icon">✨</span> Our Philosophy</h3>
              <p>
                We believe that a grand event is a sacred journey where families, friends, or organizations connect. Our task is to safeguard the sanctity of these moments by handling all administrative friction, vendor negotiation, travel logs, hotel checklists, stage setups, and decor timelines. We work in the background as silent directors so that you can live the happiest moments of your life fully.
              </p>
            </div>

            <div className="about-block" style={{ borderRight: 'none', borderBottom: '1px solid rgba(184, 150, 46, 0.15)' }}>
              <h3><span className="block-icon">💍</span> Signature Style</h3>
              <p>
                Our signature aesthetic is characterized by timeless refinement, rich botanical layouts, golden lighting geometry, and curated traditional craftsmanship. We collaborate with India's finest floral designers, local artisans, celebrity decorators, and lighting designers to turn any space into a royal sanctuary.
              </p>
            </div>

            <div className="about-block" style={{ borderRight: 'none' }}>
              <h3><span className="block-icon">💼</span> End-to-End Execution</h3>
              <p>
                We manage everything from destination mapping, digital RSVP logs, catering consultations, VIP check-in logs, transport logistics, sound design, and final stage coordination. You can trust our team of dedicated event coordinators to run the event with absolute military precision.
              </p>
            </div>
          </div>

          <div className="about-cta">
            <h3>Let's Begin Planning Your Celebration</h3>
            <p>Connect with our design consultants to see how we can shape your special event moments.</p>
            <Link to="/contact" className="cta-btn">Connect With Us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
