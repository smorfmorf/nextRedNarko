import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ArrowRight, Link, ShoppingCart, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { CartDrawer } from "./Cart-drawer";
import { mapType } from "../modal_and_product/Chose-DragsForm";
import { Ingredient } from "@prisma/client";
import { CartItemInfo } from "./Cart-item-info";
import { CountButton } from "./Count-button";

interface PropsImg {
    src: string;
    className?: string;
}

export const CartItemDetailsImage: React.FC<PropsImg> = ({ src, className }) => {
    return <img className={cn("w-[60px] h-[60px]", className)} src={src} />;
};

interface PropsPrice {
    value: number;
    className?: string;
}

export const CartItemDetailsPrice: React.FC<PropsPrice> = ({ value, className }) => {
    return <h2 className={cn("font-bold", className)}>{value} ₽</h2>;
};

interface Props {
    className?: string;
    name: string;
    details: string;
    type: 1 | 2;
    price: number;
    count: number;
}
export const CartDrawerItem: React.FC<Props> = ({ className, details, name, type, price, count }) => {
    return (
        <div className={cn("flex bg-white p-5 gap-6", className)}>
            <CartItemDetailsImage src="/A2.webp" />

            <div className="flex-1">
                <CartItemInfo name={name} details={details} />

                <hr className="my-2" />

                <div className="flex items-center justify-between">
                    <CountButton onClick={(type) => console.log("type", type)} value={count} />

                    <div className="flex items-center gap-2">
                        <CartItemDetailsPrice value={price} />
                        <Trash2Icon size={16} className="text-gray-400 curor-pointer hover:text-gray-600" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export function getCartItemsDetails({
    size,
    type,
    ingredients,
}: {
    size: 1 | 2 | 3;
    type: 1 | 2;
    ingredients: Ingredient[];
}) {
    const detailsArr = [];

    if (size) {
        const typeName = mapType[type];
        detailsArr.push(`${typeName} ${size} грамм`);
    }

    if (ingredients) {
        detailsArr.push(...ingredients.map((item) => item.name));
    }

    return detailsArr.join(", ");
}
