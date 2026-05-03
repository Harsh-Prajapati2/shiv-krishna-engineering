import React from 'react';
import ScrambleText from '../components/ScrambleText/ScrambleText';
import ReverseGravitySection from '../components/ReverseGravitySection/ReverseGravitySection';
import '../styles/About.css';

/**
 * About Page Component
 * Redesigned with interactive elements and modern organogram
 */
export default function About() {
  return (
    <div className="about-page page-transition-root">
      {/* Page Hero */}
      <section className="section-transition page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url('/images/hero-background.png')` }} />
        <div className="container">
          <div className="hero-eyebrow">OUR STORY</div>
          <h1 className="about-hero-heading">
            <ScrambleText text="Built by Engineers," delay={200} /><br />
            <ScrambleText text="Run for Industry." delay={800} />
          </h1>
          <div className="breadcrumb">Home / About</div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-transition story-section">
      <div className="container">
        <ReverseGravitySection className="story-grid">
          
          <div className="story-text">
            <div className="section-label">WHO WE ARE</div>
            
            <h2>Engineering Excellence Driven by Experience and Execution</h2>
            
            <p>
              Shiv Krishna Engineers is a Bharuch-based mechanical engineering and contracting company, established by experienced professionals with strong industry backgrounds in project execution, erection, and commissioning. The company was built to deliver reliable, high-quality engineering solutions tailored to industrial requirements.
            </p>
            
            <p>
              We operate through specialized divisions including Mechanical Projects, Maintenance Services, Engineering Design & Consulting, and Painting, Insulation & Roofing. With a skilled workforce and modern tools, we serve industries such as pharmaceuticals, petrochemicals, chemicals, power, and cement, ensuring safety, efficiency, and consistent project delivery.
            </p>
          </div>

          <div className="story-image-box">
            {/* Visual geometric element */}
            <div
              style={{
                width: '100%',
                height: '400px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                borderRadius: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '5rem',
                  fontWeight: 900,
                  color: 'var(--accent)'
                }}
              >
                2020
              </span>
            </div>
          </div>

        </ReverseGravitySection>
      </div>
    </section>

      {/* Modern Organogram */}
      <section className="section-transition organogram-section">
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>STRUCTURE</div>
          <h2 className="section-heading">Our Leadership & Team</h2>
          <div className="org-chart">
            <div className="org-node root">
              <span className="role">PROPRIETOR</span>
              <span className="name">Kavindra Bahadur Singh</span>
            </div>
            
            <div className="org-level-branches" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className="org-node">
                <span className="role">PROJECT MANAGER</span>
                <span className="name">Operations Head</span>
              </div>
              <div className="org-node">
                <span className="role">SITE COORDINATOR</span>
                <span className="name">Planning Lead</span>
              </div>
            </div>

            <div className="worker-summary" style={{ marginTop: '40px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Supported by 200+ specialized tradespeople</p>
            </div>
          </div>
        </div>
      </section>

      {/* Policy Grid */}
      <section className="section-transition policies-section bg-accent">
        <div className="container">
          <div className="policy-grid">
            <div className="policy-card">
              <div className="section-label">QUALITY POLICY</div>
              <h3>Commitment to Excellence</h3>
              <ul>
                <li>National & international standards compliance</li>
                <li>Cost-effective, "Right First Time" delivery</li>
                <li>Continual technical improvement</li>
                <li>Individual responsibility for quality</li>
              </ul>
            </div>

            <div className="policy-card">
              <div className="section-label">SAFETY POLICY</div>
              <h3>Zero Deviation Plan</h3>
              <ul>
                <li>Safe and healthy working conditions</li>
                <li>Mandatory PPE enforcement</li>
                <li>Statutory EHS compliance</li>
                <li>Prompt on-site reporting systems</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="section-transition registrations-section">
        <div className="container">
          <div className="registrations-grid">
            <div className="reg-item">
              <span className="label">GST IN</span>
              <span className="value">24GFJPS9399J1ZB</span>
            </div>
            <div className="reg-item">
              <span className="label">PAN NO</span>
              <span className="value">GFJPS9399J</span>
            </div>
            <div className="reg-item">
              <span className="label">BANK AC</span>
              <span className="value">21200000014891</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


