import React, { createContext, useContext, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext();

export const PAGE_TRANSITIONS = {
  '/':           'gear-curtain',
  '/about':      'shutter-blinds',
  '/services':   'riveted-panels',
  '/contact':    'counter-wipe',
  '/clients':    'crosshair-lock',
  '/industries': 'shutter-blinds',
  '/strength':   'riveted-panels',
};

export const useTransitionNavigate = () => useContext(TransitionContext);

export function PageTransitionRouter({ children, overlayRef }) {
  const navigate = useNavigate();
  const locked = useRef(false);

  const go = useCallback(async (to) => {
    if (locked.current || !overlayRef?.current) return;
    locked.current = true;

    const type = PAGE_TRANSITIONS[to] || 'shutter-blinds';

    await overlayRef.current.playIn(type, to);
    navigate(to);
    await new Promise(r => setTimeout(r, 60));
    await overlayRef.current.playOut(type, to);

    locked.current = false;
  }, [navigate, overlayRef]);

  return (
    <TransitionContext.Provider value={{ go }}>
      {children}
    </TransitionContext.Provider>
  );
}
