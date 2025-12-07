"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCategoryStore } from "./store/store";

interface Props {
    className?: string;
}
const mass = ["Драги", "таблы", "Кок", "PVP", "Дудки"];

export const Categories: React.FC<Props> = ({ className }) => {
    // const [activeIdx, setActiveIdx] = useState(0);
    const { activeId, setActiveId } = useCategoryStore();
    console.log("activeId: ", activeId);

    return (
        <div className={cn("inline-flex items-center gap-2", className)}>
            {mass.map((item, idx) => (
                <a
                    onClick={() => setActiveId(idx)}
                    href={`/#${item}`}
                    className={cn(
                        "text-white px-4 py-2 rounded-md bg-red-800 transition  hover:scale-110 active:scale-95 h-11 flex",
                        idx === activeId && "bg-primary shadow-black shadow-md ",
                    )}
                    key={item}>
                    <button>{item}</button>
                </a>
            ))}
        </div>
    );
};
