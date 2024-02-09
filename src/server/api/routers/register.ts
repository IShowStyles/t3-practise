import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, username, password } = input;
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds
        const users = await ctx.db.user.findUnique({
          where: {
            email: email,
          },
        });
        if (users) {
          return {
            msg: `user already exist ${users.email}`,
          };
        }
        const createUser = await ctx.db.user.create({
          data: {
            email: email,
            username: username,
            password: hashedPassword,
          },
        });
        return createUser;
      } catch (e) {}
    }),
});
