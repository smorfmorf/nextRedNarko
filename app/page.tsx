"use client";
import { Container } from "@/components/container";
import DomeGallery from "@/components/DomeGallery";
import { Filters } from "@/components/filters";

import { ProductsGroupList } from "@/components/products-group-list";
import { Title } from "@/components/title";
import { TopBar } from "@/components/topbar";

import { postAction } from "@/server-actions/postAction";

export default function Home() {
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
                <TopBar />

                <Container className="mt-10 pb-10">
                    <div className="flex gap-[60px]">
                        {/* Фильтрация-левая часть */}
                        <div className="w-[250px] border-r-2">
                            <Filters />
                        </div>

                        {/* Посты, отдельный компонент который будет рендерить группу продуктов - ProductsGroupList */}
                        <div className="flex-1">
                            <div className="grid gap-16 ">
                                <ProductsGroupList
                                    title="Драги"
                                    categoryId={0}
                                    items={[{ id: 1, price: 666, name: "КокиОтСмоки" }]}
                                />
                                <ProductsGroupList
                                    categoryId={1}
                                    title="таблы"
                                    items={[
                                        {
                                            id: 0,
                                            imageUrl:
                                                "https://media.dodostatic.net/image/r:292x292/0194d4fd39bb7352bfa5de2219e88b9b.avif",
                                            name: "Маргарита",
                                            price: "500 руб.",
                                        },
                                        {
                                            id: 1,
                                            imageUrl:
                                                "https://media.dodostatic.net/image/r:292x292/0194d4fd39bb7352bfa5de2219e88b9b.avif",
                                            name: "Пеперони",
                                            price: "600 руб.",
                                        },
                                        {
                                            id: 2,
                                            imageUrl:
                                                "https://media.dodostatic.net/image/r:292x292/0194d4fd39bb7352bfa5de2219e88b9b.avif",
                                            name: "Четыре сыра",
                                            price: "700 руб.",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
