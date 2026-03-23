import prisma from "@/prisma/prisma.client";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    const body = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      return new Response("Not Found", { status: 404 });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: body.quantity,
      },
    });
  } catch (e) {
    console.log(e);
    return new Response("Internal Server Error", { status: 500 });
  }
}
