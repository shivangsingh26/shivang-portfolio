"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type ShapeKind = "ico" | "dodec" | "torus" | "octa";

const SHAPES: { kind: ShapeKind; pos: [number, number, number]; scale: number; color: string; speed: number; rot: number }[] = [
  { kind: "ico", pos: [-3.4, 1.2, -1], scale: 0.55, color: "#7a8eff", speed: 1.4, rot: 1 },
  { kind: "torus", pos: [3.2, -0.8, -0.5], scale: 0.4, color: "#ff7e5a", speed: 1.1, rot: 1.4 },
  { kind: "dodec", pos: [-2.6, -1.8, -2], scale: 0.45, color: "#9a7eff", speed: 1.6, rot: 1.1 },
  { kind: "octa", pos: [2.8, 1.6, -2.5], scale: 0.5, color: "#5ae0c8", speed: 1.2, rot: 1.3 },
  { kind: "ico", pos: [0, 2.4, -3], scale: 0.35, color: "#ffd66a", speed: 1.5, rot: 0.9 },
];

function Shape({ kind, color }: { kind: ShapeKind; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.3;
    ref.current.rotation.y += delta * 0.25;
  });
  return (
    <mesh ref={ref}>
      {kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
      {kind === "dodec" && <dodecahedronGeometry args={[1, 0]} />}
      {kind === "torus" && <torusGeometry args={[0.7, 0.22, 12, 28]} />}
      {kind === "octa" && <octahedronGeometry args={[1, 0]} />}
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

export function FloatingShapes3D({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={`!absolute inset-0 ${className}`}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      aria-hidden
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#9a9eff" />
      <pointLight position={[-5, -2, -2]} intensity={0.8} color="#ff7a5a" />
      {SHAPES.map((s, i) => (
        <Float
          key={i}
          speed={s.speed}
          rotationIntensity={s.rot}
          floatIntensity={1.4}
          position={s.pos}
        >
          <group scale={s.scale}>
            <Shape kind={s.kind} color={s.color} />
          </group>
        </Float>
      ))}
    </Canvas>
  );
}
