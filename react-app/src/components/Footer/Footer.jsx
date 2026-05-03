import React from 'react';
import SpotlightText from '../InteractiveText/SpotlightText';
import TransitionLink from '../PageTransition/TransitionLink';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="creative-footer">
      <div className="footer-container">
        <div className="footer-massive-text">
          <h1><SpotlightText text="SHIV KRISHNA ENGINEERS" /></h1>
        </div>
        <div className="footer-top-grid">
          
          <div className="footer-brand-col">
            <div className="brand-badge">EST. 2018</div>
            <h3 className="footer-tagline">Committed to<br/>Operational Excellence.</h3>
            <p className="footer-address">
              397, Siddhnath Nagar, Link Road<br />
              Bharuch, Gujarat - 392001
            </p>
          </div>

          <div className="footer-links-col">
            <span className="col-label">Explore</span>
            <ul className="magnetic-links">
              <li><TransitionLink to="/">Home</TransitionLink></li>
              <li><TransitionLink to="/services">Services</TransitionLink></li>
              <li><TransitionLink to="/industries">Industries</TransitionLink></li>
              <li><TransitionLink to="/about">About Us</TransitionLink></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <span className="col-label">Connect</span>
            <ul className="magnetic-links">
              <li><TransitionLink to="/strength">Our Strength</TransitionLink></li>
              <li><TransitionLink to="/clients">Clients</TransitionLink></li>
              <li><TransitionLink to="/contact">Contact</TransitionLink></li>
            </ul>
          </div>

          <div className="footer-contact-col">
            <span className="col-label">Inquiries</span>
            <a href="mailto:shivkrishnaengineers@gmail.com" className="huge-email">
              hello@shivkrishna.com
            </a>
            <div className="contact-numbers">
              <span>+91 94080 84532</span>
              <span>+91 88872 39361</span>
            </div>
          </div>
        </div>

        

        <div className="footer-bottom-bar">
          <div className="legal-info">
            <span>GST: 24GFJPS9399J1ZB</span>
            <span className="dot">•</span>
            <span>PAN: GFJPS9399J</span>
          </div>
          <div className="copyright">
            © {new Date().getFullYear()} Shiv Krishna Engineers. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
