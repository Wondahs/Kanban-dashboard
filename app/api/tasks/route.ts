import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      include: { assignedUsers: true },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(tasks, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        status: data.status,
        progressCurrent: 0,
        progressTotal: data.progressTotal || 10,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id, fields } = await request.json();
    
    const updatedTask = await prisma.task.update({
      where: { id },
      data: fields,
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
