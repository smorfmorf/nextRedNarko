"use client";

import { getCartItemsDetails } from "@/components/cart/Card-drawer-item";
import { CheckoutItemDetails } from "@/components/checkout-page/check-out-itemDetails";
import { CheckoutItem } from "@/components/checkout-page/checkout-item";
import { WhiteBlock } from "@/components/checkout-page/white-block";
import { Container } from "@/components/container";
import { FormInput } from "@/components/form/form-input";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCard } from "@/hooks/use-card";
import { Ingredient } from "@prisma/client";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: "Имя должно содержать не менее 2-х символов" }),
  lastName: z.string().min(2, { message: "Фамилия должна содержать не менее 2-х символов" }),
  email: z.string().email({ message: "Введите корректную почту" }),
  phone: z.string().min(10, { message: "Введите корректный номер телефона" }),
  address: z.string().min(5, { message: "Введите корректный адрес" }),
  comment: z.string().optional(),
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Nalog = 5;
const DeliveryPrice = 200;

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, clearCart } = useCard();

  const NalogPrice = Math.round((totalAmount * Nalog) / 100);
  const totalPrice = totalAmount + NalogPrice + DeliveryPrice;

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  function onSubmit(data: CheckoutFormValues) {
    console.log("Form data:", data);
    console.log("Cart items:", items);
  }

  return (
    <Container className="m-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="grid gap-10">
              <WhiteBlock title="1. Корзина">
                <div className="grid gap-5 overflow-auto">
                  {items.map((item) => (
                    <CheckoutItem
                      key={item.id}
                      id={item.id}
                      onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                      quantity={item.quantity}
                      details={getCartItemsDetails({
                        ingredients: item.ingredients as Ingredient[],
                        type: item.Drag$Type,
                        size: item.Drag$Size,
                      })}
                      imageUrl={item.imageUrl}
                      name={item.name}
                      price={item.price}
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  ))}
                </div>
              </WhiteBlock>

              <WhiteBlock title="2. Персональные данные">
                <div className="grid grid-cols-2 gap-5">
                  <FormInput name="firstName" placeholder="Имя" />
                  <FormInput name="lastName" placeholder="Фамилия" />
                  <FormInput name="email" placeholder="Email" />
                  <FormInput name="phone" placeholder="Телефон" />
                </div>
              </WhiteBlock>

              <WhiteBlock title="3. Адрес доставки">
                <div className="grid gap-5">
                  <Input name="firstName" className="w-full" placeholder="Имя" />
                  <Textarea className="text-base" placeholder="Коментарий к заказу" rows={5} />
                </div>
              </WhiteBlock>
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <WhiteBlock className="p-6 sticky top-4">
                <div className="grid gap-1">
                  <span className="text-xl">Итого: </span>
                  <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
                </div>

                <CheckoutItemDetails
                  title={
                    <div className="flex items-center">
                      <Package size={18} className="mr-2" />
                      Стоимость товаров:
                    </div>
                  }
                  value={`${totalAmount} ₽`}
                />
                <CheckoutItemDetails
                  title={
                    <div className="flex items-center">
                      <Percent size={18} className="mr-2" />
                      Комиссия:
                    </div>
                  }
                  value={`${NalogPrice} ₽`}
                />
                <CheckoutItemDetails
                  title={
                    <div className="flex items-center">
                      <Truck size={18} className="mr-2" />
                      Доставка:
                    </div>
                  }
                  value={`${DeliveryPrice} ₽`}
                />
                <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                  Перейти к оплате
                </Button>
              </WhiteBlock>
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
