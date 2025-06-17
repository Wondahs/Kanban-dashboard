import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Sidebar from '../components/Sidebar';
import { prisma } from '@/lib/prisma';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Project Dashboard',
  description: 'Project management dashboard',
};

export default async function RootLayout({ children }) {
    // Fetch tasks
    const tasks = await prisma.task.findMany({
      include: { assignedUsers: true },
      orderBy: { createdAt: 'asc' },
    });
  
    const taskCounts = {
      all: tasks.length,
      todo: tasks.filter((t) => t.status === 'TODO').length,
      inProgress: tasks.filter((t) => t.status === 'IN_PROGRESS').length,
      done: tasks.filter((t) => t.status === 'DONE').length,
    }
  return (
    <html lang="en">
      <body>
        {/* Inline script to set initial theme to avoid flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    }
  } catch(e) {}
})();
`,
          }}
        />
        <ThemeProvider>
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: 'var(--toast-border)',
            },
          }}/>
          <div className="font-exo flex min-h-screen bg-white dark:bg-[#2A2B2F] text-gray-900 dark:text-gray-100 ">
            <Sidebar taskCounts={taskCounts} />
            <main className="flex-1 flex flex-col overflow-auto h-screen custom-scrollbar">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
