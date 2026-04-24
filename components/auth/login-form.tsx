import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginValues, formLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const onSubmit = async (data: TFormLoginValues) => {};

    return (
        // «раздает» состояние формы всем вложенным элементам
        // внутри MyInput просто const { register } = useFormContext();
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}></form>
        </FormProvider>
    );
};

export default LoginForm;
