"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assert } from "@/lib/assert";

interface ImageItem {
  id: number;
  alt: string;
}

const PLACEHOLDER_IMAGES: ImageItem[] = [
  { id: 1, alt: "Photo 1" },
  { id: 2, alt: "Photo 2" },
  { id: 3, alt: "Photo 3" },
];

const MAX_IMAGES = 12;

export default function ImageGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  assert(PLACEHOLDER_IMAGES.length > 0, "Must have at least one image");
  assert(PLACEHOLDER_IMAGES.length <= MAX_IMAGES, "Too many images");

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {PLACEHOLDER_IMAGES.map((img) => (
          <motion.button
            key={img.id}
            layoutId={`image-${img.id}`}
            onClick={() => setSelectedId(img.id)}
            className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gray-400 dark:text-gray-500 text-sm">
              {img.alt}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                layoutId={`image-${selectedId}`}
                className="w-full max-w-lg aspect-square rounded-2xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                onClick={() => setSelectedId(null)}
              >
                <span className="text-gray-400 dark:text-gray-500 text-lg">
                  {PLACEHOLDER_IMAGES.find((img) => img.id === selectedId)?.alt}
                </span>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
