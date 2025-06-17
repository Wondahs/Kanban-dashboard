"use client";

import { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddTaskForm from "./AddTaskForm";

export default function TaskColumn({
  statusKey,
  title,
  tasks,
}: {
  statusKey: string;
  title: string;
  tasks: any[];
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 min-w-[280px] max-w-full border-2 border-dashed border-gray-300 dark:border-none dark:bg-[#24262C] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 px-2">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title} ({tasks.length})
        </h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <PlusIcon className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full p-1" />
          <span className="text-xs font-semibold ml-1 text-gray-900 dark:text-gray-200">
            Add new task
          </span>
        </button>
      </div>
      {/* Show the add task form if showForm is true */}
      {showForm && (
        <AddTaskForm statusKey={statusKey} onClose={() => setShowForm(false)} />
      )}
      {/* Droppable area for the tasks */}
      <Droppable droppableId={statusKey}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-3 overflow-y-auto custom-scrollbar ${
              snapshot.isDraggingOver ? "bg-gray-50 dark:bg-[#2A2B2F]" : ""
            }`}
          >
            {tasks.map((task: any, index: number) => (
              <TaskCard key={task.id} {...task} index={index} />
            ))}
            {/* The dropped item goes here */}
            {provided.placeholder}

            <div className="flex items-center justify-center mt-4 min-h-24 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded text-center text-gray-500 dark:text-gray-400">
              <span className="text-sm">Drag your task here...</span>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
