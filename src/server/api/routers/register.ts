import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { z } from 'zod';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        userName: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { email, userName, password } = input;
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
            username: userName,
            password: password!,
          },
        });
        return createUser;
      } catch (e) {}
    }),
});
