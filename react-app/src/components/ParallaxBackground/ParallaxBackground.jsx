import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * ParallaxBackground — Fixed-position geometric SVG elements
 * that move at different speeds on scroll, creating depth (Idea #2 variant)
 */
export default function ParallaxBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    const items = bgRef.current?.querySelectorAll('.parallax-item');
    if (!items) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      items.forEach((item, i) => {
        const speed = (i + 1) * 0.06;
        item.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {/* Large gear — top left */}
      <svg className="parallax-item" style={{ position: 'absolute', top: '5%', left: '-4%', opacity: 0.04, width: 320, height: 320 }}
        viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="38" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="50" cy="50" r="22" stroke="var(--accent)" strokeWidth="2"/>
        {[0,45,90,135,180,225,270,315].map(deg => (
          <rect key={deg} x="47" y="4" width="6" height="12" rx="2" fill="var(--accent)"
            style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50px 50px' }}/>
        ))}
      </svg>

      {/* Small hex — top right */}
      <svg className="parallax-item" style={{ position: 'absolute', top: '8%', right: '3%', opacity: 0.05, width: 180, height: 180 }}
        viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,5 93,27 93,73 50,95 7,73 7,27" stroke="var(--accent)" strokeWidth="2"/>
        <polygon points="50,22 76,36 76,64 50,78 24,64 24,36" stroke="var(--accent)" strokeWidth="2"/>
      </svg>

      {/* Circuit-node cluster — mid left */}
      <svg className="parallax-item" style={{ position: 'absolute', top: '38%', left: '2%', opacity: 0.045, width: 220, height: 160 }}
        viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 80 H60 V30 H120 V80 H180 V130 H220" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="60" cy="80" r="6" fill="var(--accent)"/>
        <circle cx="120" cy="30" r="6" fill="var(--accent)"/>
        <circle cx="180" cy="80" r="6" fill="var(--accent)"/>
      </svg>

      {/* Large cross / plus — bottom right */}
      <svg className="parallax-item" style={{ position: 'absolute', bottom: '12%', right: '-2%', opacity: 0.04, width: 280, height: 280 }}
        viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 10 V90 M10 50 H90" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="50" cy="50" r="20" stroke="var(--accent)" strokeWidth="2"/>
      </svg>

      {/* Small gear — bottom left */}
      <svg className="parallax-item" style={{ position: 'absolute', bottom: '5%', left: '8%', opacity: 0.04, width: 160, height: 160 }}
        viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="30" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="50" cy="50" r="15" stroke="var(--accent)" strokeWidth="2"/>
        {[0,60,120,180,240,300].map(deg => (
          <rect key={deg} x="48" y="8" width="4" height="10" rx="2" fill="var(--accent)"
            style={{ transform: `rotate(${deg}deg)`, transformOrigin: '50px 50px' }}/>
        ))}
      </svg>

      {/* Triangle / structural — mid right */}
      <svg className="parallax-item" style={{ position: 'absolute', top: '55%', right: '4%', opacity: 0.04, width: 200, height: 200 }}
        viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,8 92,82 8,82" stroke="var(--accent)" strokeWidth="2"/>
        <polygon points="50,28 75,72 25,72" stroke="var(--accent)" strokeWidth="2"/>
      </svg>
    </div>
  );
}
