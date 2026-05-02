import React from 'react';
import SkewCard from '../components/SkewCard/SkewCard';
import ScrambleText from '../components/ScrambleText/ScrambleText';
import '../styles/Industries.css';

/**
 * Industries Page Component
 * High-impact industrial cards for light theme
 */
export default function Industries() {
  const industries = [
    {
      title: "Pharmaceuticals",
      content: "Precision mechanical execution for plants demanding the highest standards of cleanliness and regulatory GMP compliance."
    },
    {
      title: "Chemicals & Fertilizers",
      content: "Handling complex piping and equipment erection in corrosive and extreme process environments with full safety rigor."
    },
    {
      title: "Petrochemicals",
      content: "Expertise in refinery environments, rotating equipment, and high-pressure networks for leading petrochemical facilities."
    },
    {
      title: "Power Plants",
      content: "Supporting thermal, solar, and industrial power operations with equipment erection and energy-saving upgrades."
    },
    {
      title: "Cement Plants",
      content: "Robust maintenance and structural work for heavy rotating equipment in high-dust manufacturing environments."
    },
    {
      title: "Power & Utilities",
      content: "Installation and ongoing maintenance of plant utility systems to ensure uninterrupted operational lifelines."
    }
  ];

  return (
    <div className="industries-page page-transition-root">
      {/* Page Hero */}
      <section className="section-transition page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url('/images/hero-background.png')` }} />
        <div className="container">
          <div className="hero-eyebrow">SECTORS WE SERVE</div>
          <h1 className="industries-hero-heading">
            <ScrambleText text="Powering Global" delay={200} /><br />
            <ScrambleText text="Industries." delay={800} />
          </h1>
          <div className="breadcrumb">Home / Industries</div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-transition industries-grid-section">
        <div className="container">
          <div className="industries-grid">
            {industries.map((industry, index) => (
              <SkewCard key={index} className="industry-card">
                <span className="industry-index">{String(index + 1).padStart(2, '0')}</span>
                <h2>{industry.title}</h2>
                <p>{industry.content}</p>
              </SkewCard>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="section-transition coverage-section bg-accent">
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>COVERAGE</div>
            <h2 className="section-heading">Serving the Industrial Belt</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
              Strategically based in Bharuch, Gujarat, we are positioned to serve major industrial hubs from Ankleshwar to Dahej with rapid deployment teams.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}


