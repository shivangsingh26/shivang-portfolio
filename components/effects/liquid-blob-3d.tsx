"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Blob() {
  const ref = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.4, 16), []);
  const base = useMemo(() => {
    const arr = geom.attributes.position.array.slice() as Float32Array;
    return arr;
  }, [geom]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    mouse.current.x += (state.mouse.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.mouse.y - mouse.current.y) * 0.04;

    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const z = base[i * 3 + 2];
      const len = Math.sqrt(x * x + y * y + z * z);
      const n =
        Math.sin(t * 0.7 + x * 1.5) * 0.06 +
        Math.cos(t * 0.6 + y * 1.4) * 0.06 +
        Math.sin(t * 0.5 + z * 1.6) * 0.06;
      const r = 1 + n;
      pos.setXYZ(i, (x / len) * r * len, (y / len) * r * len, (z / len) * r * len);
    }
    pos.needsUpdate = true;
    ref.current.geometry.computeVertexNormals();
    ref.current.rotation.y += 0.003;
    ref.current.rotation.x = mouse.current.y * 0.2;
    ref.current.rotation.z = mouse.current.x * 0.15;
  });

  return (
    <mesh ref={ref} geometry={geom}>
      <meshStandardMaterial
        color="#6e8aff"
        roughness={0.3}
        metalness={0.65}
        emissive="#3a3eff"
        emissiveIntensity={0.4}
        wireframe={false}
      />
    </mesh>
  );
}

export function LiquidBlob3D({ className = "" }: { className?: string }) {
  return (
    <Canvas
      className={`!absolute inset-0 ${className}`}
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      aria-hidden
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 4, 3]} intensity={2.2} color="#a8b8ff" />
      <pointLight position={[-3, -2, 2]} intensity={1.6} color="#ff7e5a" />
      <pointLight position={[0, 0, -3]} intensity={1} color="#9a4eff" />
      <Blob />
    </Canvas>
  );
}
