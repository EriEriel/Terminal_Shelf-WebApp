"use client"

import { useEffect, useState } from "react"

const lines = {
  curated: [
    { prompt: true, text: "cat curated.md" },
    { prompt: false, text: "// hand-picked reads from the shelf" },
    { prompt: true, text: "ls entries --filter=starred" },
    { prompt: false, text: "the-rust-programming-language.md" },
    { prompt: false, text: "designing-data-intensive-apps.md" },
    { prompt: false, text: "a-philosophy-of-software-design.md" },
    { prompt: true, text: "whoami" },
    { prompt: false, text: "ERROR: no session found. sign in to access." },
  ],
  archive: [
    { prompt: true, text: "cat archive.md" },
    { prompt: false, text: "// your full reading archive lives here" },
    { prompt: true, text: "ls entries --all" },
    { prompt: false, text: "permission denied: unauthenticated" },
    { prompt: true, text: "sudo ls entries --all" },
    { prompt: false, text: "sudo: no session token found" },
    { prompt: true, text: "sign-in --provider=github" },
    { prompt: false, text: "redirecting to auth... waiting for you." },
  ],
}

export default function TerminalTypewriter({ page }: { page: "curated" | "archive" }) {
  const [displayedLines, setDisplayedLines] = useState<{ prompt: boolean; text: string }[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [done, setDone] = useState(false)

  const script = lines[page]

  useEffect(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentText("")
    setDone(false)
  }, [page])

  useEffect(() => {
    if (currentLineIndex >= script.length) {
      setDone(true)
      return
    }

    const fullText = script[currentLineIndex].text
    if (currentText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1))
      }, 35 + Math.random() * 20)
      return () => clearTimeout(timeout)
    }

    // current line finished typing — pause then move to next
    const timeout = setTimeout(() => {
      setDisplayedLines(prev => [...prev, script[currentLineIndex]])
      setCurrentText("")
      setCurrentLineIndex(prev => prev + 1)
    }, script[currentLineIndex].prompt ? 400 : 200)

    return () => clearTimeout(timeout)
  }, [currentText, currentLineIndex, script])

  const isTyping = currentLineIndex < script.length
  const currentLine = script[currentLineIndex]

  return (
    <div className="w-full max-w-lg font-mono text-sm space-y-1">
      {displayedLines.map((line, i) => (
        <div key={i} className="leading-relaxed">
          {line.prompt
            ? <><span className="text-green-400">$ </span><span className="text-zinc-300">{line.text}</span></>
            : <span className="text-zinc-500 pl-4">// {line.text}</span>
          }
        </div>
      ))}

      {isTyping && (
        <div className="leading-relaxed">
          {currentLine.prompt
            ? <><span className="text-green-400">$ </span><span className="text-zinc-300">{currentText}</span></>
            : <span className="text-zinc-500 pl-4">// {currentText}</span>
          }
          <span className="inline-block w-2 h-4 bg-green-400 align-middle animate-[blink_1s_step-end_infinite]" />
        </div>
      )}
    </div>
  )
}
