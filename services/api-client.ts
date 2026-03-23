import { CartDTO, CreateCartItemValues } from "@/components/store/cart-DTO";
import { Ingredient, Product } from "@prisma/client";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${window.location.origin}/api`,
});

const search = async (query: string) => {
  const { data } = await axiosInstance.get<Product[]>(`/products`, { params: { query } });
  return data;
};

const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(`/ingredients`);
  return data;
};

// Cart API

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>("/cart");
  return data;
};

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>("/cart/" + itemId, { quantity });
  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>("/cart/" + id);
  return data;
};

export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>("/cart", values);
  return data;
};

export const Api = {
  products: {
    search,
  },
  ingredients: {
    getAll,
  },

  cart: {
    getCart,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  },
};
