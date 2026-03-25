import { cn } from "@/lib/utils";

interface Props {
  className?: string;

  imageUrl: string;
  size: 1 | 2 | 3;
}

//! Картинка слева где 3 круга
export const DragsImage: React.FC<Props> = ({ className, imageUrl, size }) => {
  return (
    <div className={cn("flex items-center justify-center relative w-full", className)}>
      <img
        src={`/${imageUrl}`}
        className={cn("relative left-2 top-2 transition z-10", {
          "w-[300px] h-[300px]": size === 1,
          "w-[400px] h-[400px]": size === 2,
          "w-[500px] h-[500px]": size === 3,
        })}
      />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-400 w-[450px] h-[450px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-400 w-[370px] h-[370px]" />
    </div>
  );
};
