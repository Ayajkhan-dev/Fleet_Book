import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { bookings, users } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const bookingsRouter = createRouter({
  // Create a new booking
  create: publicQuery
    .input(
      z.object({
        customerId: z.number(),
        operatorId: z.number(),
        carsRequested: z.number().min(1),
        vehicleType: z.string(),
        pickupAddress: z.string().min(5),
        dropAddress: z.string().min(5),
        eventDate: z.string(),
        returnDate: z.string().optional(),
        eventTime: z.string().optional(),
        specialInstructions: z.string().optional(),
        totalAmount: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      
      const platformFee = input.totalAmount * 0.10;
      const operatorAmount = input.totalAmount - platformFee;

      const result = await db.insert(bookings).values({
        customerId: input.customerId,
        operatorId: input.operatorId,
        carsRequested: input.carsRequested,
        vehicleType: input.vehicleType,
        pickupAddress: input.pickupAddress,
        dropAddress: input.dropAddress,
        eventDate: new Date(input.eventDate),
        returnDate: input.returnDate ? new Date(input.returnDate) : new Date(input.eventDate),
        eventTime: input.eventTime || "",
        specialInstructions: input.specialInstructions || "",
        totalAmount: input.totalAmount.toFixed(2),
        platformFee: platformFee.toFixed(2),
        operatorAmount: operatorAmount.toFixed(2),
        status: "pending",
        paymentStatus: "unpaid",
      });

      return { id: Number(result[0].insertId), ...input };
    }),

  // Get bookings for a customer
  getByCustomer: publicQuery
    .input(z.object({ customerId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select({
          id: bookings.id,
          customerId: bookings.customerId,
          operatorId: bookings.operatorId,
          carsRequested: bookings.carsRequested,
          vehicleType: bookings.vehicleType,
          pickupAddress: bookings.pickupAddress,
          dropAddress: bookings.dropAddress,
          eventDate: bookings.eventDate,
          returnDate: bookings.returnDate,
          eventTime: bookings.eventTime,
          specialInstructions: bookings.specialInstructions,
          totalAmount: bookings.totalAmount,
          platformFee: bookings.platformFee,
          operatorAmount: bookings.operatorAmount,
          status: bookings.status,
          paymentStatus: bookings.paymentStatus,
          razorpayOrderId: bookings.razorpayOrderId,
          razorpayPaymentId: bookings.razorpayPaymentId,
          createdAt: bookings.createdAt,
          operatorName: users.name,
          operatorCity: users.city,
          operatorPhone: users.phone,
        })
        .from(bookings)
        .leftJoin(users, eq(bookings.operatorId, users.id))
        .where(eq(bookings.customerId, input.customerId))
        .orderBy(desc(bookings.createdAt));
      return results;
    }),

  // Get bookings for an operator
  getByOperator: publicQuery
    .input(z.object({ operatorId: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select({
          id: bookings.id,
          customerId: bookings.customerId,
          operatorId: bookings.operatorId,
          carsRequested: bookings.carsRequested,
          vehicleType: bookings.vehicleType,
          pickupAddress: bookings.pickupAddress,
          dropAddress: bookings.dropAddress,
          eventDate: bookings.eventDate,
          returnDate: bookings.returnDate,
          eventTime: bookings.eventTime,
          specialInstructions: bookings.specialInstructions,
          totalAmount: bookings.totalAmount,
          platformFee: bookings.platformFee,
          operatorAmount: bookings.operatorAmount,
          status: bookings.status,
          paymentStatus: bookings.paymentStatus,
          razorpayOrderId: bookings.razorpayOrderId,
          razorpayPaymentId: bookings.razorpayPaymentId,
          createdAt: bookings.createdAt,
          customerName: users.name,
          customerPhone: users.phone,
          customerEmail: users.email,
        })
        .from(bookings)
        .leftJoin(users, eq(bookings.customerId, users.id))
        .where(eq(bookings.operatorId, input.operatorId))
        .orderBy(desc(bookings.createdAt));
      return results;
    }),

  // Get single booking
  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();
      const [booking] = await db
        .select({
          id: bookings.id,
          customerId: bookings.customerId,
          operatorId: bookings.operatorId,
          carsRequested: bookings.carsRequested,
          vehicleType: bookings.vehicleType,
          pickupAddress: bookings.pickupAddress,
          dropAddress: bookings.dropAddress,
          eventDate: bookings.eventDate,
          returnDate: bookings.returnDate,
          eventTime: bookings.eventTime,
          specialInstructions: bookings.specialInstructions,
          totalAmount: bookings.totalAmount,
          platformFee: bookings.platformFee,
          operatorAmount: bookings.operatorAmount,
          status: bookings.status,
          paymentStatus: bookings.paymentStatus,
          razorpayOrderId: bookings.razorpayOrderId,
          razorpayPaymentId: bookings.razorpayPaymentId,
          createdAt: bookings.createdAt,
          operatorName: users.name,
          operatorCity: users.city,
          operatorPhone: users.phone,
        })
        .from(bookings)
        .leftJoin(users, eq(bookings.operatorId, users.id))
        .where(eq(bookings.id, input.id));
      return booking;
    }),

  // Cancel booking
  cancel: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: "cancelled", paymentStatus: "refunded" })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  // Accept booking (operator)
  accept: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: "confirmed" })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  // Reject booking (operator)
  reject: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: "cancelled", paymentStatus: "refunded" })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  // Complete booking (operator)
  complete: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(bookings)
        .set({ status: "completed" })
        .where(eq(bookings.id, input.id));
      return { success: true };
    }),

  // Get all bookings (admin)
  list: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select({
        id: bookings.id,
        customerId: bookings.customerId,
        operatorId: bookings.operatorId,
        carsRequested: bookings.carsRequested,
        vehicleType: bookings.vehicleType,
        eventDate: bookings.eventDate,
        returnDate: bookings.returnDate,
        totalAmount: bookings.totalAmount,
        status: bookings.status,
        paymentStatus: bookings.paymentStatus,
        createdAt: bookings.createdAt,
        customerName: users.name,
      })
      .from(bookings)
      .leftJoin(users, eq(bookings.customerId, users.id))
      .orderBy(desc(bookings.createdAt));
    return results;
  }),
});
