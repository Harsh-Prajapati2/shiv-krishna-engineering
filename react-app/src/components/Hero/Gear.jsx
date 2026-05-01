import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useCursor, MeshDistortMaterial } from '@react-three/drei';

const Gear = React.forwardRef(({ color, teeth = 12, speed = 1, ...props }, ref) => {
  const [hovered, setHover] = useState(false);
  useCursor(hovered);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const baseR = teeth / 8; 
    const outerRadius = baseR + 0.25;
    const innerRadius = baseR;
    
    // Create the gear profile
    for (let i = 0; i < teeth; i++) {
      const angle = (i * Math.PI * 2) / teeth;
      const toothWidth = (Math.PI * 2) / teeth;
      
      shape.lineTo(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius);
      shape.lineTo(Math.cos(angle + toothWidth * 0.2) * outerRadius, Math.sin(angle + toothWidth * 0.2) * outerRadius);
      shape.lineTo(Math.cos(angle + toothWidth * 0.7) * outerRadius, Math.sin(angle + toothWidth * 0.7) * outerRadius);
      shape.lineTo(Math.cos(angle + toothWidth) * innerRadius, Math.sin(angle + toothWidth) * innerRadius);
    }

    // Cut out industrial spokes (the "holes" in the gear)
    const numSpokes = 4;
    for (let i = 0; i < numSpokes; i++) {
      const holePath = new THREE.Path();
      const holeAngle = (i * Math.PI * 2) / numSpokes;
      const holeRadius = baseR * 0.5;
      holePath.absarc(Math.cos(holeAngle) * holeRadius, Math.sin(holeAngle) * holeRadius, baseR * 0.2, 0, Math.PI * 2, true);
      shape.holes.push(holePath);
    }

    return new THREE.ExtrudeGeometry(shape, {
      depth: 0.3,
      bevelEnabled: true,
      bevelSize: 0.03,
      bevelThickness: 0.06,
    });
  }, [teeth]);

  return (
    <group position={position}>
      <mesh
        ref={ref}
        geometry={geometry} 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        {...props}
      >
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : color} 
          metalness={1} 
          roughness={hovered ? 0.05 : 0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      
      {/* Ghost Wireframe Overlay for "Digital Tech" feel */}
      {hovered && (
        <mesh geometry={geometry} scale={1.01}>
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
});