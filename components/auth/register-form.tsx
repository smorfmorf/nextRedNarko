import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginValues, TFormRegisterValues, formLoginSchema, formRegisterSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../form/form-input";
import { Title } from "../title";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { registerUser } from "@/app/server-actions";

interface Props {
    onClose?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
        },
    });
    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error("Регистрация успешна 📝. Подтвердите свою почту", {
                icon: "✅",
            });

            onClose?.();
        } catch (error) {
            return toast.error("Неверный E-Mail или пароль", {
                icon: "❌",
            });
        }
    };
    return (
        // «раздает» состояние формы всем вложенным элементам
        // внутри MyInput просто const { register } = useFormContext();
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Полное имя" required />
                <FormInput name="password" label="Пароль" type="password" required />
                <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

                <Button className="h-12 text-base" type="submit">
                    Зарегистрироваться
                </Button>
            </form>
        </FormProvider>
    );
};

export default RegisterForm;
