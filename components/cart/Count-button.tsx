"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { CountIconButton } from "./Count-Icon-button";

export interface CountButtonProps {
  value?: number;
  size?: 1 | 2;
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({ className, onClick, value = 1, size = 1 }) => {
  return (
    <div className={cn("inline-flex items-center justify-between gap-3", className)}>
      <CountIconButton onClick={() => onClick?.("minus")} disabled={value === 1} size={size} type="minus" />

      <b className={size === 1 ? "text-sm" : "text-md"}>{value}</b>

      <CountIconButton onClick={() => onClick?.("plus")} size={size} type="plus" />
    </div>
  );
};
