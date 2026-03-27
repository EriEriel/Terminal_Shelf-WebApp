import { Memory, Hub, Analytics } from '@/components/Icons';

export default function BentoGrid() {
  const logs = [
    { time: "14:02:11", msg: "Sync_Request: Accepted" },
    { time: "13:58:04", msg: "Buffer_Overflow: Resolved" },
    { time: "13:42:55", msg: "Encryption_Handshake: OK" },
  ];

  return (
    <section className="grid grid-cols-12 gap-6">
      {/* Large Card */}
      <div className="col-span-12 md:col-span-8 bg-[#1a1a1a] p-8 flex flex-col justify-between min-h-[100]">
        <div>
          <div className="flex justify-between items-start mb-12">
            <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">Index // Core_Node_01</div>
            <span className="text-white">●</span>
          </div>
          <h3 className="text-4xl font-bold tracking-tight mb-4">Recursive Library Mapping</h3>
          <p className="text-gray-400 max-w-md text-sm leading-relaxed">
            Automatic indexing of sub-sector binaries initialized. System parsing 4.2TB of metadata.
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 bg-white text-black text-[10px] font-mono uppercase font-bold hover:bg-white transition-colors">Details</button>
          <button className="px-6 py-2 border border-gray-700 text-white text-[10px] font-mono uppercase hover:bg-white/10 transition-colors">Execute</button>
        </div>
      </div>

      {/* Log Card */}
      <div className="col-span-12 md:col-span-4 bg-[#1e1e1e] p-8 border-l border-white/5">
        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-8">Active_Log</div>
        <div className="space-y-6">
          {logs.map((log, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-xs text-white font-mono">{log.time}</span>
              <span className="text-xs text-gray-400 font-mono uppercase">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Small Stat Cards... (continued with similar logic) */}
    </section>
  );
}
