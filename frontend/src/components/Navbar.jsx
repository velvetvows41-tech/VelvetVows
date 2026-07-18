import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAdmin();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <Link to="/" className="nav-logo" aria-label="Velvet Vows Home">
        <img src="/images/logo.jpg" alt="Velvet Vows Logo" className="nav-logo-img" />
      </Link>

      <ul className="nav-links" role="menubar">
        {navLinks.map(({ path, label }) => (
          <li role="none" key={path}>
            <NavLink
              to={path}
              role="menuitem"
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={path === '/'}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className={`nav-hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-mobile ${isOpen ? 'nav-mobile--open' : ''}`} aria-hidden={!isOpen}>
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}
            end={path === '/'}
            tabIndex={isOpen ? 0 : -1}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
