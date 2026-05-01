import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './SVGIconBurst.css';

/**
 * SVGIconBurst — SVG icon paths collapse to center, then burst outward on scroll-enter (Idea #20)
 * Props: icon (string: 'projects'|'maintenance'|'design'|'protection'), label (string)
 */
const icons = {
  projects: {
    paths: [
      'M30 10 L50 10 L50 30 L30 30 Z',   // box
      'M10 30 L30 30 L30 50 L10 50 Z',   // box2
      'M50 30 L70 30 L70 50 L50 50 Z',   // box3
      'M30 50 L50 50 L50 70 L30 70 Z',   // box4
    ],
    viewBox: '0 0 80 80'
  },
  maintenance: {
    paths: [
      'M40 5 L40 30',
      'M40 50 L40 75',
      'M5 40 L30 40',
      'M50 40 L75 40',
      'M15 15 L30 30',
      'M50 50 L65 65',
      'M65 15 L50 30',
      'M30 50 L15 65',
    ],
    viewBox: '0 0 80 80'
  },
  design: {
    paths: [
      'M10 70 L40 10 L70 70 Z',
      'M25 50 L55 50',
    ],
    viewBox: '0 0 80 80'
  },
  protection: {
    paths: [
      'M40 5 L70 20 L70 45 C70 60 55 72 40 75 C25 72 10 60 10 45 L10 20 Z',
    ],
    viewBox: '0 0 80 80'
  }
};

export default function SVGIconBurst({ icon = 'projects', label = '', color = 'var(--accent)' }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.burst-path');
    if (!paths || paths.length === 0) return;

    // Start all paths collapsed at center
    gsap.set(paths, {
      transformOrigin: '40px 40px',
      scale: 0,
      opacity: 0
    });

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.to(paths, {
          scale: 1,
          opacity: 1,
          stagger: 0.06,
          ease: 'back.out(2.5)',
          duration: 0.5
        });
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (svgRef.current) observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, [icon]);

  const def = icons[icon] || icons.projects;

  return (
    <div className="svg-icon-burst">
      <svg
        ref={svgRef}
        className="burst-svg"
        viewBox={def.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={label}
      >
        {def.paths.map((d, i) => (
          <path
            key={i}
            className="burst-path"
            d={d}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))}
      </svg>
      {label && <span className="burst-label">{label}</span>}
    </div>
  );
}
