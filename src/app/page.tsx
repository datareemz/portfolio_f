import Hero from "@/components/Hero";
import FPLChart from "@/components/FPLChart";
import { parseFPLData } from "@/lib/parseFPLData";

export default function Home() {
  const fpl = parseFPLData();

  return (
    <main className="min-h-screen">
      <Hero />
      <section className="px-4 pt-2 pb-20 flex justify-center">
        <div className="w-full max-w-2xl">
          <FPLChart data={fpl.weeks} totalPoints={fpl.totalPoints} />
        </div>
      </section>
    </main>
  );
}
