"use client";

import { useTheme } from "./ThemeProvider";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-row gap-1 items-center bg-[#F6F6F6] dark:bg-[#2B2C30] rounded-full p-1 w-[230px]">
      <button
        disabled={theme === "light"}
        onClick={toggleTheme}
        className={`transition-all ease-in-out duration-300 w-[127px] disabled:bg-none disabled:hover:bg-none justify-center flex items-center space-x-1 px-3 py-1 ${theme === "light" ? "bg-white shadow-md" : "bg-none"} rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600`}
      >
        <SunIcon className="h-4 w-4" />
        <span>Light</span>
      </button>
      <button
        disabled={theme === "dark"}
        onClick={toggleTheme}
        className={`transition-all ease-in-out duration-300 w-[127px] disabled:bg-none disabled:hover:bg-none  justify-center flex items-center space-x-1 px-3 py-1 ${theme === "dark" ? "bg-gray-600 shadow-md" : "bg-none"} rounded-full text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600`}
      >
        <MoonIcon className="h-4 w-4" />
        <span>Dark</span>
      </button>
    </div>
  );
}
