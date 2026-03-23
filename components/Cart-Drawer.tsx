import React from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

interface Props {
    className?: string;
}

export const CartDrawer: React.FC<Props> = ({ className }) => {
    return <div className={className}></div>;
};
