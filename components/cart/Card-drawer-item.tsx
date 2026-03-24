import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { mapType } from "../modal_and_product/Chose-DragsForm";
import { Ingredient } from "@prisma/client";
import { CartItemInfo } from "./Cart-item-info";
import { CountButton } from "./Count-button";

export function getCartItemsDetails({
  ingredients,
  size,
  type,
}: {
  size: 1 | 2 | 3;
  type: 1 | 2;
  ingredients: Ingredient[];
}) {
  const detailsArr = [];

  if (size) {
    const typeName = mapType[type];
    detailsArr.push(`${typeName} ${size}г) `);
  }

  if (ingredients) {
    detailsArr.push(...ingredients.map((item) => item.name));
  }

  return detailsArr.join(", ");
}

interface Props {
  className?: string;
  name: string;
  details: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
}
export const CartDrawerItem: React.FC<Props> = ({
  imageUrl,
  className,
  details,
  name,
  price,
  quantity,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", className)}>
      <img className={cn("w-[60px] h-[60px]", className)} src={imageUrl} />
      <div className="flex-1">
        <CartItemInfo name={name} details={details} />

        <hr className="my-2" />

        <div className="flex items-center justify-between">
          <CountButton onClick={(type) => onClickCountButton?.(type)} value={quantity} />

          <div className="flex items-center gap-2">
            <h2 className={cn("font-bold", className)}>{price} ₽</h2>
            <Trash2Icon onClick={onClickRemove} size={16} className="text-gray-400 curor-pointer hover:text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
