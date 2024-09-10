// pages/api/tracker/[number].ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("number");

  console.log("user", userId);
  //   const {
  //     query: { number },
  //   } = req;

  //   console.log(number);

  //   try {
  //     const tracker = await prisma.tracker.findUnique({
  //       where: {
  //         number: Number(number),
  //       },
  //     });

  //     return NextResponse.json(tracker,{
  //         status: 200
  //     })
  //     res.status(200).json(tracker);
  //   } catch (error) {
  //     console.error(error);
  //     return NextResponse.json(
  //       { error: "Failed to create task" },
  //       { status: 500 })
  //   }
}
