import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import './InteractiveText.css';

export default function MagneticLink({ to, children, className = "" }) {
  const linkRef = useRef(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const onMouseMove = (e) => {
      const rect = link.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;

      gsap.to(link, {
        x: x,
        y: y,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onMouseLeave = () => {
      gsap.to(link, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    };

    link.addEventListener('mousemove', onMouseMove);
    link.addEventListener('mouseleave', onMouseLeave);

    return () => {
      link.removeEventListener('mousemove', onMouseMove);
      link.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <Link 
      ref={linkRef} 
      to={to} 
      className={`magnetic-link-container ${className}`}
    >
      {children}
      <span className="draw-underline"></span>
    </Link>
  );
}
