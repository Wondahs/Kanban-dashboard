// components/Board.jsx
// By default a server component
'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import TaskColumn from './TaskColumn';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Board({ tasksByStatus }) {
  const router = useRouter();
  const columns = [
    { key: 'TODO', title: 'To do' },
    { key: 'IN_PROGRESS', title: 'In progress' },
    { key: 'DONE', title: 'Done' },
  ];


  // This function runs after a draggable has been dragged and dropped
  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Update the task status
    const toastId = toast.loading('Updating task status...');
    try {
      await fetch('/api/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: draggableId,
          fields: {
            status: destination.droppableId,
          },
        }),
      });
      toast.success('Task status updated', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error('Error updating task status:', error);
      toast.error('Failed to update task status', {id: toastId});
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col flex-wrap text-gray-400 md:flex-row gap-4 p-4 h-full overflow-auto custom-scrollbar">
        {columns.map((col) => (
          <TaskColumn
            key={col.key}
            statusKey={col.key}
            title={col.title}
            tasks={tasksByStatus[col.key] || []}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
