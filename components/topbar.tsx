import { Categories } from "./categories";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div className="sticky top-0 backdrop-blur bg-white/20 py-5 z-10 shadow-sm">
      <Container className="flex items-center justify-between">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  );
};
