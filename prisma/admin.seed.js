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

  const hashedPassword = await bcrypt.hash(adminPassword, 10); // 10 is the number of salt rounds
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      username: 'Admin-User-1',
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
