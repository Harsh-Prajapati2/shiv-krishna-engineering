import React, { useRef, useState } from 'react';

export default function SpotlightText({ text, className = "" }) {
  const containerRef = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  };

  return (
    <span 
      ref={containerRef}
      className={`spotlight-text-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        display: 'inline-block',
        color: 'var(--text-muted)',
        cursor: 'none'
      }}
    >
      {text}
      <span 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `radial-gradient(circle at ${pos.x}% ${pos.y}%, var(--accent) 0%, transparent 40%)`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          pointerEvents: 'none',
          transition: 'background 0.1s linear'
        }}
      >
        {text}
      </span>
    </span>
  );
}
