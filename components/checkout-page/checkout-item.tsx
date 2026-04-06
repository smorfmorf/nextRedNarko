"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { CartItemInfo } from "../cart/Cart-item-info";
import { CountButton } from "../cart/Count-button";
import { X } from "lucide-react";

export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}
interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "opacity-50 pointer-events-none": disabled,
        },
        className,
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <img className={cn("w-[60px] h-[60px]", className)} src={imageUrl} />
        <CartItemInfo name={name} details={details} />
      </div>

      <h2 className={cn("font-bold", className)}>{price} ₽</h2>

      <div className="flex items-center gap-5 ml-20">
        <CountButton onClick={(type) => onClickCountButton?.(type)} value={quantity} />

        <button type="button" onClick={onClickRemove}>
          <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
        </button>
      </div>
    </div>
  );
};
