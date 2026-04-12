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
import React from "react";

interface Props {
    className?: string;
    children: React.ReactNode;
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
    const { loading, totalAmount, updateItemQuantity, items, removeCartItem, clearCart } = useCard();

    const [submitting, setSubmitting] = React.useState(false);

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    async function handleSubmit() {
        setSubmitting(true);
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
                                    className={cn("w-full h-12 text-base", submitting && "opacity-50")}>
                                    {submitting && (
                                        <div className="w-6 h-6 border-2 border-gray-200 border-t-gray-600 rounded-full animate-spin"></div>
                                    )}
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
