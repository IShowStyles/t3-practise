import { postRouter } from '~/server/api/routers/post';
import { createTRPCRouter } from '~/server/api/trpc';
import { pizzaRouter } from '~/server/api/routers/pizza';
import { authRouter } from '~/server/api/routers/register';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  pizza: pizzaRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
