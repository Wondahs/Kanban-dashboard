import { prisma } from '../lib/prisma';
import Board from '../components/Board';
import Header from '../components/Header';

export default async function Page() {
  // Fetch tasks
  const tasks = await prisma.task.findMany({
    include: { assignedUsers: true },
    orderBy: { createdAt: 'asc' },
  });

  const tasksByStatus = {
    TODO: [],
    IN_PROGRESS: [],
    DONE: [],
  };
  for (const t of tasks) {
    tasksByStatus[t.status].push({
      id: t.id,
      title: t.title,
      subtitle: t.subtitle || '',
      progressCurrent: t.progressCurrent,
      progressTotal: t.progressTotal,
      dueDate: t.dueDate ? t.dueDate.toISOString() : null,
      assignedUsers: t.assignedUsers.map((u) => ({
        id: u.id,
        name: u.name,
        avatarUrl: u.avatarUrl || null,
      })),
    });
  }

  const userName = 'Vincent';

  return (
    <>
      <Header userName={userName} />
      <Board tasksByStatus={tasksByStatus} />
    </>
  );
}

export const dynamic = "force-dynamic";
