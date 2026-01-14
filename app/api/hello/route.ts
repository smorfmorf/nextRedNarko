import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function POST(request: Request) {
  const { title, text, author } = await request.json(); // читаем body как JSON

  const data = await prismaClient.twit.create({
    data: {
      title,
      text,
      author,
    },
  });

  console.log(data);

  return NextResponse.json({ message: "Hello from API!" });
}
