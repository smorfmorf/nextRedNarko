import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CartDrawer } from "./Cart-drawer";

interface Props {
    className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    return (
        <CartDrawer>
            <Button className="group relatvie animate-bounce">
                <b>7300 ₽</b>
                <span className="w-[1px] h-full bg-white/30 mx-2"></span>
                <div className="flex items-center gap-1 transition group-hover:opacity-0">
                    <ShoppingCart size={16} />
                    <b>2</b>
                </div>
                <ArrowRight className="absolute right-5 transition duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
            </Button>
        </CartDrawer>
    );
};
