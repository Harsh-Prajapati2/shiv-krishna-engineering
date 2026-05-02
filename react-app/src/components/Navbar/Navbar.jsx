import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MagneticLink from '../InteractiveText/MagneticLink';
import StaggeredText from '../InteractiveText/StaggeredText';
import TransitionLink from '../PageTransition/TransitionLink';
import { useTransitionNavigate } from '../PageTransition/PageTransitionRouter';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { go } = useTransitionNavigate() || {};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home',       path: '/' },
    { name: 'Services',   path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'About',      path: '/about' },
    { name: 'Strength',   path: '/strength' },
    { name: 'Clients',    path: '/clients' },
    { name: 'Contact',    path: '/contact' },
  ];

  return (
    <nav className={`main-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">

        {/* Logo — animated nav to Home */}
        <TransitionLink to="/" className="nav-logo">
          <StaggeredText text="SHIV KRISHNA ENGINEERS" />
        </TransitionLink>

        {/* Nav links */}
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <TransitionLink
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
              >
                {link.name}
              </TransitionLink>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
}
