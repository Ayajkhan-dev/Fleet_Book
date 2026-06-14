import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { vehicles } from "@db/schema";
import { eq } from "drizzle-orm";

export const vehiclesRouter = createRouter({
  // Get vehicles by operator
  getByOperator: publicQuery
    .input(z.object({ operatorId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(vehicles)
        .where(eq(vehicles.operatorId, input.operatorId));
    }),

  // Create vehicle
  create: publicQuery
    .input(
      z.object({
        operatorId: z.number(),
        vehicleNumber: z.string(),
        type: z.enum(["sedan", "innova", "fortuner", "tempo", "luxury"]),
        capacity: z.number().min(1),
        year: z.number().optional(),
        photos: z.string().optional(),
        driverName: z.string().optional(),
        driverPhone: z.string().optional(),
        driverLicense: z.string().optional(),
        pricePerDay: z.number().min(1),
        isAvailable: z.boolean().default(true),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const result = await db.insert(vehicles).values({
        operatorId: input.operatorId,
        vehicleNumber: input.vehicleNumber,
        type: input.type,
        capacity: input.capacity,
        year: input.year || new Date().getFullYear(),
        photos: input.photos || "[]",
        driverName: input.driverName,
        driverPhone: input.driverPhone,
        driverLicense: input.driverLicense,
        pricePerDay: input.pricePerDay.toFixed(2),
        isAvailable: input.isAvailable,
        isActive: true,
      });
      return { id: Number(result[0].insertId), ...input };
    }),

  // Update vehicle
  update: publicQuery
    .input(
      z.object({
        id: z.number(),
        vehicleNumber: z.string().optional(),
        type: z.enum(["sedan", "innova", "fortuner", "tempo", "luxury"]).optional(),
        capacity: z.number().min(1).optional(),
        year: z.number().optional(),
        photos: z.string().optional(),
        driverName: z.string().optional(),
        driverPhone: z.string().optional(),
        driverLicense: z.string().optional(),
        pricePerDay: z.number().optional(),
        isAvailable: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const { id, ...data } = input;
      const updateData: Record<string, unknown> = {};
      
      if (data.vehicleNumber) updateData.vehicleNumber = data.vehicleNumber;
      if (data.type) updateData.type = data.type;
      if (data.capacity) updateData.capacity = data.capacity;
      if (data.year) updateData.year = data.year;
      if (data.photos) updateData.photos = data.photos;
      if (data.driverName !== undefined) updateData.driverName = data.driverName;
      if (data.driverPhone !== undefined) updateData.driverPhone = data.driverPhone;
      if (data.driverLicense !== undefined) updateData.driverLicense = data.driverLicense;
      if (data.pricePerDay) updateData.pricePerDay = data.pricePerDay.toFixed(2);
      if (data.isAvailable !== undefined) updateData.isAvailable = data.isAvailable;

      await db.update(vehicles).set(updateData).where(eq(vehicles.id, id));
      return { success: true };
    }),

  // Delete vehicle
  delete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.delete(vehicles).where(eq(vehicles.id, input.id));
      return { success: true };
    }),
});
