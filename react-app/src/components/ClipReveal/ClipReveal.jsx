import React, { useRef, useEffect } from 'react';
import './ClipReveal.css';

/**
 * ClipReveal — Left-to-right clip-path wipe that reveals an image on scroll (Idea #8)
 */
export default function ClipReveal({ src = null, alt = "", className = "" }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          wrapperRef.current?.classList.add('clip-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`clip-reveal-wrapper ${className}`}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="clip-placeholder" aria-label={alt}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="50" height="50" rx="4" stroke="var(--text-muted)" strokeWidth="2" strokeDasharray="6 4"/>
            <path d="M15 35L25 22L33 31L38 26L45 35" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="22" cy="18" r="4" stroke="var(--text-muted)" strokeWidth="2"/>
          </svg>
          <span>{alt || 'Project Photo'}</span>
        </div>
      )}
    </div>
  );
}
