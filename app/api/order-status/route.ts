import prisma from "@/prisma/prisma.client";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    const orderId = req.nextUrl.searchParams.get('orderId');

    const order = await prisma.order.findUnique({
        where: {
            id: Number(orderId),
        }
    })

    return new Response(JSON.stringify({ status: order?.status }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}