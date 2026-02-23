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
  { text: "I dont like AI but this was made with some help of AI", date: "" },
  { text: "Every Soup is Cereal", date: "" },
  { text: "I like Cats", date: "" },
  { text: "My code works, I just dont know why", date: "" },
  { text: "Tabs over spaces, fight me", date: "" },
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
        if (!res.ok) {
          throw new Error("Failed to fetch tweets");
        }
        const json = await res.json();
        const fetched: TweetItem[] = json.tweets ?? [];
        if (!cancelled) {
          setTweets(fetched.length > 0 ? fetched : FALLBACK_TWEETS);
        }
      } catch {
        if (!cancelled) {
          setTweets(FALLBACK_TWEETS);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => { cancelled = true; };
  }, []);

  const handlePhraseChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  assert(FALLBACK_TWEETS.length > 0, "Must have fallback tweets");
  assert(FALLBACK_TWEETS.length <= MAX_TWEETS, "Too many fallback tweets");

  const currentDate = tweets[currentIndex]?.date ?? "";
  const phrases = tweets.map((t) => t.text);

  if (loading) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Here are some of my hot take tweets:
        </p>
        <div className="h-12 flex items-center">
          <span className="text-gray-400 dark:text-gray-500 text-sm">
            Loading tweets...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Here are some of my hot take tweets:
        </p>
        <AnimatePresence mode="wait">
          {currentDate && (
            <motion.span
              key={currentDate}
              className="text-xs text-gray-400 dark:text-gray-500"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.3 }}
            >
              {currentDate}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="h-6 flex items-center text-sm">
        <Typewriter
          phrases={phrases}
          typingSpeed={60}
          deletingSpeed={30}
          onPhraseChange={handlePhraseChange}
        />
      </div>
    </div>
  );
}
