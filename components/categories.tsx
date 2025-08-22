"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  className?: string;
}
const mass = ["Все", "Драки", "Кок", "PVP", "Дудки"];

export const Categories: React.FC<Props> = ({ className }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {mass.map((item, idx) => (
        <a
          onClick={() => setActiveIdx(idx)}
          href="#"
          className={cn(
            "text-white px-4 py-2 rounded-md bg-red-800 transition  hover:scale-110 active:scale-95 h-11 flex",
            idx === activeIdx && "bg-primary shadow-black shadow-md "
          )}
          key={item}
        >
          <button>{item}</button>
        </a>
      ))}
    </div>
  );
};
