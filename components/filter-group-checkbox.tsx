"use client";
import React from "react";
import { FilterCheckBox, FilterCheckBoxProps } from "./filter-checkbox";
import { Input } from "./ui/input";

type Item = FilterCheckBoxProps;

interface Props {
    title: string; // заголовок группы чекбоксов
    items: Item[];
    defaultItems: Item[]; //при не раскрытом списке филтры
    className?: string;
    limit?: number;
    searchInputPlaceholder?: string; // для поиска по чекбоксам
    onChange?: (checked: boolean) => void; // вернет чекбокс который выбрали

    defaultValue?: string[]; // какие уже выбрали, фильтры
}

export const FilterGroupCheckBox: React.FC<Props> = ({
    className,
    title,
    items,
    defaultItems,
    limit = 5,
    searchInputPlaceholder = "Поиск...",
    onChange,
    defaultValue,
}) => {
    const [searchValue, setSearchValue] = React.useState("");
    const [showAll, setShowAll] = React.useState(false);
    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItems.slice(0, limit);

    function onChangeSelectInput(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    return (
        <article className={className}>
            <h3 className="font-bold mb-3">{title}</h3>

            {showAll && (
                <Input
                    value={searchValue}
                    onChange={onChangeSelectInput}
                    type="text"
                    placeholder={searchInputPlaceholder}
                    className="bg-gray-300  mb-5"
                />
            )}

            {/* Список чекбоксов*/}
            <div className="grid gap-4 max-h-96 overflow-auto pr-2 border border-gray-100 rounded p-1 castomScroll_Bar">
                {list.map((item, idx) => {
                    console.log("item: ", item.checked);
                    return (
                        <FilterCheckBox
                            key={idx}
                            text={item.text}
                            value={item.value}
                            checked={item.checked}
                            // при каждом клике на checkbox будем в родителе получать его значение и сохранять в state
                            onChange={(idx) => console.log(idx)}
                        />
                    );
                })}
            </div>

            {items.length > limit && (
                <button
                    className={`text-sm text-gray-500 mt-3  bg-black p-2 text-white rounded-xl  `}
                    onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Скрыть" : "+ Показать все"}
                </button>
            )}
        </article>
    );
};
