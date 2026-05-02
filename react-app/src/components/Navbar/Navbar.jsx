import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import StaggeredText from '../InteractiveText/StaggeredText';
import TransitionLink from '../PageTransition/TransitionLink';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
    return () => document.body.classList.remove('nav-open');
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'About', path: '/about' },
    { name: 'Strength', path: '/strength' },
    { name: 'Clients', path: '/clients' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`main-nav ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <TransitionLink to="/" className="nav-logo">
          <StaggeredText text="SHIV KRISHNA ENGINEERS" />
        </TransitionLink>

        <button
          type="button"
          className={`mobile-menu-toggle ${menuOpen ? 'open' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="mobile-nav-panel"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul id="mobile-nav-panel" className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li className="mobile-menu-close-row">
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </li>

          {navLinks.map((link, index) => (
            <li key={link.path} style={{ '--delay': `${index * 60}ms` }}>
              <TransitionLink
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`mobile-nav-backdrop ${menuOpen ? 'show' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </nav>
  );
}
