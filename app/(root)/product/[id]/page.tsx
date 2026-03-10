<<<<<<< HEAD
import { prisma } from "@/prisma/prisma.client";
=======
import { Container } from "@/components/container";
import { DragsImage } from "@/components/Drags_Img";
import { DragsVariants } from "@/components/Drags_variants";
import prisma from "@/prisma/prisma.client";
import { notFound } from "next/navigation";
>>>>>>> 30a602672ad5c7f691d7fd8a6f5872544860851e

type PageProps = {
    params: Promise<{ id: string }>;
};

export default async function ProductModalPage({ params }: PageProps) {
    const { id } = await params; // ждём params, прежде чем использовать

<<<<<<< HEAD
    const rows = await prisma.$queryRaw<
        Array<{ id: number; name: string }>
    >`SELECT id, name FROM Product WHERE id = ${2}`;

    console.log(rows);

    return (
        <div className="p-10 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Product Modal</h1>
            <p>Product ID: {id}</p>
            <h3>{rows[0]?.name}</h3>
        </div>
    );
=======
  const [product] = await prisma.$queryRaw<
    Array<{ id: number; name: string; imageUrl: string }>
  >`SELECT id, name, imageUrl FROM Product WHERE id = ${2}`;

  console.log("rows: ", product);

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10 ">
      <div className="flex flex-1">
        <DragsImage imageUrl={product.imageUrl} size={20} />
        <div className="w-[500px] bg-[#fcfcfc] p-8">
          <h1 className="text-2xl font-bold mb-4">Product Modal</h1>
          <p>Product ID: {id}</p>
          <h3 className="mb-2">{product?.name}</h3>

          <DragsVariants
            items={[
              { name: "Драг", value: "drag", disabled: false },
              { name: "Драг", value: "drag", disabled: true },
              { name: "Драг", value: "drag", disabled: true },
            ]}
          />
        </div>
      </div>
    </Container>
  );
>>>>>>> 30a602672ad5c7f691d7fd8a6f5872544860851e
}
