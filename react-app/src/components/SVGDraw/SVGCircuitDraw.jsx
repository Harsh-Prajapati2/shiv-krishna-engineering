import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SVGCircuitDraw({ className = "" }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.draw-path');
    if (!paths || paths.length === 0) return;

    paths.forEach(path => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap.to(svgRef.current.querySelectorAll('.draw-path'), {
      strokeDashoffset: 0,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: {
        trigger: svgRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 2,
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`svg-circuit-draw ${className}`}
      viewBox="0 0 800 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Industrial circuit / pipe network paths */}
      <path className="draw-path" d="M0 100 H80 V40 H200 V100 H300" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="80" cy="100" r="6" fill="var(--accent)" opacity="0.5"/>
      <circle cx="200" cy="40" r="6" fill="var(--accent)" opacity="0.5"/>

      <path className="draw-path" d="M300 100 H400 V160 H520 V100 H620" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="400" cy="160" r="6" fill="var(--accent)" opacity="0.5"/>
      <circle cx="520" cy="100" r="6" fill="var(--accent)" opacity="0.5"/>

      <path className="draw-path" d="M620 100 H700 V50 H800" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="700" cy="50" r="6" fill="var(--accent)" opacity="0.5"/>

      {/* Secondary trace lines */}
      <path className="draw-path" d="M0 140 H60 V170 H160" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round"/>
      <path className="draw-path" d="M640 50 V180 H800" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" strokeLinecap="round"/>

      {/* Node dots */}
      <circle cx="300" cy="100" r="8" stroke="var(--accent)" strokeWidth="2" fill="none"/>
      <circle cx="620" cy="100" r="8" stroke="var(--accent)" strokeWidth="2" fill="none"/>
    </svg>
  );
}
