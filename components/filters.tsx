import { Title } from "./title";
import { FilterCheckBox } from "./filter-checkbox";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/rangeslider";
import { FilterGroupCheckBox } from "./filter-group-checkbox";
import { use_Filter_Ingredients } from "@/hooks/use_Filter_Ingredients";
import { useSet } from "react-use";
import { useEffect, useState } from "react";
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
  const Router = useRouter();
  const searchParams = useSearchParams();

  const { ingredients, loading, selected_Ingredients, toggle_Add_id } = use_Filter_Ingredients(
    searchParams?.get("ingredients"),
  );
  console.log("selected_Ingredients: ", selected_Ingredients);
  const items = ingredients.map((item) => ({ value: item.id.toString(), text: item.name }));

  const [price, setPrice] = useState<PriceRange>({});

  function changePrice(value: string, type: keyof PriceRange) {
    setPrice((prev) => ({ ...prev, [type]: value }));
  }

  useEffect(() => {
    const filters = {
      ...price,
      ingredients: Array.from(selected_Ingredients),
    };

    const queryString = qs.stringify(filters, {
      arrayFormat: "comma",
    });
    console.log("queryString: ", queryString);

    Router.push(`?${queryString}`, { scroll: false });
  }, [selected_Ingredients, price]);

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
            value={String(price.priceFrom) || "0"}
            onChange={(event) => changePrice(String(event.target.value), "priceFrom")}
          />
          <Input
            type="number"
            placeholder="5000"
            min={100}
            max={5000}
            value={String(price.priceTo) || "5000"}
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
        defaultItems={items}
        items={[
          { value: "1", text: "Категория 1" },
          { value: "2", text: "Категория 2" },
          { value: "3", text: "Категория 3" },
          { value: "4", text: "Категория 4" },
          { value: "5", text: "Категория 5" },
          { value: "6", text: "Категория 6" },
          { value: "7", text: "Категория 7" },
          { value: "8", text: "Категория 8" },
          { value: "9", text: "Категория 9" },
          { value: "10", text: "Категория 10" },
          { value: "11", text: "Категория 11" },
          { value: "12", text: "Категория 12" },
          { value: "13", text: "Категория 13" },
          { value: "14", text: "Категория 14" },
          { value: "15", text: "Категория 15" },
          { value: "16", text: "Категория 16" },
          { value: "17", text: "Категория 17" },
          { value: "18", text: "Категория 18" },
          { value: "19", text: "Категория 19" },
          { value: "20", text: "Категория 20" },
        ]}
        onClickCheckbox={toggle_Add_id}
        selectedIdx={selected_Ingredients}
      />
    </div>
  );
};
