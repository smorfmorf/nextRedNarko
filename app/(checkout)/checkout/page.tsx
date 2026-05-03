"use client";

import { getCartItemsDetails } from "@/components/cart/Card-drawer-item";
import { CheckoutItemDetails } from "@/components/checkout-page/check-out-itemDetails";
import { CheckoutItem } from "@/components/checkout-page/checkout-item";
import { WhiteBlock } from "@/components/checkout-page/white-block";
import { Container } from "@/components/container";
import { FormInput } from "@/components/form/form-input";
import { Title } from "@/components/title";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCard } from "@/hooks/use-card";
import { Ingredient } from "@prisma/client";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Controller, FormProvider, useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdressInput } from "@/components/form/addres-input";
import { ErrorText } from "@/components/form/ErrorText";
import { createOrder } from "@/app/server-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";

export const checkoutFormSchema = z.object({
  firstName: z.string().min(0, { message: "Имя должно содержать не менее 2-х символов" }).optional(),
  lastName: z.string().min(0, { message: "Фамилия должна содержать не менее 2-х символов" }).optional(),
  email: z.string().min(0, { message: "Введите корректную почту" }).optional(),
  phone: z.string().min(0, { message: "Введите корректный номер телефона" }).optional(),
  address: z.string().min(0, { message: "Введите корректный адрес" }).optional(),
  comment: z.string().optional(),
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

const Nalog = 5;
const DeliveryPrice = 200;

export default function CheckoutPage() {
  const [stateSucces, setStateSucces] = React.useState(false);
  const { loading, totalAmount, updateItemQuantity, items, removeCartItem, clearCart } = useCard();

  const router = useRouter();

  const NalogPrice = Math.round((totalAmount * Nalog) / 100);

  let totalPrice = totalAmount;
  if (totalPrice != 0) {
    totalPrice = totalPrice + NalogPrice + DeliveryPrice;
  }

  // React.useEffect(() => {
  //     if (totalPrice == 0) {
  //         router.push("/");
  //     }
  // }, []);

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

  const { control } = form; // ✅ вместо useFormContext()

  async function onSubmit(data: CheckoutFormValues) {
    try {
      const url = await createOrder(data);
      console.log("url: ", url);

      toast.success("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      setStateSucces(true);

      if (url) {
        location.href = url;
      }

      //   clearCart();

      // const { data } = await axios.post(
      //     "https://api.nowpayments.io/v1/invoice",
      //     {
      //         price_amount: totalPrice,
      //         price_currency: "rub",
      //         pay_currency: "usdttrc20",
      //         order_id: `order ${new Date().toLocaleString()}`,
      //         order_description: "Оплата услуги",
      //         success_url: "https://your-site.com/success",
      //         cancel_url: "https://your-site.com/cancel",
      //     },
      //     {
      //         headers: {
      //             "x-api-key": "PXP4E90-7C6MZJJ-PQZVV53-RAF77ZP",
      //             "Content-Type": "application/json",
      //         },
      //     },
      // );
      // console.log("data: ", data);
      // const url = data.invoice_url;
      // setTimeout(() => {
      //     if (url) {
      //         window.location.href = url;
      //     }
      // }, 1000);
    } catch (e) {
      console.error(e);
      toast.error("Ошибка при оформлении заказа");
    }
  }

  return (
    <Container className="m-10">
      {loading ? (
        <Title text="Загрузка заказа..." className="font-extrabold mb-8 text-[36px] animate-pulse" />
      ) : (
        <>
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
                      {/* <AdressInput onChange={checkData} /> */}

                      <Controller
                        control={control}
                        name="address"
                        render={({ field, fieldState }) => (
                          <>
                            <AdressInput onChange={field.onChange} />
                            {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
                          </>
                        )}
                      />
                      <Textarea className="text-base" placeholder="Коментарий к заказу" rows={5} />
                    </div>
                  </WhiteBlock>
                </div>

                {/* Правая часть */}
                <div className="w-[450px]">
                  <WhiteBlock className="p-6 sticky top-4">
                    <div className="grid gap-1">
                      <span className="text-xl">Итого: </span>
                      <span className="text-[34px] font-extrabold">{totalAmount > 0 ? totalPrice : 0}₽</span>
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
                      value={totalAmount > 0 && `${DeliveryPrice}₽`}
                    />
                    <Button
                      disabled={stateSucces}
                      type="submit"
                      className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
                    >
                      Перейти к оплате
                    </Button>
                  </WhiteBlock>
                </div>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </Container>
  );
}
