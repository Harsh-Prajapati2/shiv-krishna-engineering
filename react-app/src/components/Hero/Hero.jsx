import React from 'react';
import Scene from './Scene';
import ScrambleText from '../ScrambleText/ScrambleText';
import TrackingText from '../InteractiveText/TrackingText';
// import TimelineSection from '../TimelineSection/TimelineSection'; // New import
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-sticky-container">
        
        {/* Background 3D Canvas */}
        <div className="hero-3d-background">
          <Scene />
        </div>

        {/* Foreground Content */}
        <div className="hero-content">
          <div className="hero-eyebrow-container">
            <div className="eyebrow-line"></div>
            <span className="hero-eyebrow">MECHANICAL ENGINEERING CONTRACTORS — BHARUCH, GUJARAT</span>
          </div>
          
          <h1 className="hero-title">
            <span className="line"><ScrambleText text="PRECISION" delay={200} /></span>
            <span className="line text-outline"><ScrambleText text="ENGINEERING" delay={600} /></span>
            <span className="line text-accent"><ScrambleText text="FOR INDUSTRY." delay={1000} /></span>
          </h1>

          <p className="hero-subtitle">
            <TrackingText text="Supply · Erection · Commissioning · Maintenance" />
          </p>

          <div className="hero-cta">
            <button className="primary-btn">EXPLORE SERVICES</button>
            <button className="secondary-btn">GET A QUOTE</button>
          </div>
        </div>

      </div>
    </section>
  );
}
