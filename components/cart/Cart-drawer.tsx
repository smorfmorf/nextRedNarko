import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartDrawerItem, getCartItemsDetails } from "./Card-drawer-item";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";
import { Ingredient } from "@prisma/client";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, fetchCartItems } = useCartStore();

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}

        <div className="grid gap-5 overflow-auto">
          {items.map((item) => (
            <CartDrawerItem
              key={item.id}
              onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
              quantity={item.quantity}
              details={getCartItemsDetails({
                ingredients: item.ingredients as Ingredient[],
                type: item.Drag$Type,
                size: item.Drag$Size,
              })}
              imageUrl={item.imageUrl}
              name={item.name}
              price={item.price}
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
        </div>

        <SheetFooter className="bg-white p-8">
          <div className="flex mb-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Итого
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg">{totalAmount} ₽</span>
          </div>

          <Link href="/checkout">
            <Button
              //   onClick={() => setRedirecting(true)}
              //   loading={redirecting}
              type="submit"
              className="w-full h-12 text-base"
            >
              Оформить заказ
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
