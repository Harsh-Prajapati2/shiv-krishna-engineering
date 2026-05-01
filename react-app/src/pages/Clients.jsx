import React from 'react';
import { Link } from 'react-router-dom';
import ScrambleText from '../components/ScrambleText/ScrambleText';
import ReverseGravitySection from '../components/ReverseGravitySection/ReverseGravitySection';
import '../styles/Clients.css';

/**
 * Clients Page Component
 * Clean partnership focus for light theme
 */
export default function Clients() {
  return (
    <div className="clients-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="hero-eyebrow">WHO WE WORK WITH</div>
          <h1>
            <ScrambleText text="Trust Built Through" delay={200} /><br />
            <ScrambleText text="Consistency." delay={800} />
          </h1>
          <div className="breadcrumb">Home / Clients</div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="clients-intro-section">
        <div className="container">
          <p className="large-intro">
            Shiv Krishna Engineers has built long-term relationships with clients across Gujarat's industrial belt, from pharmaceutical hubs to power generation giants.
          </p>
        </div>
      </section>

      {/* AMC Section */}
      <section className="amc-section bg-secondary">
        <div className="container">
          <ReverseGravitySection className="amc-grid">
            <div className="amc-content">
              <div className="section-label">ANNUAL MAINTENANCE</div>
              <h2>Long-Term Maintenance Partnerships</h2>
              <p>
                Several of our clients engage us on Annual Maintenance Contract basis — a testament to the consistency and quality of our work. AMC clients benefit from priority response and dedicated site teams.
              </p>
            </div>
            <div className="amc-visual">
              <div className="amc-tag">AMC EXCELLENCE</div>
            </div>
          </ReverseGravitySection>
        </div>
      </section>

      {/* Solar Partnership */}
      <section className="solar-partnership-section">
        <div className="container">
          <ReverseGravitySection className="solar-grid">
            <div className="solar-visual">
              <div className="solar-tag">SOLAR PROJECTS</div>
            </div>
            <div className="solar-content">
              <div className="section-label">STRATEGIC PARTNERSHIP</div>
              <h2>Solar Power Project Execution</h2>
              <p>
                We are active partners in Solar Power Project execution — providing mechanical erection, structural support installation, and commissioning services across the region.
              </p>
            </div>
          </ReverseGravitySection>
        </div>
      </section>

      {/* CTA Block */}
      <section className="cta-block-section">
        <div className="container">
          <div className="cta-block-content">
            <h2>Interested in Working Together?</h2>
            <p>We welcome enquiries from plant managers and project heads across all industrial sectors.</p>
            <Link to="/contact" className="btn btn-primary">SEND AN ENQUIRY</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
