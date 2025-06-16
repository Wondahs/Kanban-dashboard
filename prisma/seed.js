const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create sample users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      },
    }),
  ]);

  // Create sample tasks
  const tasks = await Promise.all([
    // TODO Tasks
    prisma.task.create({
      data: {
        title: 'Design System Implementation',
        subtitle: 'Create a consistent design system for the dashboard',
        progressCurrent: 0,
        progressTotal: 10,
        status: 'TODO',
        assignedUsers: {
          connect: [{ id: users[0].id }, { id: users[1].id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'API Documentation',
        subtitle: 'Write comprehensive API documentation',
        progressCurrent: 0,
        progressTotal: 10,
        status: 'TODO',
        assignedUsers: {
          connect: [{ id: users[2].id }],
        },
      },
    }),

    // IN_PROGRESS Tasks
    prisma.task.create({
      data: {
        title: 'Dashboard Analytics',
        subtitle: 'Implement analytics dashboard with charts',
        progressCurrent: 5,
        progressTotal: 10,
        status: 'IN_PROGRESS',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        assignedUsers: {
          connect: [{ id: users[0].id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'User Authentication',
        subtitle: 'Implement OAuth2 authentication flow',
        progressCurrent: 7,
        progressTotal: 10,
        status: 'IN_PROGRESS',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        assignedUsers: {
          connect: [{ id: users[1].id }, { id: users[2].id }],
        },
      },
    }),

    // DONE Tasks
    prisma.task.create({
      data: {
        title: 'Project Setup',
        subtitle: 'Initial project setup and configuration',
        progressCurrent: 10,
        progressTotal: 10,
        status: 'DONE',
        assignedUsers: {
          connect: [{ id: users[0].id }],
        },
      },
    }),
    prisma.task.create({
      data: {
        title: 'Database Schema',
        subtitle: 'Design and implement database schema',
        progressCurrent: 10,
        progressTotal: 10,
        status: 'DONE',
        assignedUsers: {
          connect: [{ id: users[1].id }],
        },
      },
    }),
  ]);

  console.log('Database has been seeded. 🌱');
  console.log('Created users:', users.length);
  console.log('Created tasks:', tasks.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 