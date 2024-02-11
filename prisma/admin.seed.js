import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import * as process from 'process';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL?.toString(); // Optional chaining
  const adminPassword = process.env.ADMIN_PASSWORD?.toString(); // Optional chaining

  if (!adminEmail || !adminPassword) {
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
