"use client";
import { FilterCheckBox, FilterCheckBoxProps } from "./filter-checkbox";
import { Input } from "./ui/input";

type Item = FilterCheckBoxProps;

interface Props {
  title: string; // заголовок группы чекбоксов
  items: Item[];
  className?: string;
  defaultItems?: Item[]; //при не раскрытом списке филтры
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
  return (
    <div className={className}>
      <h3 className="font-bold mb-3">{title}</h3>

      <Input
        type="text"
        placeholder={searchInputPlaceholder}
        className="bg-gray-50 border-none mb-5"
      />

      {/* Список чекбоксов*/}
      <div className="grid gap-4 max-h-96  overflow-auto pr-2 border border-gray-100 rounded p-1 castomScroll_Bar">
        {items.map((item, idx) => {
          return (
            <FilterCheckBox
              key={idx}
              text={item.text}
              value={item.value}
              checked={false}
              // при каждом клике на checkbox будем в родителе получать его значение и сохранять в state
              onChange={(idx) => console.log(idx)}
            />
          );
        })}

        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
        <p>12</p>
        <p>12</p>

        <p>12</p>

        <p>12</p>
        <p>12</p>
      </div>
    </div>
  );
};
