import { updateCartTotalAmount } from "@/lib/update-cart-total-price";
import prisma from "@/prisma/prisma.client";
import { CreateCartItemValues } from "@/store/cart-DTO";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const userId = 2;
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
        // OR: [{ token: token }, { userId: userId }],
      },
      include: {
        items: {
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
    console.log("userCart: ", userCart);
    return NextResponse.json(userCart);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch cart" });
  }
}


// при добавлении товара к корзину создаем токен в куках или используем существующий
export async function POST(req: NextRequest) {

  async function findOrCreateCart(token: string) {
    let userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: {
          token,
        },
      });
    }

    return userCart;
  };


  try {
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    //если корзины нету создаем
    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          // У этого CartItem ВСЕ ингредиенты должны иметь id из списка [1, 2, 3]
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    });

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);

    resp.cookies.set("cartToken", token);
    return resp;
  } catch (err) {
    return NextResponse.json({ error: "Failed to create cart" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Cart token not found" });
    }

    await prisma.cartItem.deleteMany();
    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  }
  catch (error) {
    console.log("[CART_DELETE] Server error", error);
    return NextResponse.json({ message: "Не удалось удалить корзину" }, { status: 500 });
  }
}
