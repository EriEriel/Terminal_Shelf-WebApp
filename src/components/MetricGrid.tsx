import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

interface MetricProps {
  label: string;
  value: string;
  unit?: string;
  detail: string;
  trend: boolean;
}

const Metric = ({ label, value, unit, detail, trend }: MetricProps) => (
  <div className="flex flex-col items-center text-center text-white font-mono">
    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">
      {label}
    </span>
    <div className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white font-mono">
      {value}
      {unit && <span className="text-2xl font-normal ml-2">{unit}</span>}
    </div>
    <div className="flex items-center gap-2 mt-2 min-w-0">
      <span className={`shrink-0 w-2 h-2 ${trend ? "bg-white" : "bg-gray-700"}`}></span>
      <span className="text-[10px] font-mono tracking-normal text-gray-500 uppercase leading-tight break-words min-w-0">
        {detail}
      </span>
    </div>
  </div>
);

export default async function MetricGrid() {
  // Convert 24 hours into millise and subtract with current time since unix epoch
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const [totalEntries, recentEntries, completedEntries, popularShelf] =
    await Promise.all([
      prisma.entry.count(),
      prisma.entry.count({
        where: { createdAt: { gte: twentyFourHoursAgo } },
      }),
      prisma.entry.count({ where: { status: "COMPLETED" } }),
      prisma.shelf.findFirst({
        orderBy: { entries: { _count: "desc" } },
        include: { _count: { select: { entries: true } } },
      }),
    ]);

  const recentPercentage =
    totalEntries > 0
      ? ((recentEntries / totalEntries) * 100).toFixed(1)
      : "0.0";

  const popularShelfLabel = popularShelf
    ? `${popularShelf.name.toUpperCase()} [${popularShelf._count.entries}]`
    : "NO DATA";

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12 md:mb-24">
      <Metric
        label="Total Entries"
        value={String(totalEntries).padStart(4, "0")}
        detail={`+${recentPercentage}% IN LAST 24H`}
        trend={recentEntries > 0}
      />
      <Metric
        label="Top Shelf"
        value={popularShelf ? popularShelf._count.entries.toString().padStart(4, "0") : "0000"}
        detail={popularShelfLabel}
        trend={!!popularShelf}
      />
      <Metric
        label="Completed"
        value={String(completedEntries).padStart(4, "0")}
        detail={`${totalEntries > 0 ? ((completedEntries / totalEntries) * 100).toFixed(1) : "0.0"}% COMPLETION RATE`}
        trend={completedEntries > 0}
      />
    </section>
  );
}

