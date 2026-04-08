"use client";

import { createShelf } from "@/lib/actions/shelf-action";
import { Shelf } from "@/types/types"
import { useEffect } from "react";
import { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ShelvesEditModalProps {
  shelves: Shelf[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ShelvesEditModal({ shelves, open, onOpenChange }: ShelvesEditModalProps) {

  const [state, formAction, isPending] = useActionState(createShelf, null);

  useEffect(() => {
    if (state?.error === null) {
      // success — close dialog, reset whatever
      onOpenChange?.(false);
    }
  }, [state]);
  <form action={formAction}>
    {state?.error && <p>{state.error}</p>}
    ...
  </form>

  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      {/* Header */}
      <DialogContent className="border border-[#2f3133] bg-[#202122] text-white font-mono rounded-none max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-sm tracking-widest uppercase">
            $ Add New Shelf
          </DialogTitle>
          <DialogDescription className="text-[#4b5563] text-xs">
        // Manage your shelf here
          </DialogDescription>
        </DialogHeader>

        <form key={state?.error === null ? "reset" : "form"} action={formAction} className="space-y-3 pt-2">
          <div className="flex gap-2">
            <input
              name="name"
              placeholder="Shelf name"
              className="flex-1 bg-[#16171a] border border-[#2f3133] text-slate-200 text-xs px-2 py-1.5 focus:outline-none focus:border-green-400 placeholder:text-[#374151] font-mono transition-colors"
            />
            <button
              type="submit"
              disabled={isPending}
              className="font-mono text-xs text-[#1a1b1d] bg-green-400 border border-green-400 px-4 py-1.5 hover:bg-green-300 transition-colors tracking-wide"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>
          {state?.error && <p className="text-red-400 text-xs">{state.error}</p>}
        </form>

      </DialogContent>
    </Dialog>
  );
}
