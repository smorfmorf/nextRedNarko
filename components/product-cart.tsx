import Link from "next/link";
import { Title } from "./title";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface Props {
  className?: string;
  id: number;
  price: number;
  imageUrl: string;
  name: string;
}

export const ProductCart: React.FC<Props> = ({
  className,
  id,
  price,
  imageUrl = "https://media.dodostatic.net/image/r:292x292/0198bf3e424371b49f0b8d7dbe320a70.avif",
  name,
}) => {
  return (
    <article className={className}>
      <Link href={`/product/${id}`}>
        <div className="grid place-items-center p-6 bg-secondary rounded-lg h-[260px] ">
          <img src={imageUrl} className="w-[220px] h-[220px]" />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="text-sm text-gray-400">
          Клад, близко к метро Комсомольская, не дорого, выглядит красиво,
          нормально.
        </p>

        <div className="flex items-center justify-between mt-4">
          <b>от {price || 500} ₽</b>

          <Button type="button">
            <Plus size={20} /> Добавить
          </Button>
        </div>
      </Link>
    </article>
  );
};
