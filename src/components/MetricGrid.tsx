const Metric = ({ label, value, unit, detail, trend }: any) => (
  <div className="flex flex-col gap-2">
    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500">{label}</span>
    <div className="text-8xl font-black tracking-tighter text-white font-mono">
      {value}
      {unit && <span className="text-2xl font-normal ml-2">{unit}</span>}
    </div>
    <div className="flex items-center gap-2 mt-2">
      <span className={`w-2 h-2 ${trend ? 'bg-white' : 'bg-gray-700'}`}></span>
      <span className="text-[10px] font-mono text-gray-500 uppercase">{detail}</span>
    </div>
  </div>
);

export default function MetricGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
      <Metric label="Total Volumes" value="1,402" detail="+12.4% Since Boot" trend />
      <Metric label="Recent Sync" value="0.04" unit="ms" detail="Latency Stabilized" />
      <Metric label="System Load" value="22%" detail="Optimized Node" trend />
    </section>
  );
}
