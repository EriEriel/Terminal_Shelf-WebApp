"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Folder, Terminal, Setting, Logs, Code } from './Icons';

const NAV_ITEMS = [
  { label: 'ROOT', icon: Folder, href: '/dashboard' },
  { label: 'BINARIES', icon: Terminal, href: '/dashboard/binaries' },
  { label: 'SCRIPTS', icon: Code, href: '/dashboard/scripts' },
  { label: 'CONFIGS', icon: Setting, href: '/dashboard/configs' },
  { label: 'LOGS', icon: Logs, href: '/dashboard/logs' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] z-40 flex flex-col pt-8 bg-[#1d1d1d] w-64">

      {/* Header Section */}
      <div className="px-6 mb-10">
        <div className="font-mono font-bold text-lg text-white tracking-tighter">
          ARCHIVE_v1.0
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-1">
          Local Storage
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col grow">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`px-6 py-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest transition-all duration-150 ${isActive
                ? "text-black bg-white"
                : "text-stone-400 hover:bg-stone-800 hover:text-white"
                }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer Action */}
      <div className="p-6">
        <button
          onClick={() => console.log("Syncing...")}
          className="w-full border border-stone-600 text-stone-400 font-mono text-[10px] py-3 tracking-widest hover:border-white hover:text-white transition-all active:scale-[0.98]"
        >
          SYNC_DATABASE
        </button>
      </div>

    </aside>
  );
}
