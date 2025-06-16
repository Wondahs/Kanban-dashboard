 'use client';

import { FunnelIcon, Squares2X2Icon, PlusIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';

export default function BoardToolbar() {
  return (
    <div className="flex items-center justify-between py-4 px-2 md:px-0">
      {/* Left: Board view and Add view */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500">
          <Squares2X2Icon className="h-5 w-5" />
          Board view
        </button>
        <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
          <PlusIcon className="h-5 w-5" />
          Add view
        </button>
      </div>
      {/* Right: Filter, Sort, New template */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
          <FunnelIcon className="h-5 w-5" />
          Filter
        </button>
        <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
          <ArrowsUpDownIcon className="h-5 w-5" />
          Sort
        </button>
        <button className="ml-2 flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
          New template
        </button>
      </div>
    </div>
  );
}
