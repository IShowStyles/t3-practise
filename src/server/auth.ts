import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type DefaultSession, type DefaultUser , type NextAuthOptions, getServerSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import { env } from '~/env';
import { db } from '~/server/db';
import * as process from 'process';
import { UserRole } from '@prisma/client';

/**
 * Module augmentation for next-auth types. Allows us to add custom properties to the session
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      username: string;
      role: UserRole;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: string;
    id: string;
    email: string;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, SessionProvider, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

const scopes = ['identify', 'email'];

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async (params) => {
      const { session, user } = params;
      const users = await db.user.findUnique({
        where: {
          email: user.email,
        },
      });
      session.user.role = users!.role;
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: scopes.join(' ') } },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Enter email', type: 'text', placeholder: 'email' },
        username: { label: 'Enter username', type: 'text', placeholder: 'username' },
        password: { label: 'Enter password', type: 'text', placeholder: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials!.email || !credentials!.password || !credentials!.username) {
          throw new Error('Email and password are required');
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials!.email,
          },
        });
        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isPasswordValid) {
          return null;
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Wrapper for getServerSession so that you don't need to import the authOptions in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
