"use client";
import React from "react";
import { FilterCheckBox, FilterCheckBoxProps } from "./filter-checkbox";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

type Item = FilterCheckBoxProps;

interface Props {
  title: string; // заголовок группы чекбоксов
  items: Item[];
  defaultItems: Item[]; //при не раскрытом списке филтры
  className?: string;
  limit?: number;
  searchInputPlaceholder?: string; // для поиска по чекбоксам
  onClickCheckbox?: (id: string) => void; // вернет чекбокс который выбрали

  defaultValue?: string[]; // какие уже выбрали, фильтры

  loading?: boolean;
  selectedIdx?: Set<string>;
  name: string;
}

export const FilterGroupCheckBox: React.FC<Props> = ({
  className,
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  defaultValue,
  loading,
  onClickCheckbox,
  selectedIdx,
  name,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const list = showAll
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : defaultItems.slice(0, limit);

  function onChangeSelectInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  console.log("update component all");

  if (loading) {
    return (
      <div>
        <p className="font-bold mb-3">{title}</p>
        {...Array.from(defaultItems).map((_, idx) => <Skeleton className="h-8 mb-5 rounded-xl" />)}
      </div>
    );
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
              name={name}
              key={idx}
              text={item.text}
              value={item.value}
              checked={selectedIdx?.has(item.value) ?? false}
              // при каждом клике на checkbox будем в родителе получать его значение и сохранять в state
              onChange={() => onClickCheckbox?.(item.value)}
            />
          );
        })}
      </div>

      {items.length > limit && (
        <button
          className={`text-sm text-gray-500 mt-3  bg-black p-2 text-white rounded-xl  `}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Скрыть" : "+ Показать все"}
        </button>
      )}
    </article>
  );
};
