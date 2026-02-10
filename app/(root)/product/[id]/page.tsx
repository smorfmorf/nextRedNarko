type PageProps = {
  params: Promise<{ id: string }>;
};
export default async function ProductModalPage({ params }: PageProps) {
  const { id } = await params; // ждём params, прежде чем использовать

  return (
    <div className="p-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Product Modal</h1>
      <p>Product ID: {id}</p>
    </div>
  );
}
