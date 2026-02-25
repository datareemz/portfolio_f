"use client";

import { motion } from "framer-motion";
import Name3D from "./Name3D";
import InfoPills from "./InfoPills";
import NavLinks from "./NavLinks";
import TweetBox from "./TweetBox";
import { assert } from "@/lib/assert";

const RESUME_PATH = "/resume.pdf";

// 1. Define high-end variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Automatically offsets each child's animation
      delayChildren: 0.5,   // Wait for Name3D to settle
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
    },
  },
};

export default function Hero() {
  assert(typeof RESUME_PATH === "string", "Resume path must be a string");

  return (
    <motion.section 
      className="flex flex-col items-center pt-10 md:pt-14 pb-4 px-4 gap-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* 2. Wrap Name3D or keep it separate if it handles its own internal 3D logic */}
      <Name3D />

      <motion.div variants={itemVariants}>
        <InfoPills />
      </motion.div>

      <motion.div variants={itemVariants}>
        <NavLinks />
      </motion.div>

      <motion.div className="w-full max-w-lg" variants={itemVariants}>
        <TweetBox />
      </motion.div>

      <motion.a
        href={RESUME_PATH}
        download
        variants={itemVariants}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium bg-white/50 dark:bg-black/20 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download Resume
      </motion.a>
    </motion.section>
  );
}