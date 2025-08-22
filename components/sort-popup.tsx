import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-red-50 rounded-xl px-4 h-[50px]",
        className,
        "cursor-pointer"
      )}
    >
      <ArrowUpDown size={16} />
      <b>Сортировка: </b>
      <b className="text-primary">популярное</b>
    </div>
  );
};
