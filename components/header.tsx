"use client";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "./ui/button";
import Lightning from "./Lightning";
import React from "react";
import { SearchDrags } from "./search-drags";
import { CartButton } from "./cart/Cart-Button-header";
import { signIn, useSession } from "next-auth/react";
import { ProfileButton } from "./header/profile-button";
import { AuthModal } from "./header/auth-modal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    const [openModalAuth, setOpenModalAuth] = React.useState(false);
    const { data: session } = useSession();
    console.log("session: ", session);

    const router = useRouter();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    React.useEffect(() => {
        let toastMessage = "";
        let isDone = false;

        async function checkPayment() {
            const { data } = await axios.get(`/api/order-status?orderId=${orderId}`);

            if (data.status === "SUCCESS" && !isDone) {
                isDone = true;

                toast.success("Заказ успешно оплачен!", {
                    duration: 3000,
                });

                router.replace("/");
                return;
            }

            if (data.status === "CANCELLED" && !isDone) {
                isDone = true;

                toast.error("Оплата не прошла");
                router.replace("/");
                return;
            }

            setTimeout(checkPayment, 1500);
        }

        // if (searchParams.has("orderId")) {
        //     toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
        // }

        if (searchParams.has("verified")) {
            toastMessage = "Почта успешно подтверждена!";
        }
        checkPayment();
        if (toastMessage) {
            setTimeout(() => {
                router.replace("/");
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn("border-b-2 border-red-800 relative", className)}>
            <Lightning
                hue={1}
                xOffset={0}
                speed={2}
                intensity={2}
                size={3}
                className="absolute top-0 left-0 w-full h-full"
            />
            <Container className="flex items-center justify-between py-10 px-4 relative z-10">
                {/* левая часть */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-4">
                        <Image src="/header.jpeg" alt="logo" width={80} height={80} className="rounded-lg" />

                        <div className="grid gap-1">
                            <h1 className="text-3xl font-black text-red-800">TaTToo MALL</h1>
                            <p className="text-sm text-gray-400">3000Р Клад комфорт №1</p>
                        </div>
                    </Link>
                </div>

                <div className="mx-10 flex-1">
                    <SearchDrags />
                </div>

                {/* правая часть */}
                <div className="flex items-center gap-4">
                    <AuthModal open={openModalAuth} onClose={() => setOpenModalAuth(false)} />
                    <ProfileButton onClickSignIn={() => setOpenModalAuth(true)} />

                    <CartButton />
                </div>
            </Container>
        </header>
    );
};
