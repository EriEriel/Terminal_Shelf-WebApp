"use client";

import { createShelf } from "@/lib/actions/shelf-action";
import { Shelf } from "@/types/types"
import { useEffect, useActionState } from "react";
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
    if (state?.error === null && open) {
      // success — close dialog
      onOpenChange?.(false);
    }
  }, [state, open, onOpenChange]);

  return (
    <Dialog modal={false} open={open} onOpenChange={onOpenChange}>
      {/* Header */}
      <DialogContent className="border border-[#2f3133] bg-[#202122] text-white font-mono rounded-none w-[95vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-green-400 text-sm tracking-widest uppercase">
            $ Add New Shelf
          </DialogTitle>
          <DialogDescription className="text-[#4b5563] text-xs">
            {"// Create a new shelf to organize your entries"}
          </DialogDescription>
        </DialogHeader>

        <form key={state?.error === null ? "reset" : "form"} action={formAction} className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              name="name"
              placeholder="Shelf name"
              className="flex-1 bg-[#16171a] border border-[#2f3133] text-slate-200 text-xs px-2 py-2 focus:outline-none focus:border-green-400 placeholder:text-[#374151] font-mono transition-colors w-full"
            />
            <button
              type="submit"
              disabled={isPending}
              className="font-mono text-xs text-[#1a1b1d] bg-green-400 border border-green-400 px-4 py-2 hover:bg-green-300 transition-colors tracking-wide w-full sm:w-auto shrink-0"
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
