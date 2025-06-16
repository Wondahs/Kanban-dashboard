import {
  Squares2X2Icon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

const iconMenu = [
  { icon: <Squares2X2Icon className="h-6 w-6" />, label: 'Dashboard' },
  { icon: <UserGroupIcon className="h-6 w-6" />, label: 'Team' },
  { icon: <ClipboardDocumentListIcon className="h-6 w-6" />, label: 'Tasks' },
  { icon: <BellIcon className="h-6 w-6" />, label: 'Reminders' },
  { icon: <ChatBubbleLeftRightIcon className="h-6 w-6" />, label: 'Messengers' },
  { icon: <Cog6ToothIcon className="h-6 w-6" />, label: 'Settings' },
];

export default function IconMenu() {
  return (
    <div className="flex flex-col items-center gap-6 py-6 border-b bg-[#1C1D22] text-gray-200 border-gray-800 w-[90px]">
      {iconMenu.map((item) => (
        <button
          key={item.label}
          className="hover:bg-gray-800 p-2 rounded-xl transition"
          title={item.label}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
} 