import React, { RefObject } from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCart } from "./product-cart";
import { useCategoryStore } from "./store/store";
import { useIntersection } from "react-use";
interface Props {
    className?: string;
    items: any[];
    title: string;
    categoryId: number;
}

// есть главный див и он будет рендерить список продуктов и на верху должен быть заголовок группы, далее рендер списка товаров

export const ProductsGroupList: React.FC<Props> = ({ className, items, title, categoryId }) => {
    const setActiveId = useCategoryStore((state) => state.setActiveId);

    // Это ссылка на DOM-элемент, за которым ты хочешь следить (от этого блока будем делать что-то)
    const intersectionRef = React.useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>;
    // Это хук, который возвращает объект, содержащий инфу о пересечении:
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });
    // следит за конкретным блоком и обновляет активную категорию, когда этот блок появляется в зоне видимости.
    React.useEffect(() => {
        if (intersection?.isIntersecting) {
            console.log("categoryId: ", categoryId);
            console.log("Активируем категорию", title);

            setActiveId(categoryId);
        }
    }, [intersection?.isIntersecting]);

    return (
        <div id={title} ref={intersectionRef} className={className}>
            <Title size="lg" className="font-extrabold mb-5" text={title} />

            <div className={cn("grid grid-cols-3 gap-10 place-items-center", className)}>
                {items.map((item, idx) => (
                    <ProductCart key={idx} id={item.id} price={item.price} imageUrl={item.imageUrl} name={item.name} />
                ))}
            </div>
        </div>
    );
};
