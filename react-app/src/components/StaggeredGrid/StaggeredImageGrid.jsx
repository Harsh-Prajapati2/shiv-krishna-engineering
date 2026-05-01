import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './StaggeredGrid.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * StaggeredImageGrid — Grid of photos/placeholders that cascade-wave in on scroll (Idea #10)
 * Props: items = [{ src, alt, label }]
 */
export default function StaggeredImageGrid({ items = [] }) {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.sg-card');
    if (!cards || cards.length === 0) return;

    gsap.fromTo(cards,
      { opacity: 0, y: 60, scale: 0.92 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        stagger: { amount: 0.6, grid: 'auto', from: 'start' },
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div ref={gridRef} className="staggered-grid">
      {items.map((item, i) => (
        <div key={i} className="sg-card">
          {item.src ? (
            <img src={item.src} alt={item.alt} loading="lazy" className="sg-image" />
          ) : (
            <div className="sg-placeholder" aria-label={item.alt}>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <rect x="4" y="4" width="40" height="40" rx="4" stroke="var(--text-muted)" strokeWidth="1.5" strokeDasharray="5 3"/>
                <path d="M10 34L18 22L24 28L30 21L38 34" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="17" cy="15" r="4" stroke="var(--text-muted)" strokeWidth="1.5"/>
              </svg>
              <span>{item.alt || `Image ${i + 1}`}</span>
            </div>
          )}
          {item.label && (
            <div className="sg-label">{item.label}</div>
          )}
        </div>
      ))}
    </div>
  );
}
