"use client";
import React from "react";
import { ProductModal } from "./modal-Drags";
import { DragsImage } from "./Drags_Img";
import { Title } from "../title";
import { cn } from "@/lib/utils";
import { DragsVariants } from "./Drags_variants";
import { Button } from "../ui/button";
import { Ingredient_CardMini } from "./Ingredient-Cardmini";
import { useSet } from "react-use";
import { Ingredient as IngredientType, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: IngredientType[] };

interface Props {
    className?: string;
    product?: ProductWithRelations;
}

export const mapSize = {
    1: "Маленький пакет",
    2: "Средний стаф",
    3: "Для боссов",
};

export const mapType = {
    1: "Доставка",
    2: "Клад",
};

export type SizeValue = keyof typeof mapSize;
export type TypeValue = keyof typeof mapType;

export const sizesProducts = Object.entries(mapSize).map(([value, name]) => ({
    name: name,
    value: Number(value),
    disabled: false,
}));

export const typesProducts = Object.entries(mapType).map(([value, name]) => ({
    name: name,
    value: Number(value),
    disabled: false,
}));

export const ChoseDragsForm: React.FC<Props> = ({ className, product }) => {
    const [size, setSize] = React.useState<SizeValue>(1);
    const [type, setType] = React.useState<TypeValue>(1);
    const [selectedIngredients, { toggle }] = useSet(new Set<number>([]));

    // калькуляция
    const $findDrags = product?.items.find((item) => item.size === size && item.pizzaType === type)?.price || 0;
    const $totalIngredients = product?.ingredients
        .filter((Ingredient) => selectedIngredients.has(Ingredient.id))
        .reduce((acc, item) => acc + item.price, 0);

    const totalPrice = $findDrags + $totalIngredients!;
    console.log("findDrags: GET", $findDrags);

    //доступные размеры
    const filteredDragsByType = product?.items.filter((item) => item.pizzaType === type);
    const actualDragsSizes = sizesProducts.map((item) => {
        return {
            name: item.name,
            value: item.value,
            disabled: !filteredDragsByType?.some((drags) => drags.size === item.value),
        };
    });

    React.useEffect(() => {
        const isAvailableSize = actualDragsSizes?.find((item) => Number(item.value) === size && !item.disabled);
        const actualSize = actualDragsSizes?.find((item) => !item.disabled);

        if (!isAvailableSize) {
            setSize(Number(actualSize?.value) as SizeValue);
        }
    }, [type]);

    function handleAddToCart() {
        console.log({ size, type, selectedIngredients });
    }

    return (
        <ProductModal className={className}>
            <div className={cn(className, "flex")}>
                <DragsImage imageUrl={product?.imageUrl || ""} size={size} />

                <div className="w-[490px] bg-[#f7f6f5] p-7">
                    <Title text={product?.name || ""} size="md" className="font-extrabold mb-1" />

                    <div className="grid gap-2">
                        <DragsVariants
                            items={actualDragsSizes}
                            value={size}
                            onClick={(value) => setSize(value as SizeValue)}
                        />
                        <DragsVariants
                            items={typesProducts}
                            value={type}
                            onClick={(value) => setType(value as TypeValue)}
                        />

                        <div className="bg-gray-100 p-1 rounded-md h-[420px] overflow-auto scrollbar-thin">
                            <div className="grid grid-cols-3 gap-3">
                                {product?.ingredients.map((ingredient) => (
                                    <Ingredient_CardMini
                                        key={ingredient.id}
                                        name={ingredient.name}
                                        price={ingredient.price}
                                        imageUrl={ingredient.imageUrl}
                                        active={selectedIngredients.has(ingredient.id)}
                                        onClick={() => toggle(ingredient.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleAddToCart} className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                        Добавить в корзину за {totalPrice} ₽
                    </Button>
                </div>
            </div>
        </ProductModal>
    );
};
