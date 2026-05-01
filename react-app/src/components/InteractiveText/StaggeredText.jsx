import React from 'react';
import './InteractiveText.css';

export default function StaggeredText({ text, className = "" }) {
  // Split text into words for staggered effect
  const words = text.split(' ');

  return (
    <span className={`staggered-text ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="word-wrapper">
          <span className="word-inner" style={{ transitionDelay: `${i * 0.05}s` }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}
