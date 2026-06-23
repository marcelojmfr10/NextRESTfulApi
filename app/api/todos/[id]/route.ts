import { Todo } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import * as yup from "yup";

interface Segments {
  params: Promise<{ id: string }>;
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });
  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = await params;

  const todo = await getTodo(id);

  if (!todo) {
    return Response.json(
      { message: `Todo con id ${id} no existe.` },
      { status: 400 },
    );
  }

  return Response.json(todo);
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = await params;

  const todo = await getTodo(id);

  if (!todo) {
    return Response.json(
      { message: `Todo con id ${id} no existe.` },
      { status: 400 },
    );
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json(),
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return Response.json(updatedTodo);
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
