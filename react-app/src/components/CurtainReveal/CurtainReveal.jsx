import React, { useRef, useEffect } from 'react';
import './CurtainReveal.css';

/**
 * CurtainReveal — Theater curtain that rises to expose an image (Idea #4)
 * Props: src (image path), alt (string), curtainColor (string)
 * For placeholders, src is a CSS gradient string or null (shows placeholder)
 */
export default function CurtainReveal({ src = null, alt = "", curtainColor = "var(--accent)", className = "" }) {
  const wrapperRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          curtainRef.current?.classList.add('curtain-risen');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`curtain-reveal-wrapper ${className}`}>
      {/* The actual image/placeholder */}
      <div className="curtain-image-inner">
        {src ? (
          <img src={src} alt={alt} loading="lazy" />
        ) : (
          <div className="curtain-placeholder" aria-label={alt}>
            <div className="placeholder-label">{alt || 'IMAGE PLACEHOLDER'}</div>
          </div>
        )}
      </div>
      {/* The curtain overlay */}
      <div
        ref={curtainRef}
        className="curtain-overlay"
        style={{ background: curtainColor }}
      />
    </div>
  );
}
