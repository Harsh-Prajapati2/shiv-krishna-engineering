import React, { useRef, useEffect } from 'react';

export default function MagneticButton({ children, className = "", strength = 0.5 }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return undefined;

    let rafId = 0;
    let hoverProgress = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let targetHover = 0;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const applyTransform = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      hoverProgress += (targetHover - hoverProgress) * 0.14;

      const rx = clamp((-currentY * 0.35).toFixed(2), -10, 10);
      const ry = clamp((currentX * 0.35).toFixed(2), -10, 10);

      button.style.setProperty('--btn-mx', `${(currentX + 1) * 50}%`);
      button.style.setProperty('--btn-my', `${(currentY + 1) * 50}%`);
      button.style.setProperty('--btn-rx', `${rx}deg`);
      button.style.setProperty('--btn-ry', `${ry}deg`);
      button.style.setProperty('--btn-hover', hoverProgress.toFixed(3));

      button.style.transform = `translate3d(0, 0, 0) rotateX(${rx}deg) rotateY(${ry}deg) scale(${1 + hoverProgress * 0.03})`;

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01 || Math.abs(targetHover - hoverProgress) > 0.01) {
        rafId = window.requestAnimationFrame(applyTransform);
      } else {
        rafId = 0;
      }
    };

    const onMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2 || 1);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2 || 1);

      targetX = clamp(x, -1, 1) * 1;
      targetY = clamp(y, -1, 1) * 1;

      if (!rafId) {
        rafId = window.requestAnimationFrame(applyTransform);
      }
    };

    const onMouseEnter = () => {
      targetHover = Math.max(0.4, Math.min(1, strength + 0.35));
      button.dataset.hover = 'true';
      if (!rafId) {
        rafId = window.requestAnimationFrame(applyTransform);
      }
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      targetHover = 0;
      delete button.dataset.hover;

      if (!rafId) {
        rafId = window.requestAnimationFrame(applyTransform);
      }
    };

    button.addEventListener('pointerenter', onMouseEnter);
    button.addEventListener('pointermove', onMouseMove);
    button.addEventListener('mouseleave', onMouseLeave);
    button.addEventListener('pointerdown', onMouseEnter);
    button.addEventListener('pointerup', onMouseLeave);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      button.removeEventListener('pointerenter', onMouseEnter);
      button.removeEventListener('pointermove', onMouseMove);
      button.removeEventListener('mouseleave', onMouseLeave);
      button.removeEventListener('pointerdown', onMouseEnter);
      button.removeEventListener('pointerup', onMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={buttonRef}
      className={`magnetic-button-wrapper ${className}`}
      style={{
        display: 'inline-block',
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        perspective: '900px',
        '--btn-mx': '50%',
        '--btn-my': '50%',
        '--btn-hover': 0,
      }}
    >
      {children}
    </div>
  );
}
