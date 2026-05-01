import React, { useRef, useState } from 'react';

export default function TrackingText({ text, className = "" }) {
  const textRef = useRef(null);
  const [spacing, setSpacing] = useState(0);

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Map mouse Y to letter spacing (0px to 10px)
    const newSpacing = (mouseY / rect.height) * 8;
    setSpacing(newSpacing);
  };

  const handleMouseLeave = () => {
    setSpacing(0);
  };

  return (
    <span 
      ref={textRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        letterSpacing: `${spacing}px`,
        transition: 'letter-spacing 0.2s ease-out',
        display: 'inline-block'
      }}
    >
      {text}
    </span>
  );
}
