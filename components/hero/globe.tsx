"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { motion } from "motion/react";

type Props = { size?: number };

/**
 * Cobe globe — Bengaluru pin + global engineering hub markers.
 * Auto-rotates, mouse-drag-friendly, GPU rendered via WebGL.
 */
export function Globe({ size = 600 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, dx: 0, down: false });
  const phiRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 2.2,
      mapSamples: 16000,
      mapBrightness: 9,
      baseColor: [0.28, 0.32, 0.45],
      markerColor: [0.7, 0.78, 1],
      glowColor: [0.55, 0.65, 1],
      markers: [
        { location: [12.9716, 77.5946], size: 0.12 }, // Bengaluru (home)
        { location: [37.7749, -122.4194], size: 0.06 }, // SF
        { location: [40.7128, -74.006], size: 0.06 }, // NYC
        { location: [51.5074, -0.1278], size: 0.05 }, // London
        { location: [1.3521, 103.8198], size: 0.05 }, // Singapore
        { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
        { location: [52.52, 13.405], size: 0.04 }, // Berlin
        { location: [-33.8688, 151.2093], size: 0.04 }, // Sydney
        { location: [25.276, 55.2962], size: 0.04 }, // Dubai
      ],
      onRender: (state) => {
        if (!pointerRef.current.down) phiRef.current += 0.0035;
        state.phi = phiRef.current + pointerRef.current.dx * 0.01;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    setTimeout(() => {
      if (canvas) canvas.style.opacity = "1";
    }, 80);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative aspect-square w-full max-w-[600px]"
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerRef.current.down = true;
          pointerRef.current.x = e.clientX - pointerRef.current.dx;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerRef.current.down = false;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerRef.current.down = false;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerRef.current.down) {
            pointerRef.current.dx = e.clientX - pointerRef.current.x;
          }
        }}
        onTouchMove={(e) => {
          if (pointerRef.current.down && e.touches[0]) {
            pointerRef.current.dx = e.touches[0].clientX - pointerRef.current.x;
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          contain: "layout paint size",
          opacity: 0,
          transition: "opacity 0.6s ease",
        }}
      />
    </motion.div>
  );
}
