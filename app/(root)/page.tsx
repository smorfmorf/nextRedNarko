import { Container } from "@/components/container";
import DomeGallery from "@/components/DomeGallery";
import { Filters } from "@/components/filters";

import { ProductsGroupList } from "@/components/products-group-list";
import { Title } from "@/components/title";
import { TopBar } from "@/components/topbar";
import { prisma } from "@/prisma/prisma.client";
import { postAction } from "@/server-actions/postAction";

export default async function Home({
    searchParams,
}: {
    searchParams?: {
        priceFrom?: string;
        priceTo?: string;
        ingredients?: string;
    };
}) {
    const ingredientsIdArr = searchParams!.ingredients?.split(",").map(Number);
    const minPrice = Number(searchParams!.priceFrom) || 0;
    const maxPrice = Number(searchParams!.priceTo) || 10_000;

    const categories = await prisma.category.findMany({
        include: {
            // добавляем инфу о products
            products: {
                where: {
                    // фильтрация по категории
                    ingredients: ingredientsIdArr
                        ? {
                              some: {
                                  id: {
                                      in: ingredientsIdArr,
                                  },
                              },
                          }
                        : undefined,
                    // фильтрация по цене товаров (хотя бы 1)
                    items: {
                        some: {
                            price: {
                                gte: minPrice, // >=
                                lte: maxPrice, // <=
                            },
                        },
                    },
                },
                // добавляем инфу о items(productItem)
                include: {
                    ingredients: true,
                    items: {
                        orderBy: { price: "asc" },
                        // фильтруем по цене, чтобы пропадали ненужные
                        where: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice,
                            },
                        },
                    },
                },
            },
        },
    });
    console.log("categories: ", categories);

    return (
        <div>
            <form action={postAction}>
                <input type="text" name="username" placeholder="Enter username" />
                <button type="submit" className="bg-amber-200 p-2">
                    Submit
                </button>
            </form>

            <div style={{ width: "100%", height: "400px" }}>
                <DomeGallery />
            </div>
            <div className="px-4">
                <Container className="mt-10">
                    <Title text="Все draggi..." size="lg" className="font-extrabold" />
                </Container>
                <TopBar categories={categories.filter((category) => category.products.length > 0)} />

                <Container className="mt-10 pb-10">
                    <div className="flex gap-[60px]">
                        {/* Фильтрация-левая часть */}
                        <div className="w-[250px] border-r-2">
                            <Filters />
                        </div>

                        {/* Посты, отдельный компонент который будет рендерить группу продуктов - ProductsGroupList */}
                        <div className="flex-1">
                            <div className="grid gap-16 ">
                                {categories.map(
                                    (category) =>
                                        category.products.length > 0 && (
                                            <ProductsGroupList
                                                key={category.id}
                                                items={category.products}
                                                title={category.name}
                                                categoryId={category.id}
                                            />
                                        ),
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
