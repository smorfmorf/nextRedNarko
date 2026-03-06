"use client";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "./store/store";
import { Category } from "@prisma/client";

interface Props {
    className?: string;
    items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {
    const { activeId, setActiveId } = useCategoryStore();

    return (
        <div className={cn("inline-flex items-center gap-2", className)}>
            {items.map(({ name, id }, idx) => (
                <a
                    onClick={() => setActiveId(idx)}
                    href={`/#${name}`}
                    className={cn(
                        "text-white px-4 py-2 rounded-md bg-red-800 transition  hover:scale-110 active:scale-95 h-11 flex",
                        id === activeId && "bg-primary shadow-black shadow-md ",
                    )}
                    key={id}>
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
