"use client";

import { motion } from "framer-motion";
import Name3D from "./Name3D";
import InfoPills from "./InfoPills";
import NavLinks from "./NavLinks";
import TweetBox from "./TweetBox";
import { assert } from "@/lib/assert";

const RESUME_PATH = "/resume.pdf";

export default function Hero() {
  assert(typeof RESUME_PATH === "string", "Resume path must be a string");
  assert(RESUME_PATH.length > 0, "Resume path must not be empty");

  return (
    <section className="flex flex-col items-center pt-24 md:pt-32 pb-10 px-4 gap-5">
      <Name3D />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
      >
        <InfoPills />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
      >
        <NavLinks />
      </motion.div>

      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <TweetBox />
      </motion.div>

      <motion.a
        href={RESUME_PATH}
        download
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
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
    </section>
  );
}
