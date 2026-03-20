import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { CartDrawerItem, getCartItemsDetails } from "./Card-drawer-item";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const CartDrawer: React.FC<Props> = ({ className, children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{6} товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* Items */}

        <div className="grid gap-5 overflow-auto">
          <CartDrawerItem
            count={2}
            details={getCartItemsDetails({ size: 1, type: 1, ingredients: [] })}
            name="Классика"
            type={1}
            price={700}
          />
        </div>

        <SheetFooter className="bg-white p-8">
          <div className="flex mb-4">
            <span className="flex flex-1 text-lg text-neutral-500">
              Итого
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>

            <span className="font-bold text-lg">{700} ₽</span>
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
