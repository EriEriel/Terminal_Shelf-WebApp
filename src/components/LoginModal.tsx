"use client";

import LoginPage from "@/app/login/page";
import { Button } from "@/components/ui/button"
import { addEntry } from "./actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-black text-xl p-6 hover:shadow-md transition-shadow">LogIn</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader> <DialogTitle></DialogTitle>
        </DialogHeader>
        <LoginPage />
      </DialogContent>
    </Dialog>
  )
}
