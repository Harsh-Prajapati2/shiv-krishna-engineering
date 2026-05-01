import React, { useRef, useState } from 'react';

export default function SkewCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Map to a degree constraint (e.g., max 15 degrees)
    const rotateX = (-y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'none' // Remove transition for smooth immediate tracking
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)' // Smooth snap back
    });
  };

  return (
    <div 
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
    >
      {children}
    </div>
  );
}
