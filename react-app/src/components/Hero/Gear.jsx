import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useCursor } from '@react-three/drei';

const Gear = React.forwardRef(({ color, teeth = 12, speed = 1, ...props }, ref) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const baseR = teeth / 8; 
    const outerRadius = baseR + 0.3;
    const innerRadius = baseR - 0.2;
    const holeRadius = baseR * 0.35;
    
    // Create the gear profile
    for (let i = 0; i < teeth; i++) {
      const angle = (i * Math.PI * 2) / teeth;
      const toothWidth = (Math.PI * 2) / teeth;
      
      shape.lineTo(Math.cos(angle - toothWidth * 0.25) * innerRadius, Math.sin(angle - toothWidth * 0.25) * innerRadius);
      shape.lineTo(Math.cos(angle - toothWidth * 0.15) * outerRadius, Math.sin(angle - toothWidth * 0.15) * outerRadius);
      shape.lineTo(Math.cos(angle + toothWidth * 0.15) * outerRadius, Math.sin(angle + toothWidth * 0.15) * outerRadius);
      shape.lineTo(Math.cos(angle + toothWidth * 0.25) * innerRadius, Math.sin(angle + toothWidth * 0.25) * innerRadius);
    }

    // Center axle hole
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, holeRadius, 0, Math.PI * 2, false);
    shape.holes.push(centerHole);

    // Cut out industrial spokes (the "holes" in the gear)
    if (teeth > 12) {
      const numSpokes = Math.floor(teeth / 4);
      for (let i = 0; i < numSpokes; i++) {
        const holePath = new THREE.Path();
        const holeAngle = (i * Math.PI * 2) / numSpokes;
        const spokeRadius = baseR * 0.65;
        holePath.absarc(Math.cos(holeAngle) * spokeRadius, Math.sin(holeAngle) * spokeRadius, baseR * 0.15, 0, Math.PI * 2, true);
        shape.holes.push(holePath);
      }
    }

    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 4,
      bevelSteps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.05,
    });
    geom.center(); // Center the geometry perfectly for rotation
    return geom;
  }, [teeth]);

  return (
    <group ref={ref} {...props}>
      <mesh
        geometry={geometry} 
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
        onPointerOut={() => setHover(false)}
        castShadow
        receiveShadow
      >
        {/* Highly Realistic Machined Metal Material */}
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.9} 
          roughness={hovered ? 0.2 : 0.35}
          clearcoat={hovered ? 0.6 : 0.2}
          clearcoatRoughness={0.1}
          envMapIntensity={2.0} // High reflection of the environment map
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.0}
        />
      </mesh>
      
      {/* Inner Axle / Glowing Mechanical Core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[teeth / 8 * 0.33, teeth / 8 * 0.33, 0.45, 32]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#111111"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered ? color : "#000000"}
          emissiveIntensity={hovered ? 2 : 0}
        />
      </mesh>
    </group>
  );
});

export default Gear;