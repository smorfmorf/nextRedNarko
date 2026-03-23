import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
  className?: string;
  active?: boolean;
  imageUrl: string;
  name: string;
  price: number;
  onClick?: () => void;
}

export const Ingredient_CardMini: React.FC<Props> = ({ className, active, imageUrl, name, price, onClick }) => {
  return (
    <div
      className={cn(
        "grid place-items-center p-1 rounded-md w-24 text-center relative cursor-pointer shadow",
        {
          "border border-red-500": active,
        },
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-red-500" />}
      <img width={110} height={110} src={"/" + imageUrl} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font0bold">{price} ₽</span>
    </div>
  );
};
