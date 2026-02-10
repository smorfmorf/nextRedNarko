import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prismaClient = new PrismaClient();

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query")!;

  const data = await prismaClient.product.findMany({
    where: {
      name: {
        contains: query,
      },
    },
  });
  return NextResponse.json(data);
}
// export async function POST(request: Request) {
//   const { title, text, author } = await request.json(); // читаем body как JSON

//   const data = await prismaClient.twit.create({
//     data: {
//       title,
//       text,
//       author,
//     },
//   });

//   console.log(data);

//   return NextResponse.json({ message: "Hello from API!", data });
// }
