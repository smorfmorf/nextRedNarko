import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartDrawerItem, getCartItemsDetails } from "./Card-drawer-item";
import { Ingredient } from "@prisma/client";
import { useCard } from "@/hooks/use-card";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem, clearCart } = useCard();

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  async function handleSubmit() {
    // const { data } = await axios.post(
    //     "https://api.nowpayments.io/v1/invoice",
    //     {
    //         price_amount: totalAmount,
    //         price_currency: "rub",
    //         pay_currency: "usdttrc20",
    //         order_id: `order ${new Date().toLocaleString()}`,
    //         order_description: "Оплата услуги",
    //         success_url: "https://your-site.com/success",
    //         cancel_url: "https://your-site.com/cancel",
    //     },
    //     {
    //         headers: {
    //             "x-api-key": "PXP4E90-7C6MZJJ-PQZVV53-RAF77ZP",
    //             "Content-Type": "application/json",
    //         },
    //     },
    // );
    // console.log("data: ", data);
    // const url = data.invoice_url;
    // clearCart();
    // setTimeout(() => {
    //     if (url) {
    //         window.location.href = url;
    //     }
    // }, 1000);
  }

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
          {totalAmount ? (
            <>
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>

                <span className="font-bold text-lg">{totalAmount} ₽</span>
              </div>

              <Link href="/checkout">
                <Button
                  onClick={handleSubmit}
                  //   onClick={() => setRedirecting(true)}
                  //   loading={redirecting}
                  type="submit"
                  className="w-full h-12 text-base"
                >
                  Оформить заказ
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </>
          ) : (
            <SheetClose>
              <Button className="w-56 h-12 text-base size-lg">
                <ArrowLeft className="w-5 mr-2" />
                Вернуться назад
              </Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
