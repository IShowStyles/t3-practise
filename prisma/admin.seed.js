import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';

const prisma = new PrismaClient();

async function main() {
  config();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail === undefined || adminPassword === undefined) {
    throw new Error('Admin email or password is not provided.');
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
