import React, { useRef, useEffect, useState } from 'react';
import './CounterStat.css';

/**
 * CounterStat — Animated count-up number with SVG progress ring (Idea #9)
 * Props: value (number), label (string), suffix (string)
 */
export default function CounterStat({ value, label, suffix = "+", color = "var(--accent)" }) {
  const statRef = useRef(null);
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const duration = 1800;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setDisplayed(value);
              clearInterval(timer);
            } else {
              setDisplayed(start);
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (statRef.current) observer.observe(statRef.current);
    return () => observer.disconnect();
  }, [value, started]);

  // SVG ring parameters
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = started ? (displayed / value) * circumference : 0;

  return (
    <div ref={statRef} className="counter-stat" aria-label={`${value}${suffix} ${label}`}>
      <div className="counter-ring-wrapper">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Background ring */}
          <circle cx="60" cy="60" r={radius} fill="none" stroke="var(--border-light)" strokeWidth="4"/>
          {/* Progress ring */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            style={{ transition: 'stroke-dashoffset 0.05s linear', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
          />
        </svg>
        <div className="counter-number-overlay">
          <span className="counter-value">{displayed}{suffix}</span>
        </div>
      </div>
      <span className="counter-label">{label}</span>
    </div>
  );
}
