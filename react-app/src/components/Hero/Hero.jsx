import React, { useRef, useEffect } from 'react';
import TransitionLink from '../PageTransition/TransitionLink';
import './Hero.css';

const ParticleBurstHeading = ({ children }) => {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    createBurst(e.clientX, e.clientY);
  };

  const handleMouseEnter = (e) => {
    if (!containerRef.current) return;
    createBurst(e.clientX, e.clientY);
  };

  const createBurst = (x, y) => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const relativeX = x - rect.left;
    const relativeY = y - rect.top;

    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 50 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;
      const size = Math.random() * 6 + 2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${relativeX}px`;
      particle.style.top = `${relativeY}px`;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (container.contains(particle)) {
          particle.remove();
        }
      }, 800);
    }
  };

  return (
    <div 
      className="particle-heading-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
    >
      <h1 className="hero-title">{children}</h1>
    </div>
  );
};

const Hero = () => {
  const bgRef = useRef(null);

  useEffect(() => {
    if (!bgRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    // small delay so the image has a moment to load
    const id = setTimeout(() => {
      bgRef.current.classList.add('animate');
    }, 80);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="hero-section light-theme">
      <div
        ref={bgRef}
        className="hero-bg"
        style={{
          backgroundImage: `url('/images/hero-background.webp')`,
          opacity: 0.95,
        }}
      />
      <div className="hero-content-wrapper">
        <div className="hero-text-block fade-in-up delay-1">
          <ParticleBurstHeading>Industrial Solutions</ParticleBurstHeading>
          <p className="hero-subtitle fade-in-up delay-2">
            Precision-led mechanical execution across projects, maintenance, and commissioning for industrial plants.
          </p>
          <div className="hero-actions fade-in-up delay-3">
            <TransitionLink to="/services" className="btn-primary">EXPLORE SERVICES</TransitionLink>
            <TransitionLink to="/contact" className="btn-secondary">GET A QUOTE</TransitionLink>
          </div>
        </div>

        <div className="hero-visual-grid fade-in-up delay-4">
          <div className="visual-card image-card-1">
            <img
              src="/images/project-1.webp"
              alt="Precision Mechanical Engineering"
            />
          </div>
          <div className="visual-card image-card-2">
            <img
              src="/images/project-2.webp"
              alt="Industrial Pipeline Assembly"
            />
          </div>
          <div className="visual-card image-card-3">
            <img
              src="/images/project-3.webp"
              alt="Industrial Commissioning"
            />
          </div>
        </div>

        <div className="hero-bottom-ticker fade-in-up delay-5">
          <div className="ticker-track">
            <span>PRECISION SYSTEMS</span>
            <span>PIPELINE ENGINEERING</span>
            <span>MECHANICAL ASSEMBLY</span>
            <span aria-hidden="true">PRECISION SYSTEMS</span>
            <span aria-hidden="true">PIPELINE ENGINEERING</span>
            <span aria-hidden="true">MECHANICAL ASSEMBLY</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
