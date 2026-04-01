import { ChoseDragsForm } from "@/components/modal_and_product/Chose-DragsForm";
import prisma from "@/prisma/prisma.client";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import React from "react";
// import { useRouter } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
    loading?: boolean;
    onSubmit: (itemId: number, ingredients: number[]) => void;
    className?: string;
    imageUrl: string;
    name: string;
}

// async page рендерится на сервере → React получает уже готовый HTML
// глазок (.) - следит за Link to="/product/[id]"

export default async function ProductModalPage({ params, loading, onSubmit, className, imageUrl, name }: PageProps) {
    const { id } = await params; // ждём params, прежде чем использовать

    //   const [product] = await prisma.$queryRaw<
    //     Array<{ id: number; name: string; imageUrl: string }>
    //   >`SELECT id, name, imageUrl FROM Product WHERE id = ${2}`;

    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            ingredients: true,
            items: true,
        },
    });

    return <ChoseDragsForm product={product ?? undefined} />;
}
