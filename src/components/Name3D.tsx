"use client";

import { motion } from "framer-motion";
import { assert } from "@/lib/assert";

const FULL_NAME = "Oluwaseyi Kareem";
const LETTER_DELAY = 0.06;
const LETTER_DURATION = 0.5;

export default function Name3D() {
  assert(FULL_NAME.length > 0, "Name must not be empty");
  assert(FULL_NAME.includes(" "), "Name must include space for first/last");

  const letters = FULL_NAME.split("");

  return (
    <div style={{ perspective: "1000px" }}>
      <h1
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={`letter-${i}`}
            className={
              letter !== " "
                ? "name-3d-letter inline-block cursor-default"
                : "inline-block"
            }
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              delay: i * LETTER_DELAY,
              duration: LETTER_DURATION,
              ease: "easeOut",
            }}
            whileHover={{
              y: -8,
              scale: 1.1,
              transition: { duration: 0.15 },
            }}
            style={{
              transformStyle: "preserve-3d",
              minWidth: letter === " " ? "0.3em" : undefined,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
