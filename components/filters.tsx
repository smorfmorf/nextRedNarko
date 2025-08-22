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
        items={[{ value: "1", text: "Категория 1" }]}
      />
    </div>
  );
};
