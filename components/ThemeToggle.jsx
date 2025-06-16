'use client';

import { useTheme } from './ThemeProvider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === 'light' ? (
        <>
          <MoonIcon className="h-5 w-5" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <SunIcon className="h-5 w-5" />
          <span>Light</span>
        </>
      )}
    </button>
  );
}
