import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("Database connection unsuccessful");
  }
}

export const GET = async (req: Request, response: NextResponse) => {
  try {
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", posts }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: Request, response: NextResponse) => {
  try {
    const { title, description } = await req.json();
    await main();
    const post = await prisma.post.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
