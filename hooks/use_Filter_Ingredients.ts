import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selected_Ingredients: Set<string>;
  toggle_Add_id: (id: string) => void;
}

export const use_Filter_Ingredients = (): ReturnProps => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected_Ingredients, { add, has, remove, toggle, reset, clear }] = useSet<string>(new Set([]));

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ingredients = await Api.ingredients.getAll();
      setItems(ingredients); // set
      setLoading(false);
    }
    fetchData();
  }, []);

  return {
    ingredients: items,
    loading,
    selected_Ingredients,
    toggle_Add_id: toggle,
  };
};
