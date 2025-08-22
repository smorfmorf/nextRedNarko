import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border-b-2 border-red-800", className)}>
      <Container className="flex items-center justify-between py-8 px-4">
        {/* левая часть */}
        <div className="flex items-center gap-4">
          <Image
            src="/header.jpeg"
            alt="logo"
            width={80}
            height={80}
            className="rounded-lg"
          />

          <div className="grid gap-1">
            <h1 className="text-3xl font-black">TaTToo MALL</h1>
            <p className="text-sm text-gray-400">3000Р Клад комфорт №1</p>
          </div>
        </div>

        {/* правая часть */}
        <div className="flex items-center gap-4">
          <Button variant={"outline"} className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>

          <Button className="group relatvie animate-bounce">
            <b>520 ₽</b>
            <span className="w-[1px] h-full bg-white/30 mx-2"></span>
            <div className="flex items-center gap-1 transition group-hover:opacity-0">
              <ShoppingCart size={16} />
              <b>3</b>
            </div>
            <ArrowRight className="absolute right-5 transition duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0" />
          </Button>
        </div>
      </Container>
    </header>
  );
};
