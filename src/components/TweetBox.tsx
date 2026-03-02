"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "./Typewriter";
import { assert } from "@/lib/assert";

interface TweetItem {
  text: string;
  date: string;
}

const FALLBACK_TWEETS: TweetItem[] = [
  { text: "Arsenal winning the league will be a sad day for football.", date: "Feb 2026" },
  { text: "I dont like AI but this was made with some help of AI.", date: "Feb 2026" },
  { text: "I pray everyday that my niece wont be a streamer.", date: "Jan 2026" },
  { text: "I cried about Ter Stegen everyday and God heard my prayers.", date: "Dec 2025" },
  { text: "The sooner we get rid of Ter Statue, the sooner my club will prosper.", date: "Nov 2025" },
  { text: "Girls will cry over breakups but not when cutting onions???", date: "Oct 2025" },
];

const MAX_TWEETS = 50;

export default function TweetBox() {
  const [tweets, setTweets] = useState<TweetItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/tweets");
        if (!res.ok) throw new Error("Failed to fetch tweets");
        const json = await res.json();
        const fetched: TweetItem[] = json.tweets ?? [];
        if (!cancelled) setTweets(fetched.length > 0 ? fetched : FALLBACK_TWEETS);
      } catch {
        if (!cancelled) setTweets(FALLBACK_TWEETS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  const handlePhraseChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  assert(FALLBACK_TWEETS.length > 0, "Must have fallback tweets");

  const activeTweets = tweets.length > 0 ? tweets : FALLBACK_TWEETS;
  const currentDate = activeTweets[currentIndex]?.date ?? "";
  const phrases = activeTweets.map((t) => t.text);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative group w-full max-w-lg mx-auto"
    >
      {/* 1. The "Glow" Background Layer */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-md"></div>

      {/* 2. The Main Glass Container */}
      <div className="relative px-6 py-5 rounded-xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-2xl">
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-bold tracking-[0.1em] text-gray-600 dark:text-gray-400">
            Here are some of my &quot;engaging&quot; tweets:
          </p>
          
          <AnimatePresence mode="wait">
            {currentDate && (
              <motion.span
                key={currentDate}
                className="text-[10px] font-mono text-blue-500 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                {currentDate}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="h-10 flex items-center text-sm md:text-base font-medium text-gray-800 dark:text-gray-100">
          {loading ? (
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-full h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" 
            />
          ) : (
            <Typewriter
              phrases={phrases}
              typingSpeed={50}
              deletingSpeed={30}
              onPhraseChange={handlePhraseChange}
            />
          )}
        </div>

        {/* 3. Decorative "Scanning" line */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>
    </motion.div>
  );
}