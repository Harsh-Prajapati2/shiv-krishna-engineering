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
    <div className="about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-eyebrow">OUR STORY</div>
          <h1>
            <ScrambleText text="Built by Engineers," delay={200} /><br />
            <ScrambleText text="Run for Industry." delay={800} />
          </h1>
          <div className="breadcrumb">Home / About</div>
        </div>
      </section>

      {/* Company Story */}
      <section className="story-section">
        <div className="container">
          <ReverseGravitySection className="story-grid">
            <div className="story-text">
              <div className="section-label">WHO WE ARE</div>
              <h2>Quality and Client Commitment are our Foundations</h2>
              <p>
                Shiv Krishna Engineers was founded by two mechanical engineering graduates with a shared conviction — that quality execution and client commitment should be the foundation of every project.
              </p>
              <p>
                Based in Bharuch, Gujarat, we serve clients across pharmaceuticals, petrochemicals, chemicals, power, and cement sectors. Every engagement receives the same level of attention and professionalism.
              </p>
            </div>
            <div className="story-image-box">
              {/* Visual geometric element */}
              <div style={{ width: '100%', height: '400px', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', fontWeight: 900, color: 'var(--accent)' }}>2018</span>
              </div>
            </div>
          </ReverseGravitySection>
        </div>
      </section>

      {/* Modern Organogram */}
      <section className="organogram-section">
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
      <section className="policies-section bg-accent">
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
      <section className="registrations-section">
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
