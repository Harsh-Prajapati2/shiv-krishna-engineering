import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Layout components
import Hero3D from '../components/Hero/Hero';
import ReverseGravitySection from '../components/ReverseGravitySection/ReverseGravitySection';
import GlowCard from '../components/GlowCard/GlowCard';
import MagneticButton from '../components/MagneticButton/MagneticButton';
import StaggeredText from '../components/InteractiveText/StaggeredText';
import TransitionLink from '../components/PageTransition/TransitionLink';

// Image & SVG animation components
import SVGCircuitDraw from '../components/SVGDraw/SVGCircuitDraw';
import CurtainReveal from '../components/CurtainReveal/CurtainReveal';
import ClipReveal from '../components/ClipReveal/ClipReveal';
import CounterStat from '../components/CounterStat/CounterStat';
import StaggeredImageGrid from '../components/StaggeredGrid/StaggeredImageGrid';
import SVGTimeline from '../components/SVGTimeline/SVGTimeline';
import SVGIconBurst from '../components/SVGIconBurst/SVGIconBurst';
import ScrollVelocityDistort from '../components/ScrollVelocityDistort/ScrollVelocityDistort';

import '../styles/Home.css';

gsap.registerPlugin(ScrollTrigger);

// Placeholder image data — replace src values with real photos
const projectPhotos = [
  { src: null, alt: 'Pipeline Installation Project', label: 'Pipeline Installation' },
  { src: null, alt: 'Plant Maintenance Work',        label: 'Plant Maintenance' },
  { src: null, alt: 'Mechanical Erection',            label: 'Mechanical Erection' },
  { src: null, alt: 'Solar Power Project',            label: 'Solar Project' },
  { src: null, alt: 'Structural Fabrication',         label: 'Structural Fabrication' },
  { src: null, alt: 'Painting & Insulation Work',    label: 'Painting & Insulation' },
];

