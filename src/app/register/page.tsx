"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { registerUser } from "@/lib/actions/register"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const result = await registerUser(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Auto sign in after registration
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      callbackUrl: "/",
    })
  }

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-2xl font-semibold text-[#1a1a1a] tracking-tight"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            Create account
          </h1>
          <p className="text-sm text-[#888] mt-1">
            Start building your library
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs text-[#888] mb-1.5 tracking-wide">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="w-full px-3 py-2.5 text-sm bg-white border border-[#e5e5e5] rounded-lg outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#888] mb-1.5 tracking-wide">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2.5 text-sm bg-white border border-[#e5e5e5] rounded-lg outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          <div>
            <label className="block text-xs text-[#888] mb-1.5 tracking-wide">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full px-3 py-2.5 text-sm bg-white border border-[#e5e5e5] rounded-lg outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#ccc]"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] text-white text-sm rounded-lg hover:bg-[#2a2a2a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-xs text-[#aaa] text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#1a1a1a] underline underline-offset-2">
            Sign in
          </a>
        </p>

      </div>
    </div>
  )
}
