'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddTaskForm({ statusKey, onClose }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [progressTotal, setProgressTotal] = useState(10);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      progressTotal: Number(progressTotal) || 10,
      status: statusKey,
    };
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to create');
      }
      router.refresh();
      onClose();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 space-y-2 mb-2">
      {error && <div className="text-red-500 text-xs">{error}</div>}
      <div>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-sm"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Subtitle (optional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-sm"
        />
      </div>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 dark:text-gray-300">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-sm"
          />
        </div>
        <div className="w-20">
          <label className="block text-xs text-gray-500 dark:text-gray-300">Total</label>
          <input
            type="number"
            min="1"
            value={progressTotal}
            onChange={(e) => setProgressTotal(e.target.value)}
            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-100 text-sm"
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </form>
  )
}