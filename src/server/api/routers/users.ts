import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const usersRouter = createTRPCRouter({
  get: publicProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany();
  }),
});
