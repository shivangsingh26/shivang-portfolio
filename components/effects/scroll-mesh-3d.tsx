"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";

function Ribbon() {
  const ref = useRef<THREE.Mesh>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x = scrollY.current * Math.PI * 2;
    ref.current.rotation.y += delta * 0.08;
    ref.current.rotation.z = scrollY.current * Math.PI * 0.7;
    const wave = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    ref.current.position.y = wave + scrollY.current * -2;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.4, 0.34, 240, 26, 2, 3]} />
      <meshStandardMaterial
        color="#a8b8ff"
        wireframe
        emissive="#5a4eff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.5}
      />
    </mesh>
  );
}

export function ScrollMesh3D({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={`!absolute inset-0 ${className}`}
      camera={{ position: [0, 0, 5], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      aria-hidden
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#9a9eff" />
      <pointLight position={[-4, -2, -2]} intensity={0.8} color="#ff7a5a" />
      <Ribbon />
    </Canvas>
  );
}
