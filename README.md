# Project Dashboard

A modern, full-stack project management dashboard inspired by popular Kanban tools. Built with Next.js, Tailwind CSS, Prisma, and PostgreSQL (Supabase-ready), it features real-time drag-and-drop, theming, and more.

---

## ✨ Features

- **Kanban Board**: Organize tasks into columns (To do, In progress, Done)
- **Drag and Drop**: Move tasks between columns with smooth drag-and-drop
- **Task Management**: Add, update, and delete tasks with live UI updates
- **Progress Tracking**: Visual progress bars for each task
- **User Assignment**: Assign users to tasks with avatars
- **Due Dates**: Display due dates with badges
- **Theme Changer**: Toggle between light and dark mode (with system preference support)
- **Responsive Design**: Works beautifully on desktop and mobile
- **Sidebar Navigation**: Quick access to projects, tasks, reminders, and more
- **Board Toolbar**: Filter, sort, and manage board views
- **Notifications**: Toast notifications for task actions

---

## 🛠️ Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Supabase-ready) via Prisma ORM
- **Drag & Drop**: @hello-pangea/dnd
- **State/Data**: React Query (TanStack Query)
- **Icons**: Heroicons
- **Avatars**: DiceBear Avatars
- **Notifications**: react-hot-toast

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd my-dashboard
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env.example` to `.env` and set your `DATABASE_URL` (PostgreSQL recommended for production, e.g. Supabase)
   ```env
   DATABASE_URL="postgresql://username:password@host:port/dbname?sslmode=require"
   ```
4. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   # or, for development
   npx prisma migrate dev --name init
   ```
5. **(Optional) Seed the database:**
   ```bash
   npm run db:seed
   ```
6. **Start the development server:**
   ```bash
   npm run dev
   ```
7. **Visit** [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

- `app/` — Next.js App Router pages and layout
- `components/` — React components (client & server)
- `lib/prisma.ts` — Prisma client helper
- `prisma/schema.prisma` — Database schema
- `public/` — Static assets
- `tailwind.config.js`, `postcss.config.js` — Tailwind setup

---

## 🌐 Deployment

- **Vercel** is recommended for deployment.
- **Important:** Use PostgreSQL (e.g., Supabase, Neon, Railway) in production. SQLite is not supported on Vercel.
- Set your `DATABASE_URL` in Vercel's environment variables.
- Run migrations and seed your production database as needed.

---

## 🙏 Credits

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://prisma.io/)
- [Supabase](https://supabase.com/)
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd)
- [Heroicons](https://heroicons.com/)
- [DiceBear Avatars](https://www.dicebear.com/)
- [react-hot-toast](https://react-hot-toast.com/)

---

## 📄 License

MIT
