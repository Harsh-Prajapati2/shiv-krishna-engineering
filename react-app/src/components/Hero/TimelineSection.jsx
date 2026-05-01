import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './TimelineSection.css'; // Assuming a CSS file for styling

// Dummy data for milestones
const milestones = [
  {
    year: 2005,
    title: "Company Founded",
    description: "Shiv Krishna Engineering was established with a vision to provide top-notch mechanical engineering solutions.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" // Example SVG path for a 'start' icon
  },
  {
    year: 2008,
    title: "First Major Project",
    description: "Successfully completed our first large-scale industrial installation, marking a significant growth milestone.",
    icon: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" // Example SVG path for a 'person' icon
  },
  {
    year: 2012,
    title: "Expansion of Services",
    description: "Introduced new services including specialized maintenance contracts and equipment commissioning.",
    icon: "M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" // Example SVG path for a 'download/upload' icon
  },
  {
    year: 2018,
    title: "ISO Certification Achieved",
    description: "Awarded ISO 9001 certification, demonstrating our commitment to quality management systems.",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" // Example SVG path for a 'check' icon
  },
  {
    year: 2023,
    title: "Technological Integration",
    description: "Implemented advanced digital tools for project management and predictive maintenance.",
    icon: "M13 19h-2v-2h2v2zm2-6H9v6h6v-6zm-2-8h-2V3h2v2zm0 4h-2V7h2v2zm4-4h-2V3h2v2zm0 4h-2V7h2v2zm-4 4h-2V9h2v2zm4 0h-2V9h2v2zM7 19h-2v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm0-4H5V5h2v2zm8 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm-4 8h-2v-2h2v2z" // Example SVG path for a 'settings' icon
  },
];

const MilestoneCard = ({ year, title, description, icon, index }) => {
  const cardRef = useRef();
  const yearRef = useRef(); // Ref for the year to animate number roll-up

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%", // Start animation when top of card is 80% down the viewport
          end: "bottom 20%", // End animation when bottom of card is 20% down the viewport
          toggleActions: "play none none reverse", // Play on enter, reverse on leave back up
          // markers: true, // For debugging
        }
      }
    );

    // Number roll-up animation for the year
    const yearValue = parseInt(year, 10);
    if (!isNaN(yearValue)) {
      gsap.fromTo(yearRef.current,
        { innerText: 0 },
        {
          innerText: yearValue,
          duration: 1.5,
          ease: "power1.out",
          snap: { innerText: 1 }, // Snap to whole numbers
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }
  }, [year, index]);

  return (
    <div ref={cardRef} className="milestone-card">
      <div className="milestone-icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d={icon} />
        </svg>
      </div>
      <h3 className="milestone-year" ref={yearRef}>{year}</h3>
      <h4 className="milestone-title">{title}</h4>
      <p className="milestone-description">{description}</p>
    </div>
  );
};

export default function TimelineSection() {
  const timelineSvgRef = useRef();
  const timelinePathRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
      <div className="journey-header">
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