import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

// Define a schema for pagination parameters
const paginationSchema = z.object({
  skip: z.number().int().optional(),
  take: z.number().int().positive().optional(),
});

const updatePizzaInputSchema = z.object({
  id: z.string().optional(), // ID of the pizza product to update
  image: z.string().optional(),
  name: z.string().optional(),
  price: z.number().positive().optional(),
  description: z.string().optional(),
});

const deletePizzaInputSchema = z.object({
  id: z.string(), // Assuming id is the identifier of the pizza product to be deleted
});

enum PizzaSize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}

const createPizzaInputSchema = z.object({
  image: z.string(),
  name: z.string(),
  price: z.number().positive(),
  description: z.string(),
  size: z.nativeEnum(PizzaSize),
});

export const pizzaRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.pizzaProduct.findMany();
  }),

  getPaginated: publicProcedure.query(async ({ ctx, input }) => {
    const { skip = 0, take = 12 } = paginationSchema.parse(input);

    const pizzaProducts = await ctx.db.pizzaProduct.findMany({
      skip: skip,
      take: take,
      orderBy: {
        id: 'desc',
      },
    });

    return pizzaProducts;
  }),
  createPizza: protectedProcedure.mutation(async ({ ctx, input }) => {
    const data = createPizzaInputSchema.parse(input);
    const created = await ctx.db.pizzaProduct.create({
      data: {
        name: data.name,
        image: data.image,
        description: data.description,
        price: data.price,
        size: data.size,
      },
    });
    return created;
  }),
  updatePizza: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id, ...updateData } = updatePizzaInputSchema.parse(input);
    try {
      // Update the pizza product using the provided ID and update data
      const updatedPizzaProduct = await ctx.db.pizzaProduct.update({
        where: {
          id,
        },
        data: updateData,
      });

      return updatedPizzaProduct;
    } catch (error) {
      console.error('Error updating pizza:', error);
      throw new Error('Failed to update pizza');
    }
  }),
  deletePizza: protectedProcedure.mutation(async ({ ctx, input }) => {
    const { id: ids } = deletePizzaInputSchema.parse(input);
    try {
      const deletedPizzaProduct = await ctx.db.pizzaProduct.delete({
        where: {
          id: ids,
        },
      });

      return deletedPizzaProduct;
    } catch (error) {
      console.error('Error deleting pizza:', error);
      throw new Error('Failed to delete pizza');
    }
  }),
});
