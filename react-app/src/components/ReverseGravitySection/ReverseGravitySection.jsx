import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ReverseGravitySection({
  children,
  className = "",
  start = "top 85%",
  end = "bottom center",
  y = 200,
  duration = 1.5,
  stagger = 0.2,
  toggleActions = "play none none reverse",
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Select immediate children to animate
    const elements = section.children;

    gsap.fromTo(elements, 
      { 
        y,
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration,
        ease: "power4.out",
        stagger,
        scrollTrigger: {
          trigger: section,
          start,
          end,
          toggleActions
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if(t.trigger === section) t.kill();
      });
    };
  }, [duration, end, stagger, start, toggleActions, y]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
