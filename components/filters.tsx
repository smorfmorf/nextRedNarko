import { Title } from "./title";
import { FilterCheckBox } from "./filter-checkbox";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/rangeslider";
import { FilterGroupCheckBox } from "./filter-group-checkbox";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <div className="grid gap-4">
        <FilterCheckBox text="По цене" value="price" />
        <FilterCheckBox text="Новинки" value="new" />
      </div>

      <div className="mt-5 py-6 border-y mr-9">
        <p className="font-bold mb-3">Цена от и до:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={5000}
            defaultValue={0}
          />
          <Input type="number" placeholder="5000" min={100} max={5000} />
        </div>

        <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
      </div>

      <FilterGroupCheckBox
        className="mt-5"
        title="Категории"
        defaultItems={[
          { value: "1", text: "Категория 1" },
          { value: "2", text: "Категория 2" },
          { value: "3", text: "Категория 3" },
          { value: "4", text: "Категория 4" },
          { value: "5", text: "Категория 5" },
        ]}
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
      />
    </div>
  );
};
