import { cacheLife } from "next/dist/server/use-cache/cache-life";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

type PageProps = {
    params: Promise<{ slug: string }>;
};
export default async function Page({ params }: PageProps) {
    "use cache";
    cacheLife("hours");

    console.log("RENDER PAGE");

    const { slug } = await params;
    return <div>Slug: {slug}</div>;
}
