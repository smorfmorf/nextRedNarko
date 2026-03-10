import { DragsImage } from "@/components/Drags_Img";
import { ProductModal } from "@/components/modal-Drags";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import prisma from "@/prisma/prisma.client";
import { Ingredient, Product, ProductItem } from "@prisma/client";
// import { useRouter } from "next/navigation";

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };

interface PageProps {
  params: Promise<{ id: string }>;
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
  imageUrl: string;
  name: string;
}
// async page рендерится на сервере → React получает уже готовый HTML
// глазок (.) - следит за Link to="/product[id]"

export default async function ProductModalPage({ params, loading, onSubmit, className, imageUrl, name }: PageProps) {
  const { id } = await params; // ждём params, прежде чем использовать
  //   const router = useRouter(); onOpenChange={() => router.back()}

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
  console.log("product: ", product);

  return (
    <ProductModal className={className}>
      <div className={cn(className, "flex")}>
        <DragsImage imageUrl={product?.imageUrl || ""} size={30} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title text={product?.name || ""} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">Заголовок</p>

          <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">Добавить в корзину за {} ₽</Button>
        </div>
      </div>
    </ProductModal>
  );
}
