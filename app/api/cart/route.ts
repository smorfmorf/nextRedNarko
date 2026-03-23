import prisma from "@/prisma/prisma.client";
import { NextResponse } from "next/server";
export async function GET(req: NextResponse) {

    try {
        const userId = 1;
        const token = req.cookies.get('cartToken')?.value;

        if (!token) {
            return NextResponse.json({ totalAmount: 0, items: [] })
        }

        const userCart = await prisma.cart.findFirst({
            where: {
                OR: [
                    { userId: userId },
                    { token: token }
                ]
            },
            include: {
                items: {
                    include: {
                        productItem: {
                            include: {
                                product: true
                            }
                        },
                        ingredients: true
                    }
                }
            }

        });
        console.log('userCart: ', userCart);
        return NextResponse.json(userCart);
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch cart' });
    }
}