import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import ImageGallery from "@/components/ImageGallery";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Oluwaseyi Kareem",
  description: "About Oluwaseyi Kareem",
};

export default function AboutPage() {
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
            About Me
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-lg mb-12">
            A little bit about who I am.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="prose dark:prose-invert mx-auto mb-12 max-w-2xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            <p>
              I&apos;m Oluwaseyi Kareem — a Data Engineer based in Canada with
              a Computer Science degree. I build data pipelines, ML-powered
              tools, and the occasional side project that may or may not ship.
              When I&apos;m not wrangling data, I&apos;m probably tweeting hot
              takes or debating whether soup is cereal.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Current Role
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              I currently work as a Data Engineer, building and maintaining
              scalable data pipelines and infrastructure. My day-to-day involves
              designing ETL workflows, optimizing data models, and ensuring
              reliable data delivery across the organization.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.6}>
          <ImageGallery />
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}
