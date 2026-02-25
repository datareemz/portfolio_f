"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { assert } from "@/lib/assert";

const FULL_NAME = "Seyi Kareem";
const LETTER_DELAY = 0.04; // Slightly faster for a "snappier" feel

export default function Name3D() {
  assert(FULL_NAME.length > 0, "Name must not be empty");

  // 1. Setup Motion Values for Mouse Position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Add Spring smoothing so the movement isn't "jittery"
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to center of screen (-0.5 to 0.5)
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const letters = FULL_NAME.split("");

  return (
    <div style={{ perspective: "1200px" }} className="py-1">
      <motion.h1
        className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center select-none"
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d" 
        }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            className="inline-block cursor-default"
            initial={{ opacity: 0, z: -100, rotateX: -90 }}
            animate={{ opacity: 1, z: 0, rotateX: 0 }}
            transition={{
              delay: i * LETTER_DELAY,
              type: "spring",
              damping: 12,
              stiffness: 100,
            }}
            // Individual letter "pop" on hover
            whileHover={{
              z: 50,
              scale: 1.1,
              color: "var(--accent-color, #3b82f6)", // Optional: highlight on hover
              transition: { duration: 0.1 }
            }}
            style={{
              transformStyle: "preserve-3d",
              display: "inline-block",
              minWidth: letter === " " ? "0.3em" : undefined,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}