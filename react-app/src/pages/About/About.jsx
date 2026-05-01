import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="about-page">
      <div className="about-container">
        
        {/* Header Section */}
        <header className="about-header">
          <h1 className="section-title">About Us</h1>
          <div className="divider"></div>
          <p className="section-lead">
            We are pioneers in modern engineering solutions, merging mechanical precision with cutting-edge digital experiences.
          </p>
        </header>

        {/* Content Grid */}
        <div className="about-content-grid">
          
          <div className="about-text-block">
            <h2>Our Legacy</h2>
            <p>
              Founded on the principles of absolute precision, our firm has evolved from traditional manufacturing to a fully integrated digital-first engineering powerhouse. We believe that every component, no matter how small, plays a critical role in the larger machine.
            </p>
            <p>
              Our new digital presence reflects our core philosophy: seamless interaction, robust architecture, and beautiful execution.
            </p>
          </div>

          <div className="about-image-wrapper">
            {/* Semantic HTML structure using standard classes */}
            <div className="image-placeholder">
              <span>Engineering Excellence</span>
            </div>
          </div>

        </div>

        {/* Stats Section */}
        <div className="about-stats">
          <div className="stat-card">
            <span className="stat-number">15+</span>
            <span className="stat-label">Years of Innovation</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">200</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>

      </div>
    </section>
  );
}
