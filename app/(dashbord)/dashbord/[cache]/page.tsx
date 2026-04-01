import { cacheLife } from "next/dist/server/use-cache/cache-life";

type PageProps = {
  params: Promise<{ cache: string }>;
};
export default async function Page({ params }: PageProps) {
  "use cache";
  cacheLife("hours");

  console.log("RENDER PAGE");

  const { cache } = await params;
  return <div>Slug: {cache}</div>;
}
