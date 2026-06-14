import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reviews, users } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const reviewsRouter = createRouter({
  // Create a review
  create: publicQuery
    .input(
      z.object({
        bookingId: z.number(),
        customerId: z.number(),
        operatorId: z.number(),
        rating: z.number().min(1).max(5),
        comment: z.string().min(1),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(reviews).values({
        bookingId: input.bookingId,
        customerId: input.customerId,
        operatorId: input.operatorId,
        rating: input.rating,
        comment: input.comment,
      });

      // Update operator rating
      const operatorReviews = await db
        .select()
        .from(reviews)
        .where(eq(reviews.operatorId, input.operatorId));
      
      const avgRating = operatorReviews.reduce((sum, r) => sum + r.rating, 0) / operatorReviews.length;
      
      await db
        .update(users)
        .set({ 
          rating: avgRating.toFixed(1),
          totalReviews: operatorReviews.length 
        })
        .where(eq(users.id, input.operatorId));

      return { id: Number(result[0].insertId), ...input };
    }),

  // Get reviews for an operator
  getByOperator: publicQuery
    .input(z.object({ operatorId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select({
          id: reviews.id,
          bookingId: reviews.bookingId,
          customerId: reviews.customerId,
          operatorId: reviews.operatorId,
          rating: reviews.rating,
          comment: reviews.comment,
          createdAt: reviews.createdAt,
          customerName: users.name,
          customerAvatar: users.avatar,
        })
        .from(reviews)
        .leftJoin(users, eq(reviews.customerId, users.id))
        .where(eq(reviews.operatorId, input.operatorId))
        .orderBy(desc(reviews.createdAt));
      return results;
    }),

  // Get reviews by booking
  getByBooking: publicQuery
    .input(z.object({ bookingId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(reviews)
        .where(eq(reviews.bookingId, input.bookingId));
    }),
});
