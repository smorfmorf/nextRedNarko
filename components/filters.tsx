"use client";
import { Title } from "./title";
import { FilterCheckBox } from "./filter-checkbox";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/rangeslider";
import { FilterGroupCheckBox } from "./filter-group-checkbox";
import { use_Ingredients } from "@/hooks/use_Filter_Ingredients";
import { useDebounce, useSet } from "react-use";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
    className?: string;
}

interface PriceRange {
    priceFrom?: number;
    priceTo?: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
    // Хук Загрузка ингредиентов
    const { ingredients, loading } = use_Ingredients();
    const items = ingredients.map((item) => ({ value: item.id.toString(), text: item.name }));

    //? Это можно вынести в Хук use-Filters при желании:
    const searchParams = useSearchParams();

    // выбор категории
    const [selected_Ingredients, { toggle: toggle_Add_id }] = useSet<string>(
        new Set(searchParams?.get("ingredients")?.split(",")),
    );

    // выбор цена
    const [price, setPrice] = useState<PriceRange>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    function changePrice(value: string, type: keyof PriceRange) {
        setPrice((prev) => ({ ...prev, [type]: value }));
    }
    //? ___________________________________________________________

    // а эта штука берет фильтры и сохраняет их в URL, тоже можно Хуком
    const Router = useRouter();

    useDebounce(
        () => {
            const params = {
                ...price,
                ingredients: Array.from(selected_Ingredients),
            };

            const queryString = qs.stringify(params, {
                arrayFormat: "comma",
            });
            console.log("%cqueryString", "color:red", queryString);

            Router.push(`?${queryString}`, { scroll: false });
        },
        300,
        [price, selected_Ingredients],
    );
    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <div className="grid gap-4">
                <FilterCheckBox name="price" text="По цене" value="price" />
                <FilterCheckBox name="new" text="Новинки" value="new" />
            </div>

            <div className="mt-5 py-6 border-y mr-9">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={5000}
                        value={String(price.priceFrom)}
                        onChange={(event) => changePrice(String(event.target.value), "priceFrom")}
                    />
                    <Input
                        type="number"
                        placeholder="5000"
                        min={100}
                        max={5000}
                        value={String(price.priceTo)}
                        onChange={(event) => changePrice(String(event.target.value), "priceTo")}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={5000}
                    step={10}
                    value={price.priceFrom && price.priceTo ? [price.priceFrom, price.priceTo] : [0, 5000]}
                    onValueChange={([from, to]) => setPrice({ priceFrom: from, priceTo: to })}
                />
            </div>

            <FilterGroupCheckBox
                name="ingredients"
                loading={loading}
                className="mt-5"
                title="Категории"
                defaultItems={items.slice(0, 2)}
                items={items}
                onClickCheckbox={toggle_Add_id}
                selectedIdx={selected_Ingredients}
            />
        </div>
    );
};
