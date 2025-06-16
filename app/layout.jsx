import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'Project Dashboard',
  description: 'Project management dashboard',
};

export default function RootLayout({ children }) {
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
          <div className="font-exo flex min-h-screen bg-gray-100 dark:bg-[#2A2B2F] text-gray-900 dark:text-gray-100 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
