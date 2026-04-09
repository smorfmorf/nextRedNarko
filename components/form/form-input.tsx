"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { ErrorText } from "./ErrorText";
import { RequiredSymbol } from "./RequiredSymbol";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, placeholder, ...props }) => {
  const {
    register,
    formState: { errors },
    watch, //следит за изменениями поля формы
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input placeholder={placeholder} className="h-12 text-md" {...register(name)} {...props} />

        {value && (
          <button
            onClick={onClickClear}
            className={cn("absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer")}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
