import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import '../styles/Services.css';
import SVGCircuitDraw from "../components/SVGDraw/SVGCircuitDraw";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const pageRef = useRef(null);

  useEffect(() => {
    // Parallax effect on division numbers
    const numbers = gsap.utils.toArray('.div-num-bg');
    numbers.forEach((num) => {
      gsap.to(num, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: num.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="services-page page-transition-root" ref={pageRef}>
      {/* â”€â”€ GLOBAL SVG BACKGROUND â”€â”€ */}
      <div className="global-bg-circuit">
        <SVGCircuitDraw />
      </div>

      {/* Page Hero */}
      <section className="section-transition page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: `url('/images/hero-background.png')` }} />
        <div className="container">
          <div className="hero-eyebrow">WHAT WE OFFER</div>
          <h1 className="services-hero-heading">Industrial Expertise<br />Redefined.</h1>
          <div className="breadcrumb">Home / Services</div>
        </div>
      </section>

      {/* DIVISION 1: Mechanical Project - Liquid Blob Morph */}
      <section className="section-transition service-section division-1">
        <div className="container position-relative">
          <div className="div-num-bg">01</div>
          <div className="division-header">
            <h2 className="services-section-heading">Mechanical Project Division</h2>
            <p className="division-desc">End-to-end project delivery â€” from initial planning and material procurement to full site execution and handover.</p>
          </div>
          
          <div className="cards-grid blob-grid">
            {[
              { name: "Project Management", detail: "Full project lifecycle management from scoping to completion." },
              { name: "Erection & Commissioning", detail: "Structural and mechanical erection of plant equipment." },
              { name: "Material Supply", detail: "Procurement of mechanical components and structural steel." },
              { name: "Manpower Supply", detail: "Deployment of certified welders, fitters, and fabricators." }
            ].map((svc, i) => (
              <div key={i} className="creative-card card-blob">
                <div className="blob-bg"></div>
                <div className="card-content">
                  <div className="icon-wrapper">âœ¦</div>
                  <h3>{svc.name}</h3>
                  <p>{svc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVISION 2: Maintenance - Pulsing Radar/Ripple Rings */}
      <section className="section-transition service-section division-2">
        <div className="container position-relative">
          <div className="div-num-bg">02</div>
          <div className="division-header">
            <h2 className="services-section-heading">Mechanical Maintenance Division</h2>
            <p className="division-desc">Preventing unplanned downtime with scheduled preventive programs, predictive strategies, and rapid-response shutdown services.</p>
          </div>
          
          <div className="cards-grid radar-grid">
            {[
              { name: "Preventive Maintenance", detail: "Scheduled inspection and servicing to maximize uptime." },
              { name: "Predictive Solutions", detail: "Vibration analysis and condition monitoring." },
              { name: "Shutdown Services", detail: "24/7 rapid response for emergency breakdowns." },
              { name: "Energy Saving", detail: "Audit-based recommendations for efficiency upgrades." }
            ].map((svc, i) => (
              <div key={i} className="creative-card card-radar">
                <div className="radar-rings">
                  <div className="ring ring-1"></div>
                  <div className="ring ring-2"></div>
                  <div className="ring ring-3"></div>
                </div>
                <div className="card-content">
                  <div className="icon-wrapper">â—ˆ</div>
                  <h3>{svc.name}</h3>
                  <p>{svc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVISION 3: Designing - 3D Tech Data Stream */}
      <section className="section-transition service-section division-3">
        <div className="container position-relative">
          <div className="div-num-bg">03</div>
          <div className="division-header">
            <h2 className="services-section-heading">Designing & Consulting Division</h2>
            <p className="division-desc">Qualified draughtsmen and mechanical engineers ensuring every design meets industry codes and safety standards.</p>
          </div>
          
          <div className="cards-grid tech-grid">
            {[
              { name: "Mechanical Design", detail: "Equipment layouts, piping isometrics, and fabrication details." },
              { name: "Engineering Consultation", detail: "Expert advice on equipment selection and optimization." },
              { name: "Technical Documentation", detail: "Preparation of method statements and inspection test plans." },
              { name: "CAD Drafting", detail: "Dedicated draughtsmen for CAD drafting and drawing revisions." }
            ].map((svc, i) => (
              <div key={i} className="creative-card card-tech3d">
                <div className="data-stream-bg"></div>
                <div className="card-content">
                  <div className="icon-wrapper">â—±</div>
                  <h3>{svc.name}</h3>
                  <p>{svc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIVISION 4: Painting & Insulation - Shimmering Liquid/Sweep */}
      <section className="section-transition service-section division-4">
        <div className="container position-relative">
          <div className="div-num-bg">04</div>
          <div className="division-header">
            <h2 className="services-section-heading">Painting & Insulation</h2>
            <p className="division-desc">Surface protection and thermal management are critical to long-term asset integrity.</p>
          </div>
          
          <div className="cards-grid shimmer-grid">
            {[
              { name: "Industrial Painting", detail: "Surface preparation and topcoat finishing to IS/BS standards." },
              { name: "Thermal Insulation", detail: "Hot and cold insulation using mineral wool and PUF." },
              { name: "Roof Sheeting", detail: "Installation of color-coated roof sheeting for industrial buildings." },
              { name: "Surface Prep", detail: "Sandblasting and chemical cleaning for optimal coating." }
            ].map((svc, i) => (
              <div key={i} className="creative-card card-shimmer">
                <div className="shimmer-overlay"></div>
                <div className="card-content">
                  <div className="icon-wrapper">â—</div>
                  <h3>{svc.name}</h3>
                  <p>{svc.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


