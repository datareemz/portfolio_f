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
      <div className="max-w-4xl mx-auto px-4 py-10">
        <Link
          href="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          &larr; Back home
        </Link>

        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-bold mt-6 mb-3 text-center">
            About Me
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center text-lg mb-6">
            A little bit about who I am.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="prose dark:prose-invert mx-auto mb-6 max-w-2xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
            <p>
              I&apos;m Oluwaseyi Kareem — a Data/ML Engineer based in Canada.
              Your not-so typical nerd that occasionally games (currently playing Battlefield VI) and enjoys
              playing soccer. Currently playing for Calgary Centaurs in the Men's Premier Division. Huge fan of data side projects
              or exploring anything that peaks my interests. Really into cars at the moment, reading about different engine specs and what not.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="max-w-2xl mx-auto mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
              Current Role
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              I currently work as an Intermediate Data Engineer for a sports,
              fan-data analytics company. I build and maintain scalable data pipelines
              and infrastructure to handle the ETL of our cleints data from various sources.
              My day-to-day involves designing/optimizing ETL workflows,optimizing data models 
              to meet changing client requests, ensuring reliable data delivery across 
              different systems within the organization to enhance data accuracy for our clients.
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
