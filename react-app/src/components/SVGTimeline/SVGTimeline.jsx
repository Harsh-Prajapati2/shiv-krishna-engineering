import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './SVGTimeline.css';

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '2018', title: 'Founded', desc: 'Shiv Krishna Engineers established in Bharuch, Gujarat.' },
  { year: '2019', title: 'First Major Contract', desc: 'Secured our first major pharmaceutical plant maintenance contract.' },
  { year: '2020', title: '100+ Workforce', desc: 'Grew our skilled workforce to over 100 professionals.' },
  { year: '2022', title: 'Solar Projects', desc: 'Entered strategic solar power project execution partnerships.' },
  { year: '2024', title: '200+ Strong', desc: '200+ workforce, multi-sector presence across Gujarat\'s industrial belt.' },
];

export default function SVGTimeline() {
  const svgRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const line = svgRef.current?.querySelector('.timeline-line');
    if (!line) return;

    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

    const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
    if (nodes) gsap.set(nodes, { scale: 0, opacity: 0 });

    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: 'top 70%',
      end: 'bottom 30%',
      scrub: 2,
      onUpdate: (self) => {
        const p = self.progress;
        gsap.to(line, { strokeDashoffset: length * (1 - p), duration: 0.1, ease: 'none' });
        nodes?.forEach((node, i) => {
          const threshold = (i + 1) / (milestones.length + 1);
          if (p >= threshold) {
            gsap.to(node, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)' });
          }
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={timelineRef} className="svg-timeline-section">
      <div className="timeline-header">
        <div className="section-label">OUR JOURNEY</div>
        <h2>Built One Milestone<br/>at a Time.</h2>
      </div>

      <div className="timeline-track">
        {/* SVG connecting line */}
        <svg ref={svgRef} className="timeline-svg" preserveAspectRatio="none" viewBox="0 0 4 400" fill="none">
          <path
            className="timeline-line"
            d="M2 0 L2 400"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {milestones.map((m, i) => (
          <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
            <div className="timeline-node" />
            <div className="timeline-card">
              <div className="timeline-year">{m.year}</div>
              <h4>{m.title}</h4>
              <p>{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
