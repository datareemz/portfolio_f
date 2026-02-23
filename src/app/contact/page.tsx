import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Oluwaseyi Kareem",
  description: "Get in touch with Oluwaseyi Kareem",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &larr; Back home
        </Link>

        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mt-8 mb-4 text-center">
            Contact Me
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-lg mb-12">
            Got something to say? Let&apos;s chat.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <ContactForm />
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
