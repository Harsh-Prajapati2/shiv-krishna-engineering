import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const positionRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const hoverRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const interactiveSelectors = [
      'a',
      'button',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      '.btn-magnetic',
      '.btn-primary',
      '.btn-secondary',
      '.magnetic-circle-btn',
      '.division-card',
      '.sg-card',
      '.horizontal-card',
      '.creative-card',
      '.pillar-item',
      '.card-inner',
    ].join(', ');

    const updateCursor = () => {
      const current = positionRef.current;
      const target = mouseRef.current;

      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;

      const dx = target.x - current.x;
      const dy = target.y - current.y;
      const drift = Math.abs(dx) + Math.abs(dy);
      const rotation = hoverRef.current ? Math.max(-18, Math.min(18, dx * 0.08)) : Math.max(-8, Math.min(8, dx * 0.04));
      const scale = hoverRef.current ? 1.18 : 1;
      const opacity = drift < 1 ? 0.92 : 1;

      cursor.style.setProperty('--cursor-x', `${current.x}px`);
      cursor.style.setProperty('--cursor-y', `${current.y}px`);
      cursor.style.setProperty('--cursor-rotation', `${rotation}deg`);
      cursor.style.setProperty('--cursor-scale', `${scale}`);
      cursor.style.setProperty('--cursor-opacity', `${opacity}`);

      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handlePointerMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };

      const target = event.target instanceof Element ? event.target : null;
      hoverRef.current = Boolean(target && target.closest(interactiveSelectors));
      cursor.dataset.hover = hoverRef.current ? 'true' : 'false';
    };

    const handlePointerDown = () => {
      cursor.dataset.pressed = 'true';
    };

    const handlePointerUp = () => {
      cursor.dataset.pressed = 'false';
    };

    const handleWindowLeave = () => {
      cursor.dataset.active = 'false';
    };

    const handleWindowEnter = () => {
      cursor.dataset.active = 'true';
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('blur', handleWindowLeave);
    window.addEventListener('focus', handleWindowEnter);
    document.addEventListener('mouseleave', handleWindowLeave);
    document.addEventListener('mouseenter', handleWindowEnter);

    updateCursor();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('blur', handleWindowLeave);
      window.removeEventListener('focus', handleWindowEnter);
      document.removeEventListener('mouseleave', handleWindowLeave);
      document.removeEventListener('mouseenter', handleWindowEnter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div ref={cursorRef} className="gear-cursor" data-active="true" data-hover="false" data-pressed="false" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="gear-cursor-icon" role="presentation" focusable="false">
        <path d="M19.14 12.94a7.26 7.26 0 0 0 .05-.94 7.26 7.26 0 0 0-.05-.94l1.86-1.45a.46.46 0 0 0 .11-.58l-1.76-3.06a.46.46 0 0 0-.56-.2l-2.19.88a7.06 7.06 0 0 0-1.63-.94l-.33-2.32A.45.45 0 0 0 14.23 3h-3.52a.45.45 0 0 0-.45.37l-.33 2.32a7.06 7.06 0 0 0-1.63.94l-2.19-.88a.46.46 0 0 0-.56.2L3.79 9a.46.46 0 0 0 .11.58l1.86 1.45a7.26 7.26 0 0 0 0 1.88L3.9 14.36a.46.46 0 0 0-.11.58l1.76 3.06c.12.21.37.29.56.2l2.19-.88c.5.39 1.04.7 1.63.94l.33 2.32c.04.23.23.37.45.37h3.52c.22 0 .41-.14.45-.37l.33-2.32c.59-.24 1.13-.55 1.63-.94l2.19.88c.19.09.44.01.56-.2l1.76-3.06a.46.46 0 0 0-.11-.58zm-7.14 2.56A3.5 3.5 0 1 1 15.5 12a3.5 3.5 0 0 1-3.5 3.5z" fill="currentColor" />
      </svg>
    </div>
  );
}
