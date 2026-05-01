import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0, className = "" }) {
  const elRef = useRef(null);
  
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const originalText = text;
    let iteration = 0;
    
    // Initial state: hidden or randomized
    el.innerText = originalText.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
    
    // Start animation after delay
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        el.innerText = originalText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
        
        if (iteration >= originalText.length) {
          clearInterval(interval);
          el.innerText = originalText;
        }
        
        iteration += 1 / 3; // Controls speed of decode
      }, 30);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return <span ref={elRef} className={className}></span>;
}
