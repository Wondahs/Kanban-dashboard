import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: { assignedUsers: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      subtitle = null,
      dueDate = null,
      progressTotal = 10,
      status = "TODO",
    } = body;

    if (!title || typeof title !== "string") {
      return NextResponse.json({ error: "Invalid title" }, { status: 400 });
    }
    const data: any = {
      title,
      progressTotal: Number(progressTotal) || 10,
      progressCurrent: 0,
      status,
    };
    if (subtitle) data.subtitle = subtitle;
    if (dueDate) {
      data.dueDate = new Date(dueDate);
    }
    const newTask = await prisma.task.create({ data });
    return NextResponse.json({ task: newTask });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, fields } = body;
    if (!id || typeof id !== "string" || typeof fields !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const updateData: any = {};
    if (fields.title !== undefined) updateData.title = fields.title;
    if (fields.subtitle !== undefined) updateData.subtitle = fields.subtitle;
    if (fields.progressCurrent !== undefined) updateData.progressCurrent = Number(fields.progressCurrent);
    if (fields.progressTotal !== undefined) updateData.progressTotal = Number(fields.progressTotal);
    if (fields.status !== undefined) updateData.status = fields.status;
    if (fields.dueDate !== undefined) {
      updateData.dueDate = fields.dueDate ? new Date(fields.dueDate) : null;
    }
    const updated = await prisma.task.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json({ task: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
