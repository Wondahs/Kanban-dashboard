'use client';

import { useState } from 'react';
import TaskCard from './TaskCard';
import { PlusIcon } from '@heroicons/react/24/outline';
import AddTaskForm from './AddTaskForm';

export default function TaskColumn({ statusKey, title, tasks }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 min-w-[280px] max-w-full bg-gray-50 dark:bg-[#24262C] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 px-2">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title} ({tasks.length})
        </h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <PlusIcon className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full p-1" />
          <span className="text-xs font-semibold ml-1 text-gray-900 dark:text-gray-200">Add new task</span>
        </button>
      </div>
      {showForm && (
        <AddTaskForm
          statusKey={statusKey}
          onClose={() => setShowForm(false)}
        />
      )}
      <div className="space-y-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
        {tasks.length === 0 && !showForm && (
          <div className="mt-4 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded text-center text-gray-500 dark:text-gray-400">
            Drag your task here...
          </div>
        )}
      </div>
    </div>
  )
}