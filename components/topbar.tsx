import { Category } from "@prisma/client";
import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";

interface Props {
    className?: string;
    categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
    return (
        <div className="z-10 sticky top-0 backdrop-blur bg-white/20 py-5 shadow-sm">
            <Container className="flex items-center justify-between">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    );
};
