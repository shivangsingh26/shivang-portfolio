"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function OrbitalRing() {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const count = 320;
    const arr = new Float32Array(count * 3);
    const ringRadius = 2.6;
    const tubeRadius = 0.06;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      const r = ringRadius + (Math.random() - 0.5) * tubeRadius * 6;
      const tilt = (Math.random() - 0.5) * 0.18;
      arr[i * 3 + 0] = Math.cos(theta) * r;
      arr[i * 3 + 1] = tilt;
      arr[i * 3 + 2] = Math.sin(theta) * r;
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    mouse.current.x += (state.mouse.x - mouse.current.x) * 0.02;
    mouse.current.y += (state.mouse.y - mouse.current.y) * 0.02;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.x = 0.65 + mouse.current.y * 0.08;
    ref.current.rotation.z = mouse.current.x * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.85}
        color="#9ca3ff"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function AmbientDots() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 180;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.45}
        color="#ffffff"
        depthWrite={false}
      />
    </points>
  );
}

export function Particles3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      className="!absolute inset-0"
    >
      <OrbitalRing />
      <AmbientDots />
    </Canvas>
  );
}
