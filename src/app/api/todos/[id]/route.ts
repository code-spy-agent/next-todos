import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { title, completed } = await request.json();
  const todoId = parseInt(params.id, 10);
  const todo = await prisma.todo.update({
    where: { id: todoId },
    data: { title, completed },
  });
  return NextResponse.json(todo);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const todoId = parseInt(params.id, 10);
  await prisma.todo.delete({ where: { id: todoId } });
  return new NextResponse(null, { status: 204 });
}
