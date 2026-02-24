import prisma from "@/prisma/prisma.client";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductModalPage({ params }: PageProps) {
  const { id } = await params; // ждём params, прежде чем использовать

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
}
