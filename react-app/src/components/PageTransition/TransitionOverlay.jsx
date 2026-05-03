import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import './PageTransition.css';

const STRIP_COUNT = 12;
const PANEL_COUNT = 5;

// Inline gear SVG path generator
function GearShape({ r = 60, teeth = 10, color = '#FF4B00' }) {
  const inner = r * 0.55;
  const tooth = r * 0.25;
  const step = (2 * Math.PI) / teeth;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a1 = i * step - step * 0.25;
    const a2 = i * step + step * 0.25;
    const ro = r + tooth;
    if (i === 0) d += `M ${r + r * Math.cos(a1 - 0.05)} ${r + r * Math.sin(a1 - 0.05)} `;
    d += `L ${r + ro * Math.cos(a1)} ${r + ro * Math.sin(a1)} `;
    d += `L ${r + ro * Math.cos(a2)} ${r + ro * Math.sin(a2)} `;
    d += `L ${r + r * Math.cos(a2 + 0.05)} ${r + r * Math.sin(a2 + 0.05)} `;
  }
  d += 'Z';
  return (
    <svg width={r * 2} height={r * 2} viewBox={`0 0 ${r * 2} ${r * 2}`} style={{ overflow: 'visible' }}>
      <path d={d} fill={color} />
      <circle cx={r} cy={r} r={inner} fill="#080808" />
      <circle cx={r} cy={r} r={inner * 0.28} fill={color} />
    </svg>
  );
}

