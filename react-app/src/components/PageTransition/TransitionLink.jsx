import React from 'react';
import { useTransitionNavigate } from './PageTransitionRouter';

/**
 * TransitionLink — Drop-in replacement for <Link> / <NavLink>
 * Uses the animated page transition instead of instant navigation.
 */
export default function TransitionLink({ to, children, className = '', style = {}, onClick }) {
  const ctx = useTransitionNavigate();
  const go = ctx?.go;

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    if (go) {
      go(to);
    } else {
      // Fallback if context not ready
      window.location.href = to;
    }
  };

  return (
    <a href={to} className={className} style={style} onClick={handleClick}>
      {children}
    </a>
  );
}

