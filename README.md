# My Dashboard Project

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Tailwind CSS setup is already configured.
3. Set environment variable for database in `.env` (e.g., `DATABASE_URL="file:./dev.db"` for SQLite).
4. Run Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start development server:
   ```bash
   npm run dev
   ```

## Structure

- `app/`: Next.js App Router pages and layout
- `components/`: React components (client & server)
- `lib/prisma.ts`: Prisma client helper
- `prisma/schema.prisma`: Database schema
- `tailwind.config.js`, `postcss.config.js`: Tailwind setup
- `public/`: static assets