export default function Home() {
  const marqueeRef     = useRef(null);
  const servicesWrapperRef   = useRef(null);
  const servicesContainerRef = useRef(null);
  const aboutTextRef   = useRef(null);

  useEffect(() => {
    // ── Word-reveal scrub ──
    if (aboutTextRef.current) {
      const words = aboutTextRef.current.querySelectorAll('.word');
      gsap.fromTo(words,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          stagger: 0.04,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutTextRef.current,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 1.2,
          }
        }
      );
    }

    // ── Horizontal scroll services ──
    if (servicesContainerRef.current && servicesWrapperRef.current) {
      const totalWidth = servicesContainerRef.current.scrollWidth - window.innerWidth;
      gsap.to(servicesContainerRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: servicesWrapperRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${totalWidth}`,
        }
      });
    }

    // ── Infinite marquee ──
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 18,
        repeat: -1,
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="home-page">

      {/* ── HERO (3D Scene) ── */}
      <Hero3D />

      {/* ── SVG CIRCUIT PATH DRAW (Idea #1) ── */}
      <section className="circuit-strip">
        <div className="container">
          <SVGCircuitDraw />
        </div>
      </section>

      {/* ── WHO WE ARE — text + curtain image (Ideas #4 + word scrub) ── */}
      <section className="about-immersive">
        <div className="container">
          <ReverseGravitySection>
            <div className="about-two-col">

              {/* Left: text content */}
              <div className="about-text-col">
                <div className="section-label">
                  <StaggeredText text="WHO WE ARE" />
                </div>
                <h2 className="about-massive-text" ref={aboutTextRef}>
                  {"Engineering Professionals Committed to Excellence".split(' ').map((word, i) => (
                    <span key={i} className="word-wrap">
                      <span className="word">{word}&nbsp;</span>
                    </span>
                  ))}
                </h2>
                <div className="about-details">
                  <p>
                    Shiv Krishna Engineers is an emerging contracting firm based in Bharuch, Gujarat.
                    We bring proven expertise to every engagement across pharmaceuticals, petrochemicals, and power sectors.
                  </p>
                  <MagneticButton strength={0.3}>
                    <TransitionLink to="/about" className="btn-magnetic">Discover Our Story</TransitionLink>
                  </MagneticButton>
                </div>
              </div>

              {/* Right: Core Pillars Grid (Replacing the photo) */}
              <div className="about-pillars-grid">
                {[
                  { title: "Precision", desc: "Millimeter-perfect execution in every mechanical assembly." },
                  { title: "Safety", desc: "Zero-compromise safety protocols for every site operative." },
                  { title: "Timeline", desc: "Strict adherence to project schedules and shutdown windows." },
                  { title: "Expertise", desc: "Proven track record across pharma, power, and chemical sectors." }
                ].map((pillar, i) => (
                  <div key={i} className="pillar-item">
                    <div className="pillar-num">0{i+1}</div>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                ))}
              </div>

            </div>
          </ReverseGravitySection>
        </div>
      </section>

      {/* ── STATS WITH SVG RINGS (Idea #9) ── */}
      <section className="stats-section bg-secondary">
        <div className="container">
          <div className="stats-grid">
            <CounterStat value={200} label="Skilled Workforce" suffix="+" />
            <CounterStat value={6}   label="Years Experience"  suffix="+" />
            <CounterStat value={50}  label="Projects Completed" suffix="+" />
            <CounterStat value={12}  label="Industry Sectors"  suffix="" />
          </div>
        </div>
      </section>

      {/* ── CORE DIVISIONS — SVG icon burst cards (Ideas #20 + GlowCard) ── */}
      <section className="divisions-section">
        <div className="container">
          <div className="section-label">
            <StaggeredText text="OUR CORE DIVISIONS" />
          </div>

          <ScrollVelocityDistort maxSkew={3}>
            <div className="divisions-grid">
              {[
                { id: '1', num: '01', icon: 'projects',    title: 'Mechanical Project Division',   desc: 'End-to-end project delivery — planning, procurement, site execution and handover with a dedicated team of execution engineers.' },
                { id: '2', num: '02', icon: 'maintenance', title: 'Mechanical Maintenance Division', desc: 'Preventing unplanned downtime with preventive programs, predictive strategies, and rapid-response shutdown services.' },
                { id: '3', num: '03', icon: 'design',      title: 'Designing & Consulting Division', desc: 'Technical backbone for complex projects — from initial concept drawings to final as-built documentation.' },
                { id: '4', num: '04', icon: 'protection',  title: 'Painting & Insulation',           desc: 'Surface protection and thermal management critical to long-term asset integrity — painting, insulation, roof sheeting.' },
              ].map(d => (
                <GlowCard key={d.id} className="division-card" glowColor="rgba(255, 75, 0, 0.1)">
                  <SVGIconBurst icon={d.icon} />
                  <div className="division-num">{d.num}</div>
                  <h3>{d.title}</h3>
                  <p>{d.desc}</p>
                </GlowCard>
              ))}
            </div>
          </ScrollVelocityDistort>
        </div>
      </section>

      {/* ── PROJECT PHOTO GRID — staggered cascade entrance (Idea #10) ── */}
      {/* Replace null srcs with: /images/project-1.jpg … project-6.jpg */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="section-label">
            <StaggeredText text="OUR WORK" />
          </div>
          <h2 className="section-heading">Projects That<br />Speak for Themselves.</h2>
          <StaggeredImageGrid items={projectPhotos} />
          <div className="grid-cta">
            <MagneticButton strength={0.25}>
              <TransitionLink to="/services" className="btn-magnetic">View All Services</TransitionLink>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── HORIZONTAL SCROLL SERVICES ── */}
      <section className="services-horizontal-wrapper" ref={servicesWrapperRef}>
        <div className="services-horizontal-container" ref={servicesContainerRef}>
          <div className="service-intro-panel">
            <div className="section-label">
              <StaggeredText text="WHAT WE DO" />
            </div>
            <h2>Comprehensive<br />Industrial Solutions</h2>
            <p>Scroll to explore our specialized services.</p>
          </div>

          {[
            { title: 'Projects',     items: ['Project Management', 'Erection & Commissioning', 'Material Supply', 'Manpower Supply'] },
            { title: 'Maintenance',  items: ['Preventive Maintenance', 'Predictive Solutions', 'On-Call Services', 'Shutdown Execution'] },
            { title: 'Designing',    items: ['Mechanical Design', 'Engineering Consultation', 'Technical Docs', 'CAD Drafting'] },
            { title: 'Protection',   items: ['Industrial Painting', 'Thermal Insulation', 'Roof Sheeting', 'Surface Prep'] },
          ].map((service, i) => (
            <GlowCard key={i} className="horizontal-card" glowColor="rgba(255, 75, 0, 0.15)">
              <h4>{service.title}</h4>
              <ul>
                {service.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* ── ABOUT CLIP WIPE IMAGE (Idea #8) ── */}
      {/* Replace src with: /images/site-work.jpg */}
      <section className="clip-section">
        <div className="container clip-two-col">
          <div className="clip-text">
            <div className="section-label">
              <StaggeredText text="ON THE GROUND" />
            </div>
            <h2>Precision Work.<br />Every Single Site.</h2>
            <p>
              Our teams operate across Gujarat's industrial belt, delivering mechanically sound and
              schedule-adherent results from day one to final commissioning.
            </p>
            <MagneticButton strength={0.25}>
              <TransitionLink to="/clients" className="btn-magnetic">See Our Clients</TransitionLink>
            </MagneticButton>
          </div>
          <ClipReveal src={null} alt="Site Work Photo" className="clip-image-col" />
        </div>
      </section>

      {/* ── SVG TIMELINE (Idea #18) ── */}
      <section className="timeline-section bg-secondary">
        <div className="container">
          <SVGTimeline />
        </div>
      </section>

      {/* ── CTA MARQUEE ── */}
      <section className="cta-marquee-section">
        <div className="marquee-wrapper">
          <div className="marquee-content" ref={marqueeRef}>
            <span>READY TO START YOUR PROJECT? — LET'S TALK — </span>
            <span>READY TO START YOUR PROJECT? — LET'S TALK — </span>
            <span>READY TO START YOUR PROJECT? — LET'S TALK — </span>
          </div>
        </div>
        <div className="cta-button-container">
          <MagneticButton strength={0.2}>
            <TransitionLink to="/contact" className="magnetic-circle-btn">
              <span>GET A<br />QUOTE</span>
            </TransitionLink>
          </MagneticButton>
        </div>
      </section>

    </div>
  );
}
