import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Sparkles, MeshDistortMaterial, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * 1. ADVANCED GEAR COMPONENT
 * Includes industrial cutouts and hover-reactive states
 */
const Gear = ({ color, teeth = 12, ...props }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const baseR = teeth / 10; 
    const outerRadius = baseR + 0.25;
    const innerRadius = baseR;
    
    for (let i = 0; i < teeth; i++) {
      const angle = (i * Math.PI * 2) / teeth;
      const toothWidth = (Math.PI * 2) / teeth;
      shape.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
      shape.lineTo(Math.cos(angle + toothWidth * 0.2) * outerRadius, Math.sin(angle + toothWidth * 0.2) * outerRadius);
      shape.lineTo(Math.cos(angle + toothWidth * 0.7) * outerRadius, Math.sin(angle + toothWidth * 0.7) * outerRadius);
      shape.lineTo(Math.cos(angle + toothWidth) * innerRadius, Math.sin(angle + toothWidth) * innerRadius);
    }

    // Industrial Spokes
    const numSpokes = 5;
    for (let i = 0; i < numSpokes; i++) {
      const holePath = new THREE.Path();
      const holeAngle = (i * Math.PI * 2) / numSpokes;
      holePath.absarc(Math.cos(holeAngle) * (baseR * 0.5), Math.sin(holeAngle) * (baseR * 0.5), baseR * 0.15, 0, Math.PI * 2, true);
      shape.holes.push(holePath);
    }

    const geom = new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.04 });
    geom.translate(0, 0, -0.15);
    return geom;
  }, [teeth]);

  return (
    <mesh 
      {...props}
      ref={meshRef} 
      geometry={geometry} 
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <MeshDistortMaterial 
        color={hovered ? "#fff" : color} 
        speed={hovered ? 5 : 0} 
        distort={hovered ? 0.2 : 0}
        metalness={1} 
        roughness={0.1}
        emissive={color}
        emissiveIntensity={hovered ? 0.8 : 0.1}
        transparent={true}
        opacity={0.8}
        // The distort and emissiveIntensity will be animated by GSAP directly on the material
      />
    </mesh>
  );
};

/**
 * 2. THE ORCHESTRATOR
 * Handles Scroll, Parallax, and Gear Interlocking
 */
const Orchestrator = () => {
  const group = useRef();
  const gear1Ref = useRef();
  const gear2Ref = useRef();
  const gear3Ref = useRef();
  const sparklesRef = useRef();
  const spotLightRef = useRef();
  const rectAreaLightRef = useRef();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger here or at a higher level once
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section", // Target the main hero section
          start: "top top", // When the top of the hero section hits the top of the viewport
          // The end position is now dynamic, based on the height of the hero section.
          // This ensures the animation completes as the hero section leaves the viewport.
          end: () => `+=${document.querySelector(".hero-section").offsetHeight}`,
          scrub: 1, // Smoothly scrub the animation with scroll
          // markers: true, // Uncomment for debugging ScrollTrigger
        }
      });

      // Animate gear group scale
      tl.to(group.current.scale, {
        x: 2.5, // Make gears significantly bigger
        y: 2.5,
        z: 2.5,
        duration: 1,
        ease: "power1.inOut"
      }, 0);

      // Animate gear distortion and emissive intensity for morphing and "lights going into it"
      [gear1Ref, gear2Ref, gear3Ref].forEach((gearRef) => {
        if (gearRef.current && gearRef.current.material) { // Ensure ref and material exist
          tl.to(gearRef.current.material, {
            distort: 0.8, // More pronounced distortion
            emissiveIntensity: 5.0, // Stronger emissive glow
            duration: 1,
            ease: "power1.inOut"
          }, 0);
        }
      });

      // Animate sparkles to intensify and gather
      tl.to(sparklesRef.current, {
        count: 1000, // Many more sparkles
        scale: 5, // Smaller scale to appear to gather
        speed: 5, // Faster movement
        opacity: 1, // Fully opaque
        duration: 1,
        ease: "power1.inOut"
      }, 0);

      // Animate lights to focus and intensify
      tl.to(spotLightRef.current, {
        intensity: 15, // Much stronger spot light
        duration: 1,
        ease: "power1.inOut"
      }, 0);
      tl.to(rectAreaLightRef.current, {
        intensity: 30, // Much stronger rect area light
        duration: 1,
        ease: "power1.inOut"
      }, 0);

    });

    return () => ctx.revert(); // Clean up GSAP animations on unmount
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const scrollY = window.scrollY * 0.001;

    // Smooth Mouse Parallax
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y * 0.3, 0.05); // Corrected to state.mouse.y
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.mouse.x * 0.3, 0.05); // Corrected to state.mouse.x
    
    // Mechanical Logic: Linked Rotations
    const masterRotation = t * 0.3 + scrollY * 5;
    
    // Large Gear (Child 0)
    if (gear1Ref.current) gear1Ref.current.rotation.z = masterRotation;
    // Medium Gear (Child 1) - Counter-rotate
    if (gear2Ref.current) gear2Ref.current.rotation.z = -masterRotation * (24/16) + 0.35;
    // Small Gear (Child 2) - Counter-rotate
    if (gear3Ref.current) gear3Ref.current.rotation.z = -masterRotation * (24/12) - 0.2;
    
    // Depth Parallax
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, scrollY * 10, 0.1);
  });

  return (
    <group ref={group}>
      {/* Main Gear Cluster */}
      <Gear ref={gear1Ref} position={[-2, 0, 0]} teeth={24} color="#d1d5db" />
      <Gear ref={gear2Ref} position={[1.2, 2.2, -1]} teeth={16} color="#ff4b00" />
      <Gear ref={gear3Ref} position={[1.8, -1.5, 0.5]} teeth={12} color="#138a84" />

      {/* Atmospheric elements */}
      <Sparkles ref={sparklesRef} count={100} scale={15} size={1} speed={0.5} opacity={0.3} />
      {/* Lights moved here to be animated by GSAP */}
      <spotLight ref={spotLightRef} position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={3} castShadow />
      <rectAreaLight ref={rectAreaLightRef} width={20} height={20} intensity={10} position={[-10, 5, 5]} color="#ff4b00" />
    </group>
  );
};

/**
 * 3. MAIN EXPORT
 */
export default function Scene() {
  return (
    <div className="hero-3d-background-canvas-wrapper" style={{ width: '100vw', height: '100vh', background: 'var(--bg-primary)' }}>
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 35 }}>
        {/* Deep space feeling with Fog */}
        <color attach="background" args={['#f8f8f8']} />
        <fog attach="fog" args={['#f8f8f8', 10, 25]} />
        <ambientLight intensity={0.2} />
        <Environment preset="dawn" />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <Orchestrator />
        </Float>

        <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={20} blur={3} far={10} />
      </Canvas>
    </div>
  );
}