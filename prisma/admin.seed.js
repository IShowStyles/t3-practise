import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  const data = dotenv.config().parsed;
  let adminPassword = '';
  let adminEmail = '';
  if (data !== undefined) {
    adminEmail = data.ADMIN_EMAIL || 'admin@example.com';
    adminPassword = data.ADMIN_PASSWORD || 'admin123';
  }

  // Check if admin email and password are not provided
  if (adminEmail === 'admin@example.com' || adminPassword === 'admin123') {
    console.warn('Using default admin email or password. Please provide values in your .env file.');
  }

  await prisma.user.deleteMany({
    where: {
      role: 'ADMIN',
    },
  });

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      email: adminEmail,
      username: 'Admin-User-333',
      password: hashedPassword,
      role: 'ADMIN',
    },
    create: {
      email: adminEmail,
      username: 'Admin-User-333',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
