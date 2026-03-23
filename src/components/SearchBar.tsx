"use client";

export function SearchBar() {
  return (
    <form method="get" action="/">
      <input
        name="search"
        placeholder="Search Entry"
        className="border border-gray-300 rounded p-2 w-64 h-10"
      />
    </form>
  )
}
