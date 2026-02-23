"use client";

import { useState, useEffect } from "react";
import { assert } from "@/lib/assert";

type Phase = "typing" | "pausing" | "deleting";

interface TypewriterProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  onPhraseChange?: (index: number) => void;
}

const MAX_PHRASES = 50;

export default function Typewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  onPhraseChange,
}: TypewriterProps) {
  assert(phrases.length > 0, "Typewriter requires at least one phrase");
  assert(phrases.length <= MAX_PHRASES, "Too many phrases");

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  const currentPhrase = phrases[phraseIndex % phrases.length];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayedText.length < currentPhrase.length) {
        const jitter = Math.random() * 40;
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, typingSpeed + jitter);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), 0);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
    } else if (phase === "deleting") {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          const nextIndex = (phraseIndex + 1) % phrases.length;
          setPhraseIndex(nextIndex);
          onPhraseChange?.(nextIndex);
          setPhase("typing");
        }, deletingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    phase,
    currentPhrase,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    phrases.length,
    phraseIndex,
    onPhraseChange,
  ]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      <span className="ml-0.5 inline-block w-0.5 h-5 bg-current animate-blink" />
    </span>
  );
}
