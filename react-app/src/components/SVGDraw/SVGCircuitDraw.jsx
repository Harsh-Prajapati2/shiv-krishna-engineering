import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SVGCircuitDraw({ className = "" }) {
  const svgRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll(".draw-path");
    if (!paths || paths.length === 0) return;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });

    gsap.to(svgRef.current.querySelectorAll(".draw-path"), {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement, // Draw relative to the whole page scroll
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`svg-circuit-draw ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background circuit paths from top (0) to bottom (100) */}
      {/* Main Spine */}
      <path
        className="draw-path"
        vectorEffect="non-scaling-stroke"
        d="M10 0 V 15 H 90 V 40 H 20 V 60 H 80 V 85 H 50 V 100"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Secondary Connections */}
      <path
        className="draw-path"
        vectorEffect="non-scaling-stroke"
        d="M90 15 V 25 H 50 V 50 H 90 V 75 H 20 V 90 H 80"
        stroke="var(--text-muted)"
        strokeWidth="1"
        strokeDasharray="4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />

      {/* Nodes - we use rect or path for nodes since circles get stretched with preserveAspectRatio="none" */}
      {/* Nodes can be drawn or we just skip filled circles for the giant scrolling version because they'll distort. We'll use tiny horizontal lines as 'nodes'. */}
      <path
        className="draw-path"
        vectorEffect="non-scaling-stroke"
        d="M 8 15 H 12 M 88 15 H 92 M 88 40 H 92 M 18 40 H 22 M 18 60 H 22 M 78 60 H 82 M 78 85 H 82 M 48 85 H 52 M 48 100 H 52"
        stroke="var(--accent)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
