import BentoGrid from "@/components/BentoGrid";
import MetricGrid from "@/components/MetricGrid";
import StatusHeader from "@/components/StatusHeader";

export default async function TerminalHome({ searchParams }: { searchParams: Promise<{ search?: string }> }) {

  return (
    <main className="ml-64 mr-64 pt-24 px-12 pb-12 min-h-screen bg-[#202123] text-white">

      <StatusHeader />


      {/* Big Data Visualizations */}
      <MetricGrid />

      {/* Content Grid (Asymmetric Bento) */}
      <BentoGrid />

      {/* Footer Terminal Style */}
      {/* <TerminalFooter version="V.S.I_001" year="2026" /> */}
    </main>
  );

}
