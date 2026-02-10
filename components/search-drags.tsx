import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import React from "react";
import { useDebounce } from "react-use";

`use client`;

export const SearchDrags: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);

  const [focus, setFocus] = React.useState(false);
  const ref = React.useRef(null);

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((res) => setProducts(res));
    },
    300,
    [searchQuery],
  );

  return (
    <>
      {focus && <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/60 "></div>}

      <div className="relative flex rounded-2xl h-11 z-20!">
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={ref}
          className="w-full p-2 bg-black-400/80 shadow shadow-red-400 rounded-lg cursor-help text-red-500"
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow transition-all duration-300 invisible opacity-0 z-20",
              focus && "opacity-100 top-12 visible",
            )}
          >
            {products.map((product) => (
              <div key={product.id} className="px-2 py-1 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
                <img className="w-8 h-8" src={product.imageUrl} alt="" />
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
