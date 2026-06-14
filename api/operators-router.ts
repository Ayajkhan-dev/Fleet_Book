import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, vehicles, reviews } from "@db/schema";
import { eq, and, sql } from "drizzle-orm";

export const operatorsRouter = createRouter({
  // Search operators with filters
  search: publicQuery
    .input(
      z.object({
        city: z.string().optional(),
        date: z.string().optional(),
        cars: z.number().min(1).optional(),
        type: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        sortBy: z.enum(["price_asc", "price_desc", "rating", "fleet_size"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      
      let conditions = [eq(users.role, "operator"), eq(users.status, "active")];
      
      if (input.city && input.city !== "all") {
        conditions.push(sql`${users.city} LIKE ${`%${input.city}%`}`);
      }

      const operatorsList = await db
        .select()
        .from(users)
        .where(and(...conditions));

      const operatorsWithFleet = await Promise.all(
        operatorsList.map(async (op) => {
          const fleet = await db
            .select()
            .from(vehicles)
            .where(eq(vehicles.operatorId, op.id));

          let filteredFleet = fleet;
          if (input.type && input.type !== "all") {
            filteredFleet = fleet.filter(v => v.type === input.type);
          }

          const availableCars = filteredFleet.filter(v => v.isAvailable && v.isActive);
          
          const operatorReviews = await db
            .select()
            .from(reviews)
            .where(eq(reviews.operatorId, op.id));

          const avgPrice = filteredFleet.length > 0
            ? filteredFleet.reduce((sum, v) => sum + Number(v.pricePerDay), 0) / filteredFleet.length
            : 0;

          const vehicleTypes = [...new Set(fleet.map(v => v.type))];

          return {
            ...op,
            fleet,
            availableCars: availableCars.length,
            avgPricePerDay: Math.round(avgPrice),
            vehicleTypes,
            reviews: operatorReviews,
            totalCars: fleet.length,
          };
        })
      );

      let result = operatorsWithFleet;
      if (input.cars) {
        result = result.filter(op => op.availableCars >= input.cars!);
      }

      if (input.minPrice) {
        result = result.filter(op => op.avgPricePerDay >= input.minPrice!);
      }
      if (input.maxPrice) {
        result = result.filter(op => op.avgPricePerDay <= input.maxPrice!);
      }

      if (input.sortBy) {
        switch (input.sortBy) {
          case "price_asc":
            result.sort((a, b) => a.avgPricePerDay - b.avgPricePerDay);
            break;
          case "price_desc":
            result.sort((a, b) => b.avgPricePerDay - a.avgPricePerDay);
            break;
          case "rating":
            result.sort((a, b) => Number(b.rating) - Number(a.rating));
            break;
          case "fleet_size":
            result.sort((a, b) => b.totalCars - a.totalCars);
            break;
        }
      }

      return result;
    }),

  // Get single operator with details
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      
      const [operator] = await db
        .select()
        .from(users)
        .where(and(eq(users.id, input.id), eq(users.role, "operator")));

      if (!operator) throw new Error("Operator not found");

      const fleet = await db
        .select()
        .from(vehicles)
        .where(eq(vehicles.operatorId, input.id));

      const operatorReviews = await db
        .select({
          id: reviews.id,
          bookingId: reviews.bookingId,
          customerId: reviews.customerId,
          operatorId: reviews.operatorId,
          rating: reviews.rating,
          comment: reviews.comment,
          createdAt: reviews.createdAt,
        })
        .from(reviews)
        .where(eq(reviews.operatorId, input.id));

      return {
        ...operator,
        fleet,
        reviews: operatorReviews,
        totalCars: fleet.length,
      };
    }),

  // List all operators (for admin)
  list: publicQuery.query(async () => {
    const db = getDb();
    const ops = await db
      .select()
      .from(users)
      .where(eq(users.role, "operator"));
    return ops;
  }),
});
