"use client";

export function SearchBar() {
  return (
    <form method="get" action="/archive">
      <input
        name="search"
        placeholder="$ search entry_"
        className="bg-[#1a1b1d] border border-[#2f3133] text-green-400 placeholder:text-[#374151] font-mono text-sm px-3 h-9 w-64 focus:outline-none focus:border-green-400 transition-colors"
      />
    </form>
  )
}
