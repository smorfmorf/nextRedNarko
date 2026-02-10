import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prismaClient = new PrismaClient();
export async function GET(request: NextRequest) {
  const data = await prismaClient.ingredient.findMany();
  return NextResponse.json(data);
}
