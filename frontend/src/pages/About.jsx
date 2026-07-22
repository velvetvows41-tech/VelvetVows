import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedNumber from '../components/AnimatedNumber';
import { useAdmin } from '../context/AdminContext';

// Professional SVG Icons
const SparklesIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold)' }}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
  </svg>
);

const AwardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold)' }}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: 'middle', marginRight: '8px', color: 'var(--gold)' }}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default function About() {
  const { stats, brandText } = useAdmin();

  return (
    <main className="subpage-layout">

      <section style={{ padding: '80px 24px', backgroundColor: 'var(--bg)' }} aria-label="About Velvet Vows">
        <div className="about-card-wrapper" style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          <div className="floral-accent floral-accent--top-right" aria-hidden="true"></div>
          <div className="floral-accent floral-accent--bottom-left" aria-hidden="true"></div>
          
          <div className="about-card" style={{ top: '0', margin: '0' }}>
            <div className="about-header" style={{ borderBottom: '1px solid rgba(184, 150, 46, 0.15)' }}>
              <span className="ornament">❀</span>
              <h2>{brandText.aboutStoryTitle || 'OUR STORY & VISION'}</h2>
              <p className="about-tagline">
                {brandText.aboutStoryTagline || 'Velvet Vows has defined luxury event planning by seamlessly executing traditional heritage integrated with modern grandeur.'}
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

            <div className="about-content-grid" style={{ gridTemplateColumns: '1fr' }}>
              <div className="about-block" style={{ borderRight: 'none', borderBottom: '1px solid rgba(184, 150, 46, 0.15)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center' }}><SparklesIcon /> {brandText.aboutPhilosophyTitle || 'Our Philosophy'}</h3>
                <p>
                  {brandText.aboutPhilosophyDesc || 'We believe that a grand event is a sacred journey where families, friends, or organizations connect. Our task is to safeguard the sanctity of these moments by handling all administrative friction, vendor negotiation, travel logs, hotel checklists, stage setups, and decor timelines. We work in the background as silent directors so that you can live the happiest moments of your life fully.'}
                </p>
              </div>

              <div className="about-block" style={{ borderRight: 'none', borderBottom: '1px solid rgba(184, 150, 46, 0.15)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center' }}><AwardIcon /> {brandText.aboutSignatureTitle || 'Signature Style'}</h3>
                <p>
                  {brandText.aboutSignatureDesc || 'Our signature aesthetic is characterized by timeless refinement, rich botanical layouts, golden lighting geometry, and curated traditional craftsmanship. We collaborate with India\'s finest floral designers, local artisans, celebrity decorators, and lighting designers to turn any space into a royal sanctuary.'}
                </p>
              </div>

              <div className="about-block" style={{ borderRight: 'none' }}>
                <h3 style={{ display: 'flex', alignItems: 'center' }}><BriefcaseIcon /> {brandText.aboutExecutionTitle || 'End-to-End Execution'}</h3>
                <p>
                  {brandText.aboutExecutionDesc || 'We manage everything from destination mapping, digital RSVP logs, catering consultations, VIP check-in logs, transport logistics, sound design, and final stage coordination. You can trust our team of dedicated event coordinators to run the event with absolute military precision.'}
                </p>
              </div>
            </div>

            <div className="about-cta">
              <h3>Let's Begin Planning Your Celebration</h3>
              <p>Connect with our design consultants to see how we can shape your special event moments.</p>
              <Link to="/contact" className="cta-btn">Connect With Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
