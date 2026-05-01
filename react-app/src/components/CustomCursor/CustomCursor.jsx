import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    // Track mouse movement
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power4.out"
      });
    };

    // Track hover states on interactive elements
    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    // Attach listeners
    window.addEventListener('mousemove', onMouseMove);

    // Re-attach to links/buttons dynamically
    const updateHoverElements = () => {
      const interactives = document.querySelectorAll('a, button, .creative-card, .btn-magnetic');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    };

    updateHoverElements();
    
    // Observer to re-attach if DOM changes
    const observer = new MutationObserver(updateHoverElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
      const interactives = document.querySelectorAll('a, button, .creative-card, .btn-magnetic');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor"></div>
      <div 
        ref={followerRef} 
        className={`cursor-follower ${isHovering ? 'hover-active' : ''}`}
      ></div>
    </>
  );
}
