"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Order, User } from "@prisma/client";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./container";
import { Title } from "./title";
import { formRegisterSchema, TFormRegisterValues } from "./auth/schemas";
import { Button } from "./ui/button";
import { FormInput } from "./form/form-input";
import { updateUserInfo } from "@/app/server-actions";

interface Props {
    data: User;
    order: Order[];
}

export const ProfileForm: React.FC<Props> = ({ data, order }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error("Данные обновлены 📝", {
                icon: "✅",
            });
        } catch (error) {
            return toast.error("Ошибка при обновлении данных", {
                icon: "❌",
            });
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/",
        });
    };

    return (
        <Container className="my-10 flex gap-10 p-5">
            <div className="w-[400px]">
                <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />

                <FormProvider {...form}>
                    <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormInput name="email" label="E-Mail" required />
                        <FormInput name="fullName" label="Полное имя" required />

                        <FormInput type="password" name="password" label="Новый пароль" required />
                        <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

                        <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                            Сохранить
                        </Button>

                        <Button
                            onClick={onClickSignOut}
                            variant="secondary"
                            disabled={form.formState.isSubmitting}
                            className="text-base"
                            type="button">
                            Выйти
                        </Button>
                    </form>
                </FormProvider>
            </div>

            <div className="flex-1 bg-gray-100 p-4 rounded-xl">
                <Title text="История заказов" size="md" className="font-bold" />

                <div className="mt-4 space-y-4 max-h-[530px] overflow-y-auto pr-1">
                    {order.map((item) => {
                        const products = JSON.parse(String(item.items));

                        return (
                            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-300">
                                {/* верх */}
                                <div className="flex justify-between text-sm mb-3">
                                    <span className="font-bold text-gray-900">Заказ #{item.id}</span>
                                    <span className="text-gray-600">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* товары */}
                                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                                    {products.map((p: any) => {
                                        const name = p.productItem.product.name;
                                        const quantity = p.quantity;
                                        const image = p.productItem.product.imageUrl;

                                        return (
                                            <div
                                                key={p.id}
                                                className="flex items-center justify-between text-sm bg-gray-200 px-3 py-2 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={image}
                                                        alt={name}
                                                        className="w-10 h-10 rounded-md object-cover border"
                                                    />
                                                    <span className="font-medium text-gray-900">
                                                        {name} × {quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* низ */}
                                <div className="flex justify-between mt-3 pt-2 border-t border-gray-300 text-sm">
                                    <span
                                        className={
                                            item.status === "PENDING"
                                                ? "text-red-600 font-semibold"
                                                : "text-green-600 font-semibold"
                                        }>
                                        {item.status === "PENDING" ? "Не оплачен" : "Оплачен"}
                                    </span>

                                    <span className="font-bold text-gray-900">{item.totalAmount} ₽</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};
