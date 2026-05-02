import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Layout components
import Hero3D from "../components/Hero/Hero";
import ReverseGravitySection from "../components/ReverseGravitySection/ReverseGravitySection";
import GlowCard from "../components/GlowCard/GlowCard";
import MagneticButton from "../components/MagneticButton/MagneticButton";
import StaggeredText from "../components/InteractiveText/StaggeredText";
import TransitionLink from "../components/PageTransition/TransitionLink";

// Image & SVG animation components
import SVGCircuitDraw from "../components/SVGDraw/SVGCircuitDraw";
import CurtainReveal from "../components/CurtainReveal/CurtainReveal";
import ClipReveal from "../components/ClipReveal/ClipReveal";
import CounterStat from "../components/CounterStat/CounterStat";
import StaggeredImageGrid from "../components/StaggeredGrid/StaggeredImageGrid";
import SVGTimeline from "../components/SVGTimeline/SVGTimeline";
import SVGIconBurst from "../components/SVGIconBurst/SVGIconBurst";
import ScrollVelocityDistort from "../components/ScrollVelocityDistort/ScrollVelocityDistort";

import "../styles/Home.css";

gsap.registerPlugin(ScrollTrigger);

// Placeholder image data â€” replace src values with real photos
const projectPhotos = [
  {
    src: "/images/project-1.png",
    alt: "Pipeline Installation Project",
    label: "Pipeline Installation",
  },
  { src: "/images/project-2.png", alt: "Plant Maintenance Work", label: "Plant Maintenance" },
  { src: "/images/project-3.png", alt: "Mechanical Erection", label: "Mechanical Erection" },
  { src: "/images/project-4.png", alt: "Solar Power Project", label: "Solar Project" },
  { src: "/images/project-5.png", alt: "Structural Fabrication", label: "Structural Fabrication" },
  {
    src: "/images/project-6.png",
    alt: "Painting & Insulation Work",
    label: "Painting & Insulation",
  },
];

