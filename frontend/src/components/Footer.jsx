import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src="/images/logo.jpg" alt="Velvet Vows" className="footer-logo" />
          <h4 className="footer-brand-name">VELVET VOWS</h4>
          <p>
            Velvet Vows Wedding Planner – Where Luxury Meets Tradition. Creating unforgettable, bespoke wedding experiences across India.
          </p>
          <a
            href="https://www.instagram.com/velvetvows.event?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="footer-insta"
          >
            INSTAGRAM
          </a>
        </div>

        <div className="footer-col">
          <h4>EXPLORE</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-col">
          <h4>OUR STUDIO</h4>
          <p style={{ color: '#ffffff8c', fontSize: '0.84rem', lineHeight: '1.8' }}>
            Mandsaur,<br />
            Madhya Pradesh, India - 458001
          </p>
          <p style={{ color: '#ffffff8c', fontSize: '0.84rem', lineHeight: '1.8', marginTop: '10px' }}>
            Phone: +91 9302899270<br />
            Email: eventvelvetvows@gmail.com
          </p>
        </div>
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Velvet Vows. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