const TransitionOverlay = forwardRef(function TransitionOverlay(_, ref) {
  const rootRef    = useRef(null);
  const shutterRef = useRef(null);
  const crossRef   = useRef(null);
  const counterRef = useRef(null);
  const panelsRef  = useRef(null);
  const gearRef    = useRef(null);

  const overlays = {
    'shutter-blinds': shutterRef,
    'crosshair-lock': crossRef,
    'counter-wipe':   counterRef,
    'riveted-panels': panelsRef,
    'gear-curtain':   gearRef,
  };

  const getRouteImage = (route) => {
    const cleanRoute = (route || '/').split('?')[0].replace(/\/+$/, '') || '/';
    switch(cleanRoute) {
      case '/': return '/images/hero-background.png';
      case '/about': return '/images/project-2.webp';
      case '/services': return '/images/project-1.webp';
      case '/contact': return '/images/project-6.webp';
      case '/clients': return '/images/project-3.webp';
      case '/industries': return '/images/project-4.webp';
      case '/strength': return '/images/project-5.webp';
      default: return '/images/hero-background.png';
    }
  };

  const show = (type, to) => {
    const routeImg = getRouteImage(to);
    rootRef.current.style.setProperty('--pt-bg-image', `url(${routeImg})`);

    gsap.set(rootRef.current, { display: 'block' });
    Object.keys(overlays).forEach(k => {
      gsap.set(overlays[k].current, { display: k === type ? 'flex' : 'none' });
    });
  };

  const hide = () => {
    gsap.set(rootRef.current, { display: 'none' });
  };

  useImperativeHandle(ref, () => ({
    playIn: (type, to) => new Promise(resolve => {
      show(type, to);
      const el = overlays[type]?.current;
      if (!el) { resolve(); return; }

      if (type === 'shutter-blinds') {
        const strips = el.querySelectorAll('.shutter-strip');
        gsap.fromTo(strips,
          { rotateY: 90 },
          { rotateY: 0, stagger: { each: 0.04 }, ease: 'power2.inOut', duration: 0.38, onComplete: resolve }
        );
      } else if (type === 'crosshair-lock') {
        const hLine = el.querySelector('.ch-h');
        const vLine = el.querySelector('.ch-v');
        const bg = el.querySelector('.ch-bg');
        gsap.set([hLine, vLine, bg], { opacity: 0 });
        gsap.timeline({ onComplete: resolve })
          .to(hLine, { opacity: 1, scaleX: 1, duration: 0.3, ease: 'power3.in' })
          .to(vLine, { opacity: 1, scaleY: 1, duration: 0.3, ease: 'power3.in' }, '<0.05')
          .to(bg,    { opacity: 1, duration: 0.25 });
      } else if (type === 'counter-wipe') {
        const nums = el.querySelectorAll('.cw-num');
        gsap.fromTo(nums,
          { opacity: 0, y: 80, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 0.45, ease: 'power3.out', onComplete: resolve }
        );
      } else if (type === 'riveted-panels') {
        const panels = el.querySelectorAll('.rp-panel');
        gsap.fromTo(panels,
          { scaleY: 0, transformOrigin: 'top center' },
          { scaleY: 1, stagger: { each: 0.07 }, ease: 'power3.inOut', duration: 0.42, onComplete: resolve }
        );
      } else if (type === 'gear-curtain') {
        gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 });
        const gears = el.querySelectorAll('.gc-gear');
        gsap.fromTo(gears,
          { scale: 0.1, rotation: 0 },
          { scale: 5.5, rotation: 540, duration: 0.85, ease: 'power2.inOut', stagger: 0.08, onComplete: resolve }
        );
      } else {
        resolve();
      }
    }),

    playOut: (type, to) => new Promise(resolve => {
      const el = overlays[type]?.current;
      const done = () => { hide(); resolve(); };
      if (!el) { done(); return; }

      if (type === 'shutter-blinds') {
        const strips = el.querySelectorAll('.shutter-strip');
        gsap.to(strips,
          { rotateY: -90, stagger: { each: 0.04, from: 'end' }, ease: 'power2.inOut', duration: 0.38, onComplete: done }
        );
      } else if (type === 'crosshair-lock') {
        const hLine = el.querySelector('.ch-h');
        const vLine = el.querySelector('.ch-v');
        const bg = el.querySelector('.ch-bg');
        gsap.timeline({ onComplete: done })
          .to(bg,    { opacity: 0, duration: 0.2 })
          .to(hLine, { scaleX: 0, opacity: 0, duration: 0.28, ease: 'power3.out' }, '<')
          .to(vLine, { scaleY: 0, opacity: 0, duration: 0.28, ease: 'power3.out' }, '<0.05');
      } else if (type === 'counter-wipe') {
        const nums = el.querySelectorAll('.cw-num');
        gsap.to(nums,
          { opacity: 0, y: -80, scale: 1.2, stagger: 0.1, duration: 0.35, ease: 'power3.in', onComplete: done }
        );
      } else if (type === 'riveted-panels') {
        const panels = el.querySelectorAll('.rp-panel');
        gsap.to(panels,
          { scaleY: 0, transformOrigin: 'bottom center', stagger: { each: 0.07, from: 'end' }, ease: 'power3.inOut', duration: 0.42, onComplete: done }
        );
      } else if (type === 'gear-curtain') {
        const gears = el.querySelectorAll('.gc-gear');
        gsap.to(gears,
          { scale: 0, rotation: '-=360', duration: 0.7, ease: 'power2.in', stagger: 0.06 }
        );
        gsap.to(el, { opacity: 0, duration: 0.4, delay: 0.4, onComplete: done });
      } else {
        done();
      }
    }),
  }));

  return (
    <div ref={rootRef} className="pt-root" style={{ display: 'none' }}>

      {/* 1. SHUTTER BLINDS */}
      <div ref={shutterRef} className="pt-overlay shutter-overlay" style={{ display: 'none' }}>
        <div className="shutter-perspective">
          {Array.from({ length: STRIP_COUNT }).map((_, i) => (
            <div key={i} className="shutter-strip" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      {/* 2. CROSSHAIR LOCK */}
      <div ref={crossRef} className="pt-overlay crosshair-overlay" style={{ display: 'none' }}>
        <div className="ch-bg" />
        <div className="ch-h" />
        <div className="ch-v" />
        <div className="ch-center">
          <div className="ch-dot" />
          <div className="ch-ring" />
        </div>
        <div className="ch-corner ch-tl" /><div className="ch-corner ch-tr" />
        <div className="ch-corner ch-bl" /><div className="ch-corner ch-br" />
        <span className="ch-label">LOCKED</span>
      </div>

      {/* 3. COUNTER WIPE */}
      <div ref={counterRef} className="pt-overlay counter-overlay" style={{ display: 'none' }}>
        <div className="cw-backdrop" />
        <div className="cw-num" data-n="200+">200+</div>
        <div className="cw-num" data-n="6 YRS">6 YRS</div>
        <div className="cw-num" data-n="50+">50+</div>
        <div className="cw-tag">SHIV KRISHNA ENGINEERS</div>
      </div>

      {/* 4. RIVETED PANELS */}
      <div ref={panelsRef} className="pt-overlay panels-overlay" style={{ display: 'none' }}>
        {Array.from({ length: PANEL_COUNT }).map((_, i) => (
          <div key={i} className="rp-panel" style={{ '--pi': i }}>
            <div className="rp-rivet rp-tl" /><div className="rp-rivet rp-tr" />
            <div className="rp-rivet rp-bl" /><div className="rp-rivet rp-br" />
          </div>
        ))}
      </div>

      {/* 5. GEAR CURTAIN */}
      <div ref={gearRef} className="pt-overlay gear-overlay" style={{ display: 'none', opacity: 0 }}>
        <div className="gc-gear gc-gear-1"><GearShape r={70} teeth={12} color="#c8d0dc" /></div>
        <div className="gc-gear gc-gear-2"><GearShape r={50} teeth={9}  color="#aeb8c7" /></div>
        <div className="gc-gear gc-gear-3"><GearShape r={40} teeth={7}  color="#d8dee8" /></div>
        <div className="gc-label">SHIV KRISHNA ENGINEERS</div>
      </div>

    </div>
  );
});

export default TransitionOverlay;
