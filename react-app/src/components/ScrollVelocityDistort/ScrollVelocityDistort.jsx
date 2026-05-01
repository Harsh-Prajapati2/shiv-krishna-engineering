import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollVelocityDistort — wraps children and applies skewY distortion
 * proportional to scroll velocity (Idea #19 — signature Lenis + GSAP effect)
 */
export default function ScrollVelocityDistort({ children, maxSkew = 6 }) {
  const wrapperRef = useRef(null);
  const skewRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let velocity = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      velocity = currentY - lastScrollY;
      lastScrollY = currentY;

      // Clamp to maxSkew
      const skew = Math.max(-maxSkew, Math.min(maxSkew, velocity * 0.3));

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        // Spring-damp back to 0
        skewRef.current += (skew - skewRef.current) * 0.12;

        if (wrapperRef.current) {
          wrapperRef.current.style.transform = `skewY(${skewRef.current}deg)`;
          wrapperRef.current.style.willChange = 'transform';
        }

        // When velocity dies, spring back
        if (Math.abs(velocity) < 0.1) {
          skewRef.current *= 0.85;
          if (wrapperRef.current) {
            wrapperRef.current.style.transform = `skewY(${skewRef.current}deg)`;
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [maxSkew]);

  return (
    <div ref={wrapperRef} style={{ transition: 'transform 0.1s linear' }}>
      {children}
    </div>
  );
}
