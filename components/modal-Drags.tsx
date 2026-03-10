"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ProductModal({ children, className }: { children: React.ReactNode; className?: string }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className={cn("p-0 w-[1060px]! max-w-[1060px]! min-h-[500px] bg-white overflow-hidden", className)}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
