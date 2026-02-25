"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { assert } from "@/lib/assert";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 2000;

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  assert(MAX_FIELD_LENGTH > 0, "Max field length must be positive");
  assert(MAX_MESSAGE_LENGTH > 0, "Max message length must be positive");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length === 0) return;
    if (!EMAIL_REGEX.test(trimmedEmail)) return;
    if (trimmedMessage.length === 0) return;

    setStatus("sending");
    setErrorMsg("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
      }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const msg =
        body && typeof body.error === "string"
          ? body.error
          : "Something went wrong. Please try again.";
      setErrorMsg(msg);
      setStatus("error");
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xl font-semibold mb-2">Message sent!</p>
        <p className="text-gray-500 dark:text-gray-400">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          &larr; Back to home
        </Link>
      </motion.div>
    );
  }

  const isSending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          disabled={isSending}
          maxLength={MAX_FIELD_LENGTH}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-shadow disabled:opacity-50"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          disabled={isSending}
          maxLength={MAX_FIELD_LENGTH}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-shadow disabled:opacity-50"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
        >
          Let&apos;s Talk About?
        </label>
        <textarea
          id="message"
          required
          disabled={isSending}
          maxLength={MAX_MESSAGE_LENGTH}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-shadow resize-none disabled:opacity-50"
          placeholder="What's on your mind?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 dark:text-red-400">{errorMsg}</p>
      )}

      <motion.button
        type="submit"
        disabled={isSending}
        className="w-full py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
        whileHover={isSending ? {} : { scale: 1.02 }}
        whileTap={isSending ? {} : { scale: 0.98 }}
      >
        {isSending ? "Sending..." : "Send Message"}
      </motion.button>
    </form>
  );
}
