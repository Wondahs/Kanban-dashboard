"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import IconMenu from "./IconMenu";

export default function Sidebar() {
  const menu = [
    { title: "Team", items: [] },
    {
      title: "Projects",
      items: ["All projects (3)", "Design system", "User flow", "Ux research"],
    },
    {
      title: "Tasks",
      items: ["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"],
    },
    { title: "Reminders", items: [] },
    { title: "Messengers", items: [] },
  ];

  const [openSections, setOpenSections] = useState({
    Projects: true,
    Tasks: true,
  });

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <aside className="bg-white dark:bg-[#222327] text-gray-800 dark:text-gray-200 flex-shrink-0 flex flex-col">
      <div className="flex flex-row h-full">
        <div className="flex flex-row">
          <IconMenu />
        </div>
        <div className="h-full flex flex-col w-[278px]">
          <div className="px-4 py-4 text-2xl font-bold border-0 border-gray-200 dark:border-gray-700">
            Projects
          </div>
          <nav className="flex-1 overflow-y-auto">
            {menu.map((section) => (
              <div key={section.title}>
                <button
                  onClick={() => {
                    if (section.items.length > 0) toggleSection(section.title);
                  }}
                  className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <span className="font-medium">{section.title}</span>
                  {section.items.length > 0 ? (
                    openSections[section.title] ? (
                      <ChevronDownIcon className="h-5 w-5" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5" />
                    )
                  ) : null}
                </button>
                {section.items.length > 0 && openSections[section.title] && (
                  <ul className="pl-8">
                    {section.items.map((item) => (
                      <li key={item}>
                        <button className="w-full text-left px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
