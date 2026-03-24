import { updateCartTotalAmount } from "@/lib/update-cart-total-price";
import prisma from "@/prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    const body = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: numericId,
      },
    });

    if (!cartItem) {
      return new Response("Not Found", { status: 404 });
    }

    await prisma.cartItem.update({
      where: {
        id: numericId,
      },
      data: {
        quantity: body.quantity,
      },
    });
    const updateUserCart = await updateCartTotalAmount(token);

    return new Response(JSON.stringify(updateUserCart), { status: 200 });
  } catch (e: Error | any) {
    return new Response(`Internal Server Error ${e.message}`, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: numericId,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" });
    }

    await prisma.cartItem.delete({
      where: {
        id: numericId,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json({ message: "Не удалось удалить корзину" }, { status: 500 });
  }
}
