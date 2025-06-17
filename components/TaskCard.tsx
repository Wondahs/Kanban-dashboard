'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Draggable } from '@hello-pangea/dnd';
import toast from 'react-hot-toast';

export default function TaskCard({
  id,
  title,
  subtitle,
  progressCurrent,
  progressTotal,
  dueDate,
  assignedUsers = [],
  index,
}) {
  const router = useRouter();

  const percent = useMemo(() => {
    if (!progressTotal || progressTotal === 0) return 0;
    return Math.min(100, Math.round((progressCurrent / progressTotal) * 100));
  }, [progressCurrent, progressTotal]);

  const barColorClass = useMemo(() => {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }, [percent]);

  const deleteTask = async (id: string) => {
    const toastId = toast.loading('Deleting task...');
    try {
      await fetch(`/api/tasks`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      toast.success('Task deleted successfully', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };
  
  const updateProgress = async (id: string) => {
    const toastId = toast.loading('Updating progress...');
    try {
      await fetch(`/api/tasks`, {
        method: 'PUT',
        body: JSON.stringify({ id, fields: { progressCurrent: progressCurrent + 1 } }),
      });
      toast.success('Progress updated successfully', { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  // Only apply overlap if more than one user
  const isMultiple = assignedUsers.length > 1;

  const avatarElements = assignedUsers.slice(0, 2).map((user, idx) => {
    const overlapClass = isMultiple && idx > 0 ? '-ml-2' : '';
    if (user.avatarUrl) {
      return (
        <img
          key={user.id || idx}
          src={user.avatarUrl}
          alt={user.name}
          className={`rounded-full object-cover border-2 border-white dark:border-gray-800 h-6 w-6 ${overlapClass}`}
        />
      );
    } else {
      const initials = user.name
        .split(' ')
        .map((w) => w[0]?.toUpperCase())
        .join('')
        .slice(0, 2);
      const bgClass = idx % 2 === 0 ? 'bg-blue-500' : 'bg-purple-500';
      return (
        <div
          key={user.id || idx}
          className={`rounded-full flex items-center justify-center text-xs font-medium text-white border-2 border-white dark:border-gray-800 h-6 w-6 ${bgClass} ${overlapClass}`}
        >
          {initials}
        </div>
      );
    }
  });

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`hover:bg-gray-100 dark:hover:bg-[#34373d] bg-white dark:bg-[#292B31] border border-gray-200 dark:border-none rounded-xl shadow-md p-5 space-y-2 ${
            snapshot.isDragging ? 'shadow-lg' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200">
              {title}
            </h3>
            <Menu as="div" className="relative">
              <MenuButton className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-[50%] p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                <EllipsisHorizontalIcon className="h-5 w-5" />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#292B31] rounded-md shadow-lg py-1 focus:outline-none">
                <MenuItem>
                  <button className="text-left w-full text-gray-700 dark:text-gray-300 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => {
                      deleteTask(id);
                    }}
                  >
                    Delete
                  </button>
                </MenuItem>
                <MenuItem>
                  <button className="text-left w-full text-gray-700 dark:text-gray-300 block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => {
                      updateProgress(id);
                    }}
                  >
                    Update Progress <br /> <span className="text-xs text-gray-400 dark:text-gray-300">Adds 1 to the current progress</span>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
          {subtitle && (
            <div className="text-xs text-gray-400">
              {subtitle}
            </div>
          )}
          <div className="text-xs text-gray-400 flex justify-between">
            <span>Progress</span>
            <span className="text-gray-900 dark:text-gray-200">
              {progressCurrent}/{progressTotal}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 overflow-hidden">
            <div
              className={`${barColorClass} h-2`}
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            {dueDate ? (
              <span className="px-2 py-1 bg-gray-100 dark:bg-[#36373D] rounded-full">
                {new Date(dueDate).toLocaleDateString(undefined, {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            ) : (
              <span />
            )}
            <div className="flex items-center">
              {avatarElements}
              {assignedUsers.length > 2 && (
                <span className="text-xs text-gray-400 ml-2">
                  +{assignedUsers.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}