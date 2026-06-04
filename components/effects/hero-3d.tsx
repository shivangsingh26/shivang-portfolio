"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatingKnot() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!ref.current) return;
    mouse.current.x += (state.mouse.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.mouse.y - mouse.current.y) * 0.04;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2 + mouse.current.x * 0.02;
    ref.current.rotation.z = mouse.current.y * 0.2;
  });

  return (
    <mesh ref={ref} scale={1.2}>
      <torusKnotGeometry args={[1, 0.28, 220, 32]} />
      <meshStandardMaterial
        color="#7a8eff"
        wireframe
        emissive="#4a3eff"
        emissiveIntensity={0.4}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

function Halo() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 0, -1]} scale={3.5}>
      <ringGeometry args={[0.9, 1, 64]} />
      <meshBasicMaterial color="#ff6a6a" transparent opacity={0.06} side={THREE.DoubleSide} />
    </mesh>
  );
}

export function Hero3D({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={`!absolute inset-0 ${className}`}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.4} color="#9a9eff" />
      <pointLight position={[-5, -3, -2]} intensity={0.8} color="#ff7a5a" />
      <Halo />
      <FloatingKnot />
    </Canvas>
  );
}
