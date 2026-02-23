"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { assert } from "@/lib/assert";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

const DIRECTION_OFFSET = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
} as const;

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
}: FadeInProps) {
  assert(delay >= 0, "Delay must be non-negative");
  assert(direction in DIRECTION_OFFSET, "Invalid direction");

  return (
    <motion.div
      initial={{ opacity: 0, ...DIRECTION_OFFSET[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
