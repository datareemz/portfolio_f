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
              I&apos;m Oluwaseyi Kareem — a Data/ML Engineer based in Canada.
              I enjoy working with/managing data or related infrastructure and trying out new
              AI/data technologies or trends. When I am AFK I am usually playing/watching soccer
              or learning about cars.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
              Current Role
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center">
              I currently work as an Intermediate Data Engineer for a sports, 
              fan-data analytics company. I build and maintain scalable data pipelines 
              and infrastructure. My day-to-day involves designing/optimizing ETL workflows, 
              optimizing data models to meet changing client requests, ensuring 
              reliable data delivery across different systems within the organization to 
              enhance data accuracy for our clients
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
