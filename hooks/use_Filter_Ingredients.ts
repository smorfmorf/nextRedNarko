import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;

}

export const use_Ingredients = (values: string[] = []): ReturnProps => {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

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
  };
};
