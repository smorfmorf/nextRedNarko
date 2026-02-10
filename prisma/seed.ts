import { Prisma, PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

// cascade - значит если есть какие-то взаимосвязанные данные, то они будут удалены (из других таблиц)
async function deleteAll() {
  //   await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  // 1️⃣ ВЫКЛЮЧАЕМ foreign keys
  await prisma.$executeRaw`PRAGMA foreign_keys = OFF;`;
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "User"`]);
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "Category"`]);
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "Ingredient"`]);
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "Product"`]);
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "ProductItem"`]);
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "Cart"`]);
  await prisma.$transaction([prisma.$executeRaw`DELETE FROM "CartItem"`]);

  // 3️⃣ ВКЛЮЧАЕМ обратно
  await prisma.$executeRaw`PRAGMA foreign_keys = ON;`;
}

async function download() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        fullName: "User",
        email: "user@ya.ru",
        password: hashSync("666", 10),
        verified: new Date(),
        role: "USER",
      },
    ],
  });

  //   CATEGORIES
  const categoris = [
    { id: 1, name: "Драги" },
    { id: 2, name: "КОКА-КОЛЫ" },
    { id: 3, name: "КОКИ" },
  ];
  await prisma.category.createMany({
    data: categoris,
  });

  // INGREDIENTS --------------------------------------
  const ingredients = [
    {
      name: "размешаная соляга",
      price: 100,
      imageUrl: "https://media.dodostatic.net/image/r:292x292/0198bf3e424371b49f0b8d7dbe320a70.avif",
    },
    {
      name: "нфтзи",
      price: 200,
      imageUrl: "https://media.dodostatic.net/image/r:292x292/0198bf3e424371b49f0b8d7dbe320a70.avif",
    },
  ].map((o, i) => ({ ...o, id: i + 1 }));
  await prisma.ingredient.createMany({
    data: ingredients,
  });
  //   PRODUCTS --------------------------------------
  const products = [
    {
      id: 1,
      name: "Лате",
      imageUrl: "https://media.dodostatic.net/image/r:292x292/0198bf3e424371b49f0b8d7dbe320a70.avif",
      categoryId: 1,
    },
    {
      id: 2,
      name: "Коки",
      imageUrl: "A3.webp",
      categoryId: 1,
    },
    {
      id: 3,
      name: "Кока-кола",
      imageUrl: "A4.webp",
      categoryId: 1,
    },
    {
      id: 4,
      name: "Кока-кола",
      imageUrl: "A5.webp",
      categoryId: 1,
    },
    {
      id: 5,
      name: "Кока-кола",
      imageUrl: "A6.webp",
      categoryId: 1,
    },
    {
      id: 6,
      name: "Кока-кола",
      imageUrl: "A7.webp",
      categoryId: 1,
    },
  ];

  await prisma.product.createMany({
    data: [...products],
  });

  const nark1 = await prisma.product.create({
    data: {
      name: "Narko1",
      imageUrl: "A2.webp",
      categoryId: 3,
      ingredients: {
        connect: ingredients.slice(0, 1),
      },
    },
  });

  //   PRODUCTS ITEM --------------------------------------
  interface PropsProductItem {
    productId: number;
    pizzaType?: 1 | 2;
    size?: 20 | 30 | 40;
  }
  function generateProductItem({
    productId,
    pizzaType,
    size,
  }: PropsProductItem): Prisma.ProductItemUncheckedCreateInput {
    return {
      productId,
      pizzaType,
      size,
      price: Math.floor(Math.random() * 1000),
    };
  }

  // продукты
  await prisma.productItem.createMany({
    data: [
      generateProductItem({ productId: nark1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: nark1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: nark1.id, pizzaType: 1, size: 20 }),

      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
    ],
  });

  // Корзина
  await prisma.cart.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        totalAmount: 0,
        userToken: "wddwadawdawd12",
      },
    ],
  });

  // товары в корзине  + доп ингридиенты какие хотим добвить к продукту
  await prisma.cartItem.create({
    data: {
      id: 1,
      cartId: 1,
      productItemId: 1,
      quantity: 2,
      ingredients: {
        connect: ingredients.slice(0, 1),
      },
    },
  });
}

async function main() {
  try {
    await deleteAll();
    await download();
  } catch (error) {
    console.error(error);
  }
}

main().then(() => prisma.$disconnect());
