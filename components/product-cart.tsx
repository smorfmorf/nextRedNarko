"use client";
import Link from "next/link";
import { Title } from "./title";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    id: number;
    price: number;
    imageUrl: string;
    name: string;
}

export const ProductCart: React.FC<Props> = ({ className, id, price, imageUrl = "/narko2.jpeg", name }) => {
    return (
        <article className={cn("p-2", className)}>
            <Link href={`/product/${id}`}>
                <div className="grid place-items-center p-6 bg-secondary rounded-lg h-[260px]  ">
                    <img src={imageUrl} className="w-[220px] h-[220px]" />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">
                    Клад, близко к метро Комсомольская, не дорого, выглядит красиво, нормально.
                </p>

                <div className="flex items-center justify-between mt-4">
                    <b>от {price} ₽</b>

                    <Button type="button">
                        <Plus size={20} /> Добавить
                    </Button>
                </div>
            </Link>
        </article>
    );
};
