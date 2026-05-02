import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './SnapGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function SnapGallery() {
  const containerRef = useRef(null);
  const panelsRef = useRef([]);

  // High-quality industrial sample images from Unsplash
  const images = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop", // Engineering/Tech
    "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?q=80&w=2000&auto=format&fit=crop", // Construction/Industrial
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop", // Architecture/Steel
    "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=2000&auto=format&fit=crop"  // Sparks/Welding
  ];

  useEffect(() => {
    const panels = panelsRef.current;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,           // Pin the section to the screen
          scrub: 1,            // Smooth scrubbing linked to scroll speed
          snap: 1 / (panels.length - 1), // Snap perfectly to each panel
          end: () => "+=" + containerRef.current.offsetWidth, // Scroll distance equals total width
        }
      });

      // 1. Move the panels horizontally
      tl.to(panels, {
        xPercent: -100 * (panels.length - 1), 
        ease: "none",
      }, 0); // The '0' inserts it at the very start of the timeline

      // 2. Parallax effect for the images (Move them slightly right as panels move left)
      tl.to('.snap-image', {
        x: "30vw", // Moves images right by 30% of viewport width over the total scroll
        ease: "none",
      }, 0); // The '0' ensures this happens at the exact same time as the panel scroll

      // 3. Staggered Text Entrance Animation for the active panel
      panels.forEach((panel) => {
        const textElements = panel.querySelectorAll('.snap-eyebrow, h2, p');
        
        gsap.fromTo(textElements, 
          { 
            opacity: 0, 
            y: 40 
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15, // Creates a beautiful delay between the eyebrow, title, and paragraph
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl, // Links this trigger to our horizontal scrolling timeline
              start: "left 75%",      // Triggers when the left edge of the panel hits 75% of the viewport
              toggleActions: "play none none reverse" // Plays on enter, reverses if scrolled back
            }
          }
        );

        // 4. Subtle Image Scale-Down Animation (when not active)
        const image = panel.querySelector('.snap-image');
        
        // Scale up to 1.15 as it enters the center (becomes active)
        gsap.fromTo(image,
          { scale: 1 },
          {
            scale: 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tl,
              start: "left right",  // When panel enters from the right
              end: "center center", // When panel is fully centered
              scrub: true
            }
          }
        );

        // Scale back down to 1.0 as it leaves the center (becomes inactive)
        gsap.to(image, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tl,
            start: "center center", // When panel starts leaving the center
            end: "right left",      // When panel has fully exited to the left
            scrub: true
          }
        });
      });

    }, containerRef);

    return () => ctx.revert(); // Clean up GSAP context on unmount
  }, []);

  return (
    <section className="snap-gallery-section" ref={containerRef}>
      <div className="snap-gallery-container">
        {images.map((img, i) => (
          <div 
            className="snap-panel" 
            key={i} 
            ref={(el) => (panelsRef.current[i] = el)}
          >
            <img src={img} alt={`Project sample ${i+1}`} className="snap-image" />
            <div className="snap-overlay"></div>
            
            <div className="snap-panel-content">
              <span className="snap-eyebrow">0{i + 1} / 0{images.length}</span>
              <h2>Sample Project {i + 1}</h2>
              <p>Precision execution and innovative engineering.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}