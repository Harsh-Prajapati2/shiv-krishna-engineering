import React from 'react';
import GlowCard from '../components/GlowCard/GlowCard';
import '../styles/Strength.css';

/**
 * Strength Page Component
 * Clean data visualization for light theme
 */
export default function Strength() {
  const tools = [
    { name: "Chain Pulley Block â€” Various Capacities", qty: "15" },
    { name: "Drilling Machine â€” Magnetic", qty: "3" },
    { name: "Gas Cutting Set", qty: "10" },
    { name: "Grinding Machine (AG-7 / AG-5 / GQ-4)", qty: "20" },
    { name: "Welding Machine â€” Rectifiers", qty: "15" },
    { name: "Welding Argon Set", qty: "18" },
    { name: "Wire Rope Slings", qty: "25" },
    { name: "Hydra (12T - 14T)", qty: "2" },
    { name: "Utility Vehicle", qty: "1" }
  ];

  const manpower = [
    { title: "Management", count: 2 },
    { title: "Site Engineers", count: 6 },
    { title: "Supervisors", count: 10 },
    { title: "Welders", count: 30 },
    { title: "Fitters", count: 25 },
    { title: "Riggers", count: 50 },
    { title: "Gas Cutters", count: 15 },
    { title: "Helpers", count: 30 }
  ];

  const pillars = [
    {
      title: "Technical Depth",
      desc: "Founded by B.E. Mechanical graduates with 6+ years of direct industry experience."
    },
    {
      title: "Operational Rigor",
      desc: "Four independent divisions optimized for specific mechanical domains."
    },
    {
      title: "Safety First",
      desc: "Zero Deviation Plan on all high-risk site activities to ensure team welfare."
    },
    {
      title: "Financial Stability",
      desc: "Track record of delivered contracts with full statutory compliance."
    }
  ];

  return (
    <div className="strength-page page-transition-root">
      {/* Page Hero */}
      <section className="section-transition page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url('/images/hero-background.png')` }} />
        <div className="container">
          <div className="hero-eyebrow">CAPABILITY OVERVIEW</div>
          <h1 className="strength-hero-heading">Infrastructure &<br />Expertise.</h1>
          <div className="breadcrumb">Home / Strength</div>
        </div>
      </section>

      {/* Tools & Equipment */}
      <section className="section-transition tools-section">
        <div className="container">
          <div className="section-label">INVENTORY</div>
          <h2 className="section-heading">Major Tools & Equipment</h2>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Asset Category</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Manpower Breakdown */}
      <section className="section-transition manpower-section bg-secondary">
        <div className="container">
          <div className="manpower-grid">
            <div className="manpower-list">
              {manpower.map((item, index) => (
                <div key={index} className="manpower-item">
                  <span className="count">{item.count}</span>
                  <span className="title">{item.title}</span>
                </div>
              ))}
            </div>
            <div className="manpower-text">
              <div className="section-label">TEAM STRENGTH</div>
              <h2 className="section-heading">200+ Professionals</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
                Our workforce is meticulously trained for specific industrial trades. From certified welders to project managers, we bring the right skill set to every site.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars */}
      <section className="section-transition pillars-section">
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>PILLARS</div>
          <h2 className="section-heading" style={{ textAlign: 'center' }}>The Core of Our Success</h2>
          <div className="pillars-grid">
            {pillars.map((pillar, index) => (
              <GlowCard key={index} className="pillar-card" glowColor="rgba(255, 75, 0, 0.15)">
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


