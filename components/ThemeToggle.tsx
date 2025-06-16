"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-row gap-2 items-center bg-[#F6F6F6] dark:bg-[#2B2C30] rounded-full p-2 w-[230px]">
      <button
        disabled={theme === "light"}
        onClick={toggleTheme}
        className="w-[127px] disabled:opacity-50 disabled:cursor-not-allowed justify-center flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        <SunIcon className="h-4 w-4" />
        <span>Light</span>
      </button>
      <button
        disabled={theme === "dark"}
        onClick={toggleTheme}
        className="w-[127px] disabled:opacity-50 disabled:cursor-not-allowed justify-center flex items-center space-x-1 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        <MoonIcon className="h-4 w-4" />
        <span>Dark</span>
      </button>
    </div>
  );
}
