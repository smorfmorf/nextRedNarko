import { Ingredient, Product } from "@prisma/client";
import axios from "axios";
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // браузер
    return `${window.location.origin}/api`;
  }

  // сервер (SSR)
  return `${process.env.NEXT_PUBLIC_SITE_URL}/api`;
};

const instance = axios.create({
  baseURL: getBaseURL(),
});

const search = async (query: string) => {
  const { data } = await instance.get<Product[]>(`/products`, { params: { query } });
  return data;
};

const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await instance.get<Ingredient[]>(`/ingredients`);
  return data;
};

export const Api = {
  products: {
    search,
  },
  ingredients: {
    getAll,
  },
};
