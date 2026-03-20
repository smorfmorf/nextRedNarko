import { Prisma, PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

// Функция для очистки всех таблиц
async function deleteAll() {
  console.log("🧹 Очищаем базу данных...");

  await prisma.$executeRaw`PRAGMA foreign_keys = OFF;`;

  const tables = ["CartItem", "Cart", "ProductItem", "Product", "Ingredient", "Category", "User"];

  for (const table of tables) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${table}";`);
  }

  // Сброс автоинкремента
  await prisma.$executeRaw`DELETE FROM sqlite_sequence;`;

  await prisma.$executeRaw`PRAGMA foreign_keys = ON;`;

  console.log("✅ База данных очищена");
}

async function download() {
  console.log("🌱 Заполняем базу данных...");

  // 👤 ПОЛЬЗОВАТЕЛИ (разные роли)
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        fullName: "Барыга",
        email: "baryga@darknet.ru",
        password: hashSync("crystal123", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        id: 2,
        fullName: "Курьер",
        email: "kuryer@darknet.ru",
        password: hashSync("fast123", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        id: 3,
        fullName: "Admin",
        email: "admin@darknet.ru",
        password: hashSync("admin666", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  // 🏷️ КАТЕГОРИИ
  const categories = [
    { id: 1, name: "Кристаллы ❄️" },
    { id: 2, name: "Трава 🌿" },
    { id: 3, name: "Колеса 💊" },
    { id: 4, name: "Порошки ⚪" },
    { id: 5, name: "Марки 🎨" },
  ];
  await prisma.category.createMany({ data: categories });

  // 🧪 ИНГРЕДИЕНТЫ (примеси, добавки)
  const ingredients = [
    {
      name: "Глюкоза",
      price: 1430,
      imageUrl: "I9.webp",
    },
    {
      name: "Кофеин",
      price: 150,
      imageUrl: "I8.webp",
    },
    {
      name: "микродоты",
      price: 1400,
      imageUrl: "I10.webp",
    },
    {
      name: "Крейда",
      price: 30,
      imageUrl: "I3.webp",
    },
    {
      name: "Сода",
      price: 20,
      imageUrl: "I2.webp",
    },
    {
      name: "Мел",
      price: 25,
      imageUrl: "I5.webp",
    },
    {
      name: "Сахарная пудра",
      price: 40,
      imageUrl: "I6.webp",
    },
    {
      name: "Мука",
      price: 35,
      imageUrl: "I7.webp",
    },
  ].map((o, i) => ({ ...o, id: i + 1 }));

  await prisma.ingredient.createMany({ data: ingredients });

  // 📦 ПРОДУКТЫ (основной ассортимент)
  const products = [
    // Кристаллы
    {
      id: 1,
      name: "Кристаллы 'Голубая лагуна'",
      imageUrl: "A2.webp",
      categoryId: 1,
    },
    {
      id: 2,
      name: "Кристаллы 'Розовый закат'",
      imageUrl: "A3.webp",
      categoryId: 1,
    },
    // Трава
    {
      id: 3,
      name: "Шишки 'Амнезия'",
      imageUrl: "A4.webp",
      categoryId: 2,
    },
    {
      id: 4,
      name: "Гашиш 'Черный'",
      imageUrl: "A5.webp",
      categoryId: 2,
    },
    // Колеса
    {
      id: 5,
      name: "Экстази 'Роллс-Ройс'",
      imageUrl: "A6.webp",
      categoryId: 3,
    },
    {
      id: 6,
      name: "MDMA кристаллы",
      imageUrl: "A7.webp",
      categoryId: 3,
    },
    // Порошки
    {
      id: 7,
      name: "Кокаин 'Перуанский'",
      imageUrl: "A8.webp",
      categoryId: 4,
    },
    {
      id: 8,
      name: "Амфетамин 'Скорость'",
      imageUrl: "A9.webp",
      categoryId: 4,
    },
    // Марки
    {
      id: 9,
      name: "LSD 'Космос'",
      imageUrl: "A10.webp",
      categoryId: 5,
    },
    {
      id: 10,
      name: "LSD 'Глаз'",
      imageUrl: "A11.webp",
      categoryId: 5,
    },
  ];

  await prisma.product.createMany({ data: products });

  // Создаем продукты с ингредиентами (уже готовые смеси)
  const premix1 = await prisma.product.create({
    data: {
      name: "Премикс 'Бодрое утро' (амф + кофеин)",
      imageUrl: "A12.webp",
      categoryId: 4,
      ingredients: {
        connect: [ingredients[1], ingredients[4]], // кофеин + сода
      },
    },
  });

  const premix2 = await prisma.product.create({
    data: {
      name: "Премикс 'Клубный' (mdma + xtc)",
      imageUrl: "A13.webp",
      categoryId: 3,
      ingredients: {
        connect: [ingredients[0], ingredients[2]], // глюкоза + лидокаин
      },
    },
  });

  // 📏 ПРОДУКТЫ АЙТЕМЫ (разные фасовки)
  function generateProductItem({
    productId,
    size,
    pizzaType,
  }: {
    productId: number;
    size?: number;
    pizzaType?: 1 | 2;
  }): Prisma.ProductItemUncheckedCreateInput {
    const prices = {
      1: 2500, // 0.5г
      2: 4500, // 1г
      3: 8000, // 2г
      4: 15000, // 5г
    };

    return {
      productId,
      size,
      pizzaType,
      // price: size ? prices[size as keyof typeof prices] : 1000,
      price: Math.floor(Math.random() * 4000),
    };
  }

  const productItemsData = [
    // Кристаллы (фасовки)
    generateProductItem({ productId: 1, size: 1, pizzaType: 1 }),
    generateProductItem({ productId: 1, size: 2, pizzaType: 1 }),
    generateProductItem({ productId: 1, size: 3, pizzaType: 2 }),

    generateProductItem({ productId: 2, size: 1, pizzaType: 1 }),
    generateProductItem({ productId: 2, size: 2, pizzaType: 1 }),
    // Трава
    generateProductItem({ productId: 3, size: 2, pizzaType: 1 }),
    generateProductItem({ productId: 3, size: 3, pizzaType: 2 }),

    generateProductItem({ productId: 4, size: 1, pizzaType: 2 }),
    generateProductItem({ productId: 4, size: 2, pizzaType: 2 }),
    // Колеса (в штуках)
    { productId: 5, price: 1500, size: 1, pizzaType: 1 }, // 1 табла
    { productId: 5, price: 4000, size: 3, pizzaType: 2 }, // 3 таблы

    { productId: 6, price: 2000, size: 1, pizzaType: 1 }, // 1 табла
    { productId: 6, price: 5500, size: 3, pizzaType: 2 }, // 3 таблы
    // Премиксы
    generateProductItem({ productId: premix1.id, size: 1, pizzaType: 1 }),
    generateProductItem({ productId: premix1.id, size: 2, pizzaType: 2 }),

    generateProductItem({ productId: premix2.id, size: 1, pizzaType: 1 }),
    generateProductItem({ productId: premix2.id, size: 1, pizzaType: 2 }),
    generateProductItem({ productId: premix2.id, size: 2, pizzaType: 2 }),
    generateProductItem({ productId: premix2.id, size: 2, pizzaType: 1 }),
    generateProductItem({ productId: premix2.id, size: 3, pizzaType: 1 }),
  ];

  await prisma.productItem.createMany({ data: productItemsData });

  // 🛒 КОРЗИНЫ
  await prisma.cart.createMany({
    data: [
      {
        id: 1,
        userId: 1,
        totalAmount: 6500,
        userToken: "baryga_token_123",
      },
      {
        id: 2,
        userId: 2,
        totalAmount: 0,
        userToken: "kuryer_token_456",
      },
    ],
  });

  // 📦 ТОВАРЫ В КОРЗИНЕ
  await prisma.cartItem.create({
    data: {
      id: 1,
      cartId: 1,
      productItemId: 1, // кристаллы 0.5г
      quantity: 2,
      ingredients: {
        connect: [ingredients[2], ingredients[6]], // добавить лидокаин и сахар
      },
    },
  });

  await prisma.cartItem.create({
    data: {
      id: 2,
      cartId: 1,
      productItemId: 9, // гашиш 0.5г
      quantity: 1,
    },
  });

  await prisma.cartItem.create({
    data: {
      id: 3,
      cartId: 2,
      productItemId: 5, // марки
      quantity: 5,
    },
  });

  // Обновляем общую сумму в корзине
  await prisma.cart.update({
    where: { id: 1 },
    data: { totalAmount: 6500 },
  });

  console.log("✅ База данных успешно заполнена!");
  console.log("\n📊 Статистика:");
  console.log(`👤 Пользователей: 3`);
  console.log(`🏷️ Категорий: ${categories.length}`);
  console.log(`🧪 Ингредиентов: ${ingredients.length}`);
  console.log(`📦 Продуктов: ${products.length + 2}`); // +2 премикса
  console.log(`📏 Вариантов фасовок: ${productItemsData.length}`);
}

async function main() {
  try {
    await deleteAll();
    await download();
  } catch (error) {
    console.error("❌ Ошибка:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
