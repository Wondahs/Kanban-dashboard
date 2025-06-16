"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import IconMenu from "./IconMenu";

export default function Sidebar({ taskCounts }) {
  const menu = [
    { title: "Team", items: [] },
    {
      title: "Projects",
      items: ["All projects (3)", "Design system", "User flow", "Ux research"],
    },
    {
      title: "Tasks",
      items: [`All tasks (${taskCounts.all})`, `To do (${taskCounts.todo})`, `In progress (${taskCounts.inProgress})`, `Done (${taskCounts.done})`],
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
    <aside className="overflow-y-auto bg-white dark:bg-[#222327] drop-shadow-lg dark:shadow-none font-semibold text-gray-400 flex-shrink-0 flex flex-col custom-scrollbar">
      <div className="flex flex-row h-screen">
        <div className="flex flex-row">
          <IconMenu />
        </div>
        <div className="h-full flex flex-col w-[278px]">
          <div className="px-4 py-4 text-2xl text-gray-800 dark:text-gray-200 font-bold border-0 border-gray-200 dark:border-gray-700">
            Projects
          </div>
          <nav className="flex-1 overflow-y-auto mt-5 custom-scrollbar">
            {menu.map((section) => (
              <div key={section.title}>
                <button
                  onClick={() => {
                    if (section.items.length > 0) toggleSection(section.title);
                  }}
                  className={`${openSections[section.title] ? 'text-gray-800 dark:text-gray-200' : ''} w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <span className="font">{section.title}</span>
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
                        <button className="flex w-full text-left px-4 py-0 ">
                          <div className="w-[1px] min-h-4 m-0 bg-gray-400"><span></span></div>
                          <div className="w-5 h-[1px] m-0 my-auto mr-3 bg-gray-400"><span></span></div>
                          <div className="hover:font-bold hover:text-gray-800 dark:hover:text-gray-200 px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-2xl">
                          <p className="m-0 p-0 h-min">{item}</p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
          <div className="px-4 py-4 bottom-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </aside>
  );
}
