import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  const {
    userName,
    email,
    password,
  }: {
    userName: string;
    email: string;
    password: string;
  } = await req.body;

  if (!email.length && !password.length && !userName.length) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: {
      email: email,
      password: hashedPassword,
      username: userName,
    },
  });

  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json(userWithoutPassword);
}
