import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();

  await prisma.todo.createMany({
    data: [
      {
        description: "hacer la tarea",
        complete: true,
      },
      {
        description: "hacer la despensa",
        complete: false,
      },
      {
        description: "comprar comida",
        complete: false,
      },
      {
        description: "comprar los útiles",
        complete: false,
      },
      {
        description: "manejar el carro",
        complete: false,
      },
    ],
  });

  return Response.json({ ms: "Seed Executed" });
}
