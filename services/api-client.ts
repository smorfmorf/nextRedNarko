import { Product } from "@prisma/client";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const search = async (query: string) => {
  const { data } = await instance.get<Product[]>(`/products`, { params: { query } });
  return data;
};

export const Api = {
  products: {
    search,
  },
};