export default function Home() {
  const marqueeRef = useRef(null);
  const servicesWrapperRef = useRef(null);
  const servicesViewportRef = useRef(null);
  const servicesContainerRef = useRef(null);
  const aboutTextRef = useRef(null);

  useEffect(() => {
    // â”€â”€ Word-reveal scrub â”€â”€
    if (aboutTextRef.current) {
      const words = aboutTextRef.current.querySelectorAll(".word");
      gsap.fromTo(
        words,
        { opacity: 0.18, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-immersive",
            start: "top 92%",
            toggleActions: "play none none none",
          },
        },
      );
    }

    // â”€â”€ Horizontal scroll services â”€â”€
    if (servicesContainerRef.current && servicesWrapperRef.current && servicesViewportRef.current) {
      const getTotalWidth = () =>
        Math.max(
          0,
          servicesContainerRef.current.scrollWidth - servicesViewportRef.current.clientWidth
        );

      const totalWidth = getTotalWidth();
      if (window.innerWidth > 1024 && totalWidth > 0) {
        gsap.to(servicesContainerRef.current, {
          x: () => -getTotalWidth(),
          ease: "none",
          scrollTrigger: {
            trigger: servicesWrapperRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getTotalWidth()}`,
            invalidateOnRefresh: true,
          },
        });
      }
    }

    // â”€â”€ Infinite marquee â”€â”€
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="home-page page-transition-root">
      {/* â”€â”€ GLOBAL SVG BACKGROUND â”€â”€ */}
      <div className="global-bg-circuit">
        <SVGCircuitDraw />
      </div>

      {/* â”€â”€ HERO (3D Scene) â”€â”€ */}
      <Hero3D />

      {/* â”€â”€ WHO WE ARE â€” text + curtain image (Ideas #4 + word scrub) â”€â”€ */}
      <section className="about-immersive">
        <div className="container">
          <ReverseGravitySection
            start="top 96%"
            y={70}
            duration={1}
            stagger={0.1}
            toggleActions="play none none none"
          >
            <div className="about-two-col">
              {/* Left: text content */}
              <div className="about-text-col">
                <div className="section-label">
                  <StaggeredText text="WHO WE ARE" />
                </div>
                <h2 className="about-massive-text hover-animate-heading" ref={aboutTextRef}>
                  {"Engineering Professionals Committed to Excellence"
                    .split(" ")
                    .map((word, i) => (
                      <span key={i} className="word-wrap">
                        <span className="word">{word}&nbsp;</span>
                      </span>
                    ))}
                </h2>
                <div className="about-details">
                  <p>
                    Shiv Krishna Engineers is an emerging contracting firm based
                    in Bharuch, Gujarat. We bring proven expertise to every
                    engagement across pharmaceuticals, petrochemicals, and power
                    sectors.
                  </p>
                  <MagneticButton strength={0.3}>
                    <TransitionLink to="/about" className="btn-magnetic">
                      Discover Our Story
                    </TransitionLink>
                  </MagneticButton>
                </div>
              </div>

              {/* Right: Core Pillars Grid (Replacing the photo) */}
              <div className="about-pillars-grid">
                {[
                  {
                    title: "Precision",
                    desc: "Millimeter-perfect execution in every mechanical assembly.",
                  },
                  {
                    title: "Safety",
                    desc: "Zero-compromise safety protocols for every site operative.",
                  },
                  {
                    title: "Timeline",
                    desc: "Strict adherence to project schedules and shutdown windows.",
                  },
                  {
                    title: "Expertise",
                    desc: "Proven track record across pharma, power, and chemical sectors.",
                  },
                ].map((pillar, i) => (
                  <div key={i} className="pillar-item">
                    <div className="pillar-num">0{i + 1}</div>
                    <h4>{pillar.title}</h4>
                    <p>{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ReverseGravitySection>
        </div>
      </section>

      {/* â”€â”€ STATS WITH SVG RINGS (Idea #9) â”€â”€ */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <CounterStat value={200} label="Skilled Workforce" suffix="+" />
            <CounterStat value={6} label="Years Experience" suffix="+" />
            <CounterStat value={50} label="Projects Completed" suffix="+" />
            <CounterStat value={12} label="Industry Sectors" suffix="" />
          </div>
        </div>
      </section>

      {/* â”€â”€ CORE DIVISIONS â€” SVG icon burst cards (Ideas #20 + GlowCard) â”€â”€ */}
      <section className="divisions-section">
        <div className="container">
          <div className="section-label">
            <StaggeredText text="OUR CORE DIVISIONS" />
          </div>

          <ScrollVelocityDistort maxSkew={3}>
            <div className="divisions-grid">
              {[
                {
                  id: "1",
                  num: "01",
                  icon: "projects",
                  title: "Mechanical Project Division",
                  desc: "End-to-end project delivery â€” planning, procurement, site execution and handover with a dedicated team of execution engineers.",
                },
                {
                  id: "2",
                  num: "02",
                  icon: "maintenance",
                  title: "Mechanical Maintenance Division",
                  desc: "Preventing unplanned downtime with preventive programs, predictive strategies, and rapid-response shutdown services.",
                },
                {
                  id: "3",
                  num: "03",
                  icon: "design",
                  title: "Designing & Consulting Division",
                  desc: "Technical backbone for complex projects â€” from initial concept drawings to final as-built documentation.",
                },
                {
                  id: "4",
                  num: "04",
                  icon: "protection",
                  title: "Painting & Insulation",
                  desc: "Surface protection and thermal management critical to long-term asset integrity â€” painting, insulation, roof sheeting.",
                },
              ].map((d) => (
                <GlowCard
                  key={d.id}
                  className="division-card"
                  glowColor="rgba(255, 75, 0, 0.1)"
                >
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

      {/* â”€â”€ PROJECT PHOTO GRID â€” staggered cascade entrance (Idea #10) â”€â”€ */}
      {/* Replace null srcs with: /images/project-1.jpg â€¦ project-6.jpg */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="section-label">
            <StaggeredText text="OUR WORK" />
          </div>
          <h2 className="section-heading hover-animate-heading">
            Projects That
            <br />
            Speak for Themselves.
          </h2>
          <StaggeredImageGrid items={projectPhotos} />
          <div className="grid-cta">
            <MagneticButton strength={0.25}>
              <TransitionLink to="/services" className="btn-magnetic">
                View All Services
              </TransitionLink>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* â”€â”€ HORIZONTAL SCROLL SERVICES â”€â”€ */}
      <section className="services-horizontal-wrapper" ref={servicesWrapperRef}>
        <div className="services-horizontal-shell">
          <div className="service-intro-panel">
            <div className="section-label">
              <StaggeredText text="WHAT WE DO" />
            </div>
            <h2 className="services-intro-heading">
              Comprehensive
              <br />
              Industrial Solutions
            </h2>
            <p>Scroll to explore our specialized services.</p>
          </div>

          <div className="services-horizontal-viewport" ref={servicesViewportRef}>
            <div
              className="services-horizontal-container"
              ref={servicesContainerRef}
            >
              {[
                {
                  title: "Projects",
                  items: [
                    "Project Management",
                    "Erection & Commissioning",
                    "Material Supply",
                    "Manpower Supply",
                  ],
                },
                {
                  title: "Maintenance",
                  items: [
                    "Preventive Maintenance",
                    "Predictive Solutions",
                    "On-Call Services",
                    "Shutdown Execution",
                  ],
                },
                {
                  title: "Designing",
                  items: [
                    "Mechanical Design",
                    "Engineering Consultation",
                    "Technical Docs",
                    "CAD Drafting",
                  ],
                },
                {
                  title: "Protection",
                  items: [
                    "Industrial Painting",
                    "Thermal Insulation",
                    "Roof Sheeting",
                    "Surface Prep",
                  ],
                },
              ].map((service, i) => (
                <GlowCard
                  key={i}
                  className="horizontal-card"
                  glowColor="rgba(255, 75, 0, 0.15)"
                >
                  <h4>{service.title}</h4>
                  <ul>
                    {service.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </GlowCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ ABOUT CLIP WIPE IMAGE (Idea #8) â”€â”€ */}
      {/* Replace src with: /images/site-work.jpg */}
      <section className="clip-section">
        <div className="container clip-two-col">
          <div className="clip-text">
            <div className="section-label">
              <StaggeredText text="ON THE GROUND" />
            </div>
            <h2 className="hover-animate-heading">
              Precision Work.
              <br />
              Every Single Site.
            </h2>
            <p>
              Our teams operate across Gujarat's industrial belt, delivering
              mechanically sound and schedule-adherent results from day one to
              final commissioning.
            </p>
            <MagneticButton strength={0.25}>
              <TransitionLink to="/clients" className="btn-magnetic">
                See Our Clients
              </TransitionLink>
            </MagneticButton>
          </div>
          <ClipReveal
            src={null}
            alt="Site Work Photo"
            className="clip-image-col"
          />
        </div>
      </section>

      {/* â”€â”€ SVG TIMELINE (Idea #18) â”€â”€ */}
      <section className="timeline-section">
        <div className="container">
          <SVGTimeline />
        </div>
      </section>

      {/* â”€â”€ GRAND CTA SECTION â”€â”€ */}
      <section className="liquid-cta-section">
        <div className="liquid-cta-container">
          
          <div className="liquid-cta-content">
            <h2 className="liquid-cta-heading hover-animate-heading">
              Ready to <br/><span className="liquid-italic">Elevate</span> Your Operations?
            </h2>
            <p className="liquid-cta-desc">
              Partner with us for millimeter-perfect execution, zero-compromise safety, and stringent timeline adherence.
            </p>
          </div>

          <div className="liquid-action-area">
             <div className="liquid-btn-wrapper">
               <TransitionLink to="/contact" className="liquid-btn">
                 <div className="liquid-btn-bg"></div>
                 <div className="liquid-btn-text">
                   <span className="eyebrow">START HERE</span>
                   <span className="title">GET A QUOTE</span>
                 </div>
                 <div className="liquid-btn-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                 </div>
               </TransitionLink>
             </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}

