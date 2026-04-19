import LoginModal from "./LoginModal"
import TerminalTypewriter from "./TerminalTypewriter"

export default function NonSessionScreen({ page }: { page: "curated" | "archive" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <TerminalTypewriter page={page} />
      <div className="flex gap-3 mt-8">
        <LoginModal
          trigger={
            <button
              className="w-full font-mono text-sm text-green-400 border border-green-400 px-4 h-9 hover:bg-green-400 hover:text-[#1a1b1d] transition-colors cursor-pointer tracking-widest"
            >
              $ Sign in
            </button>
          }
        />
      </div>
    </div>
  )
}
