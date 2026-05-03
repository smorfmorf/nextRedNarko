"use server";

import { cookies } from "next/headers";
import { CheckoutFormValues } from "./(checkout)/checkout/page";
import prisma from "@/prisma/prisma.client";
import { OrderStatus, Prisma } from "@prisma/client";
import { createPayment } from "@/lib/YooCasa";
import { sendEmail } from "@/lib/resend-email";
import { PayOrderTemplate } from "@/components/templates/pay-order";
import { ReactNode } from "react";
import { hashSync } from "bcrypt";
import { getUserSession } from "@/lib/get-user-session";
import { VerificationUserTemplate } from "@/components/templates/verification-user";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart Token не найден");
    }

    // находим корзину по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /* Если корзина не найдена возращаем ошибку */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    /* Если корзина пустая возращаем ошибку */
    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }
    console.log('userCart:_CreateOrder', userCart);

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        userId: userCart.userId,
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: String(data.email),
        phone: String(data.phone),
        address: String(data.address),
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });

    /* Очищаем корзину тк уже создали заказ */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    //! Создание заказа Юкасса
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа #" + order.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;
    await sendEmail(
      //   data.email,
      "Tatto Moll / Оплатите заказ #" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }) as ReactNode,
    );

    return paymentUrl;
  } catch (e) {
    console.log("[CreateOrder] Server error", e);
  }
}


export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (err) {
    console.log('Error [UPDATE_USER]', err);
    throw err;
  }
}


export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const findUser = await prisma.user.findFirst({
      where: {
        email: String(body.email),
      },
    });


    if (findUser) {
      if (!findUser.verified) {
        throw new Error('Почта не подтверждена');
      }
      throw new Error('Пользователь с таким email уже существует');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });
    console.log('createdUser: ', createdUser);


    const code = Math.floor(100000 + Math.random() * 900000).toString();


    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      }
    })

    await sendEmail(
      `Tatto Moll / 📝 Подтверждение регистрации ${createdUser.email}`,
      VerificationUserTemplate({
        code,
      }) as ReactNode
    );

  }
  catch (err) {
    console.log('Error [REGISTER_USER]', err);
    throw err;
  }
}