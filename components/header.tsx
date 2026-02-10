"use client";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Lightning from "./Lightning";
import React from "react";
import { SearchDrags } from "./search-drags";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border-b-2 border-red-800 relative", className)}>
      <Lightning hue={1} xOffset={0} speed={2} intensity={2} size={3} className="absolute top-0 left-0 w-full h-full" />
      <Container className="flex items-center justify-between py-10 px-4 relative z-10">
        {/* левая часть */}
        <div className="flex items-center gap-4">
          <Image src="/header.jpeg" alt="logo" width={80} height={80} className="rounded-lg" />

          <div className="grid gap-1">
            <h1 className="text-3xl font-black text-red-800">TaTToo MALL</h1>
            <p className="text-sm text-gray-400">3000Р Клад комфорт №1</p>
          </div>
        </div>

        <div className="mx-10 flex-1">
          <SearchDrags />
        </div>

        {/* правая часть */}
        <div className="flex items-center gap-4">
          <Button variant={"outline"} className="flex items-center gap-1">
            <User size={16} />
            Войти
          </Button>
          <Button className="group relatvie animate-bounce">
            <b>15 520 ₽</b>
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
