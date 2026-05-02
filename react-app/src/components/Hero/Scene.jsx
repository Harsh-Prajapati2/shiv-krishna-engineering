import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, Sparkles } from '@react-three/drei';
import { EffectComposer, RenderPass, EffectPass, DepthOfFieldEffect } from 'postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SIGNATURE VISUAL: THE MECHANICAL HALO
 * Heavy, precise, industrial ring structure.
 */
const MechanicalHalo = () => {
  const outerRingRef = useRef();
  const innerRingRef = useRef();
  const coreRef = useRef();

  // High-End Materials
  const darkMetal = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#111111", metalness: 0.9, roughness: 0.4, clearcoat: 0.1 }), []);
  const brushedSteel = useMemo(() => new THREE.MeshPhysicalMaterial({ color: "#777777", metalness: 1.0, roughness: 0.3, clearcoat: 0.2 }), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Slow, heavy, precise rotation
    if (outerRingRef.current) outerRingRef.current.rotation.z = t * 0.05;
    if (innerRingRef.current) innerRingRef.current.rotation.z = -t * 0.08;
    if (coreRef.current) coreRef.current.rotation.x = t * 0.1;
  });

  return (
    <group position={[4, 0, -2]} rotation={[0.1, -0.5, 0]}>
      {/* Massive Outer Ring */}
      <mesh ref={outerRingRef} castShadow receiveShadow material={darkMetal}>
        <torusGeometry args={[5, 0.5, 64, 128]} />
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={`node-${i}`} position={[Math.cos((i / 8) * Math.PI * 2) * 5, Math.sin((i / 8) * Math.PI * 2) * 5, 0]} material={brushedSteel} castShadow>
            <boxGeometry args={[1.2, 1.2, 1.4]} />
          </mesh>
        ))}
      </mesh>

      {/* Complex Inner Ring */}
      <mesh ref={innerRingRef} material={brushedSteel} castShadow receiveShadow>
        <torusGeometry args={[3.8, 0.15, 32, 128]} />
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh key={`spoke-${i}`} position={[Math.cos((i / 16) * Math.PI * 2) * 3.8, Math.sin((i / 16) * Math.PI * 2) * 3.8, 0]} rotation={[0, 0, (i / 16) * Math.PI * 2]} material={darkMetal}>
            <cylinderGeometry args={[0.06, 0.06, 1.5]} />
          </mesh>
        ))}
      </mesh>

      {/* Floating Background Pipelines for depth */}
      <mesh position={[-2, -4, -6]} rotation={[0, 0, Math.PI / 4]} material={darkMetal}>
        <cylinderGeometry args={[0.4, 0.4, 20, 32]} />
      </mesh>
    </group>
  );
};

/**
 * THE ORCHESTRATOR
 */
const Orchestrator = () => {
  const group = useRef();
  const beamsRef = useRef();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: () => `+=${document.querySelector(".hero-section")?.offsetHeight || 1000}`,
          scrub: 1,
        }
      });

      // On Load: Camera Dolly-in & Fade
      gsap.fromTo(group.current.position, 
        { z: -10 }, 
        { z: 0, duration: 2.5, ease: "power3.out" }
      );

      // Scroll Interaction: Move through the structure
      tl.to(group.current.position, {
        z: 12, // Camera moves THROUGH the structure
        y: 2,
        ease: "none"
      }, 0);
      
      tl.to(group.current.rotation, {
        x: 0.3,
        y: -0.4,
        ease: "none"
      }, 0);

    });

    return () => ctx.revert(); // Clean up GSAP animations on unmount
  }, []);

  useFrame((state) => {
    // Tight, subtle Mouse Parallax (clamped to a very small rotation)
    const maxRot = 0.05; // ~2.8 degrees max
    const targetX = THREE.MathUtils.clamp(state.mouse.x * 0.05, -maxRot, maxRot);
    const targetY = THREE.MathUtils.clamp(state.mouse.y * 0.05, -maxRot, maxRot);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetY, 0.06);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, targetX, 0.06);

    // Subtle beam wobble
    if (beamsRef.current) beamsRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.02;
  });

  return (
    <group ref={group}>
      {/* Volumetric subtle light beams (soft planes with additive blending) */}
      <group ref={beamsRef} position={[-6, 6, -2]} rotation={[0.6, -0.3, 0]}>
        <mesh rotation={[0, 0, 0]}>
          <coneGeometry args={[6, 18, 32, 1, true]} />
          <meshBasicMaterial color="#e8f7ff" transparent opacity={0.04} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, 0.2, 0]}>
          <coneGeometry args={[5.2, 16, 32, 1, true]} />
          <meshBasicMaterial color="#ff7a3a" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <MechanicalHalo />

      {/* Ambient particles (minimal dust/sparks) */}
      <Sparkles count={40} scale={12} size={0.9} speed={0.18} opacity={0.18} color="#ffd7b8" />

      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.12} />
      {/* Key light: top-left cool white */}
      <spotLight position={[-10, 10, 5]} angle={0.5} penumbra={1} intensity={1.2} color="#e6f7ff" castShadow />
      {/* Accent light: orange rim light */}
      <pointLight position={[12, -5, -2]} intensity={0.9} color="#ff6a2d" />
    </group>
  );
};

/**
 * Subtle post-processing depth-of-field for load and scroll transitions.
 */
const PostFX = () => {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef();
  const dofRef = useRef();

  useEffect(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    const dof = new DepthOfFieldEffect(camera, {
      focusDistance: 0.02,
      focalLength: 0.02,
      bokehScale: 1.1,
    });
    const effectPass = new EffectPass(camera, dof);
    effectPass.renderToScreen = true;

    composer.addPass(renderPass);
    composer.addPass(effectPass);
    composer.setSize(size.width, size.height);

    composerRef.current = composer;
    dofRef.current = dof;

    return () => composer.dispose();
  }, [gl, scene, camera, size.width, size.height]);

  useEffect(() => {
    if (composerRef.current) composerRef.current.setSize(size.width, size.height);
  }, [size.width, size.height]);

  useFrame((_, delta) => {
    if (composerRef.current) composerRef.current.render(delta);
  }, 1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (!dofRef.current) return;

      gsap.fromTo(
        dofRef.current,
        { focusDistance: 0.12, focalLength: 0.045, bokehScale: 1.6 },
        { focusDistance: 0.03, focalLength: 0.028, bokehScale: 1.0, duration: 3.2, ease: 'sine.out' }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: () => `+=${document.querySelector('.hero-section')?.offsetHeight || 1000}`,
          scrub: 1,
        },
      });

      tl.to(dofRef.current, { focusDistance: 0.045, focalLength: 0.03, bokehScale: 0.85, ease: 'none' }, 0);
    });

    return () => ctx.revert();
  }, []);

  return null;
};

/**
 * MAIN EXPORT
 */
export default function Scene() {
  return (
    <div className="hero-3d-background" style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas shadows camera={{ position: [0, 0, 12], fov: 40 }} style={{ pointerEvents: 'none' }}>
        {/* Dark Cinematic Atmosphere */}
        <color attach="background" args={['#020202']} />
        <fog attach="fog" args={['#020202', 8, 30]} />
        
        {/* High-end reflections */}
        <Environment preset="city" />

        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.08}>
          <Orchestrator />
        </Float>

        <PostFX />
      </Canvas>
    </div>
  );
}