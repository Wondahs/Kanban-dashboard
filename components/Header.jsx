'use client';

import { MagnifyingGlassIcon, BellIcon, CalendarIcon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';

export default function Header({ userName }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-[#2A2B2F] border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-semibold">Welcome back, {userName} 👋</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 relative">
          <BellIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <CalendarIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
          alt="User avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>
    </header>
  )
}
