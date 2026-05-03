import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import './TimelineSection.css'; // Assuming a CSS file for styling
import './SVGTimeline.css'; // Assuming a CSS file for styling

gsap.registerPlugin(ScrollTrigger);
// Dummy data for milestones
const milestones = [
  {
    year: 2020,
    title: "Company Established",
    description: "Shiv Krishna Engineers was founded in Bharuch, Gujarat, by experienced mechanical engineers with over 6 years of industry expertise, focusing on project execution, erection, and commissioning services across industrial sectors.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
  },
  {
    year: 2021,
    title: "Initial Industrial Projects",
    description: "Successfully executed early-stage mechanical projects including fabrication, erection, and maintenance services for chemical and pharmaceutical industries, establishing operational credibility.",
    icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
  },
  {
    year: 2022,
    title: "Service Diversification",
    description: "Expanded operations into four major divisions: Mechanical Projects, Maintenance Services, Engineering Design & Consulting, and Painting, Insulation & Roofing, enabling end-to-end industrial solutions.",
    icon: "M19 9h-4V3H9v6H5l7 7 7-7z"
  },
  {
    year: 2023,
    title: "Major Client Acquisition",
    description: "Partnered with leading industrial clients including TechnipFMC, Kurl-on, and Expanded Polymer Systems, marking entry into large-scale industrial and petrochemical projects.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z"
  },
  {
    year: 2023,
    title: "Workforce & Infrastructure Growth",
    description: "Scaled operations with a workforce exceeding 150+ skilled professionals including engineers, supervisors, welders, riggers, and technicians, supported by advanced tools and machinery.",
    icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3z"
  },
  {
    year: 2024,
    title: "Operational Excellence & Safety Systems",
    description: "Implemented structured safety policies, EHS systems, and quality control practices ensuring compliance with industrial standards and improving project reliability.",
    icon: "M12 2l9 4v6c0 5-3.8 9.74-9 11-5.2-1.26-9-6-9-11V6l9-4z"
  },
  {
    year: 2024,
    title: "Advanced Services & AMC Contracts",
    description: "Introduced predictive maintenance, shutdown services, manpower supply, and energy optimization solutions, strengthening long-term AMC partnerships across industries.",
    icon: "M13 19h-2v-2h2v2z"
  },
  {
    year: 2025,
    title: "Renewable & Expansion Projects",
    description: "Entered renewable energy sector through solar power project collaborations and expanded presence across petrochemical, power, and infrastructure industries.",
    icon: "M12 4V2m0 20v-2m8-8h2M2 12H4m15.364-6.364l1.414-1.414M4.222 19.778l1.414-1.414"
  }
];

const MilestoneCard = ({ year, title, description, icon, index }) => {
  const cardRef = useRef();
  const yearRef = useRef(); // Ref for the year to animate number roll-up
  const isEven = index % 2 === 0;

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 981px)').matches;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 56, rotateX: 10, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    if (isDesktop) {
      gsap.to(cardRef.current, {
        y: -10,
        rotateZ: isEven ? -1.2 : 1.2,
        duration: 4.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    // Number roll-up animation for the year
    const yearValue = parseInt(year, 10);
    if (!isNaN(yearValue)) {
      gsap.fromTo(
        yearRef.current,
        { innerText: 0 },
        {
          innerText: yearValue,
          duration: 1.4,
          ease: 'power1.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
  }, [year, index]);

  return (
    <div
      ref={cardRef}
      className={`milestone-card ${isEven ? 'card-left' : 'card-right'}`}
      style={{ '--card-accent': isEven ? 'var(--color-accent)' : 'var(--color-secondary)' }}
    >
      <div className="milestone-card-glow" aria-hidden="true" />
      <div className="milestone-card-header">
        <div className="milestone-chip">Milestone {String(index + 1).padStart(2, '0')}</div>
        <div className="milestone-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d={icon} />
          </svg>
        </div>
      </div>
      <div className="milestone-year-row">
        <span className="milestone-year-label">Since</span>
        <h3 className="milestone-year" ref={yearRef}>{year}</h3>
      </div>
      <h4 className="milestone-title">{title}</h4>
      <p className="milestone-description">{description}</p>
    </div>
  );
};

export default function TimelineSection() {
  const timelineSvgRef = useRef();
  const timelinePathRef = useRef();

  useEffect(() => {
    if (timelinePathRef.current) {
      const path = timelinePathRef.current;
      const length = path.getTotalLength();

      // Clear any previous inline styles that might interfere
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(path, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: timelineSvgRef.current,
          start: "top center", // Start drawing when the top of the SVG hits the center of the viewport
          end: "bottom center", // End drawing when the bottom of the SVG leaves the center of the viewport
          scrub: true, // Link animation to scroll position
          // markers: true, // For debugging
        }
      });
    }
  }, []);

  return (
    <section className="journey-section">
      <div className="journey-orb journey-orb-one" aria-hidden="true" />
      <div className="journey-orb journey-orb-two" aria-hidden="true" />
      <div className="journey-header">
        <span className="journey-kicker">Our Progress</span>
        <h2>OUR JOURNEY</h2>
        <p>Built One Milestone at a Time.</p>
      </div>
      <div className="timeline-container">
        <svg ref={timelineSvgRef} className="timeline-svg" viewBox="0 0 100 1000" preserveAspectRatio="xMidYMin slice">
          <path
            ref={timelinePathRef}
            d="M 50 0 L 50 1000" // A simple vertical line for the timeline
            stroke="var(--color-accent)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div className="milestones-wrapper">
          {milestones.map((milestone, index) => (
            <MilestoneCard key={index} {...milestone} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
