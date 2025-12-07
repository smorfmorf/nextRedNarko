import clsx from "clsx";
import React from "react";

type TitleSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface Props {
    text: string;

    className?: string;
    size?: TitleSize;
}

export const Title: React.FC<Props> = ({ className, size = "md", text }) => {
    const mapTagBySize = {
        xs: "h5",
        sm: "h4",
        md: "h3",
        lg: "h2",
        xl: "h1",
        "2xl": "h1",
    } as const;

    const mapClassBySize = {
        xs: "text-[16px]",
        sm: "text-[22px]",
        md: "text-[26px]",
        lg: "text-[32px]",
        xl: "text-[40px]",
        "2xl": "text-[48px]",
    } as const;

    return React.createElement(mapTagBySize[size], { className: clsx(mapClassBySize[size], className) }, text);
};
