import { Container } from "@/components/container";
import { DragsImage } from "@/components/Drags_Img";
import { DragsVariants } from "@/components/Drags_variants";
import prisma from "@/prisma/prisma.client";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductModalPage({ params }: PageProps) {
  const { id } = await params; // ждём params, прежде чем использовать

  const [product] = await prisma.$queryRaw<
    Array<{ id: number; name: string; imageUrl: string }>
  >`SELECT id, name, imageUrl FROM Product WHERE id = ${2}`;

  console.log("rows: ", product);

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10  ">
      <div className="flex flex-1">
        <DragsImage imageUrl={product.imageUrl} size={20} />
        <div className="w-[500px]  bg-[#fcfcfc] p-8">
          <h1 className="text-2xl font-bold mb-4">Product Modal</h1>
          <p>Product ID: {id}</p>
          <h3 className="mb-2">{product?.name}</h3>

          <DragsVariants
            items={[
              { name: "Драг", value: "drag1", disabled: false },
              { name: "Опиаты", value: "drag2", disabled: false },
              { name: "Размешенная", value: "drag3", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
