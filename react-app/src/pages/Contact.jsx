import React from 'react';
import ScrambleText from '../components/ScrambleText/ScrambleText';
import ReverseGravitySection from '../components/ReverseGravitySection/ReverseGravitySection';
import '../styles/Contact.css';

/**
 * Contact Page Component
 * Premium light theme form and info cards
 */
export default function Contact() {
  return (
    <div className="contact-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-eyebrow">GET IN TOUCH</div>
          <h1>
            <ScrambleText text="Let's Build the" delay={200} /><br />
            <ScrambleText text="Future Together." delay={800} />
          </h1>
          <div className="breadcrumb">Home / Contact</div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-main-section">
        <div className="container">
          <ReverseGravitySection className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2>Send an Enquiry</h2>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <label>Company *</label>
                    <input type="text" placeholder="Company Name" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Phone *</label>
                    <input type="tel" placeholder="+91" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Service Interested In</label>
                  <select>
                    <option>Mechanical Projects</option>
                    <option>Plant Maintenance</option>
                    <option>Design & Consulting</option>
                    <option>Painting & Insulation</option>
                    <option>General Query</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea placeholder="Describe your project requirements..."></textarea>
                </div>
                <button type="submit" className="btn-magnetic" style={{ width: 'fit-content', border: 'none' }}>SEND ENQUIRY</button>
              </form>
            </div>

            {/* Contact Info Cards */}
            <div className="contact-info-wrapper">
              <div className="info-card">
                <h3>Our Headquarters</h3>
                <address>
                  397, Siddhnath Nagar, Link Road<br />
                  Bharuch, Gujarat - 392001
                </address>
              </div>

              <div className="info-card">
                <h3>Contact Details</h3>
                <div className="contact-links">
                  <div>Phone: <strong>+91 94080 84532</strong></div>
                  <div>Mobile: <strong>+91 88872 39361</strong></div>
                  <div>Email: <strong>shivkrishnaengineers@gmail.com</strong></div>
                </div>
              </div>

              <div className="info-card">
                <h3>Legal Credentials</h3>
                <div className="reg-details">
                  <div className="reg-item">
                    <span>GST IN</span>
                    <span className="val">24GFJPS9399J1ZB</span>
                  </div>
                  <div className="reg-item">
                    <span>PAN NO</span>
                    <span className="val">GFJPS9399J</span>
                  </div>
                  <div className="reg-item">
                    <span>IFSC CODE</span>
                    <span className="val">FSFB0000001</span>
                  </div>
                </div>
              </div>
            </div>
          </ReverseGravitySection>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section" style={{ padding: 0, lineHeight: 0 }}>
        <iframe 
          title="Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59392.42841675231!2d72.9818816!3d21.7051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f039393939393%3A0x3939393939393939!2sBharuch%2C%20Gujarat%20392001!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
          width="100%" height="500" style={{ border: 0 }} allowFullScreen="" loading="lazy"
        ></iframe>
      </section>
    </div>
  );
}
