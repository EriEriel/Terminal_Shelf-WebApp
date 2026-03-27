"use client";

import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import Image from "next/image"
import LoginPage from "@/app/login/page"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LoginModal() {
  const { data: session, status } = useSession()
  const [open, setOpen] = useState(false)

  if (status === "loading") return null

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image ? (
          <Image
            src={session.user.image}
            alt="avatar"
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white text-sm flex items-center justify-center">
            {session.user?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <span className="text-sm font-medium">{session.user?.name}</span>
        <Button
          variant="outline"
          className="cursor-pointer text-black text-sm"
          onClick={() => signOut()}
        >
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-black text-xl p-6 hover:shadow-md transition-shadow">
          LogIn
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <LoginPage />
      </DialogContent>
    </Dialog>
  )
}
