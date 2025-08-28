import React from "react";
import { Title } from "./title";
import { cn } from "@/lib/utils";
import { ProductCart } from "./product-cart";

interface Props {
  className?: string;
  items: any[];
  title: string;
  categoryId: number;
}

// есть главный див и он будет рендерить список продуктов и на верху должен быть заголовок группы, далее рендер списка товаров

export const ProductsGroupList: React.FC<Props> = ({
  className,
  items,
  title,
  categoryId,
}) => {
  return (
    <div className="">
      <Title size="lg" className="font-extrabold mb-5" text={title} />

      <div
        className={cn("grid grid-cols-3 gap-10 place-items-center", className)}
      >
        {items.map((item, idx) => (
          <ProductCart
            key={idx}
            id={item.id}
            price={item.price}
            imageUrl={item.imageUrl}
            name={item.name}
          />
        ))}
      </div>
    </div>
  );
};
