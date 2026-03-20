"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function ProductModal({ children, className }: Props) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className={cn("p-0 w-[1060px]! max-w-[1060px]! min-h-[500px] bg-white overflow-hidden", className)}
      >
        <DialogTitle></DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
}
