import type { Cart, CartItem, Ingredient, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}

//! Функции
export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  Drag$Size: 1 | 2 | 3;
  Drag$Type: 1 | 2;
  ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

// подсчет цены с учетом количества и доп ингредиентов
export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  return (ingredientsPrice + item.productItem.price) * item.quantity;
};

// для рендера на фронте
export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    Drag$Size: item.productItem.size,
    Drag$Type: item.productItem.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];

  return {
    items,
    totalAmount: data.totalAmount,
  };
};
