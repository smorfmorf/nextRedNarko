import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export const useCard = () => {
  const { loading, totalAmount, updateItemQuantity, items, removeCartItem, fetchCartItems, clearCart } = useCartStore();

  useEffect(() => {
    console.log("запрос на получение корзины");
    fetchCartItems();
  }, []);

  return { loading, totalAmount, updateItemQuantity, items, removeCartItem, fetchCartItems, clearCart };
};
