import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, bookings, vehicles } from "@db/schema";
import { eq, and, count, sum, desc } from "drizzle-orm";

export const adminRouter = createRouter({
  // Dashboard stats
  dashboard: publicQuery.query(async () => {
    const db = getDb();
    
    const totalUsers = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, "customer"));
    
    const totalOperators = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.role, "operator"));
    
    const totalBookings = await db
      .select({ count: count() })
      .from(bookings);
    
    const totalRevenue = await db
      .select({ total: sum(bookings.totalAmount) })
      .from(bookings)
      .where(eq(bookings.status, "completed"));
    
    const platformCommission = await db
      .select({ total: sum(bookings.platformFee) })
      .from(bookings)
      .where(eq(bookings.status, "completed"));

    const pendingOperators = await db
      .select()
      .from(users)
      .where(and(eq(users.role, "operator"), eq(users.status, "pending")));

    return {
      totalUsers: totalUsers[0]?.count || 0,
      totalOperators: totalOperators[0]?.count || 0,
      totalBookings: totalBookings[0]?.count || 0,
      totalRevenue: totalRevenue[0]?.total || "0",
      platformCommission: platformCommission[0]?.total || "0",
      pendingOperators,
    };
  }),

  // Get all operators (for admin management)
  getOperators: publicQuery.query(async () => {
    const db = getDb();
    const ops = await db
      .select()
      .from(users)
      .where(eq(users.role, "operator"))
      .orderBy(desc(users.createdAt));
    
    const operatorsWithStats = await Promise.all(
      ops.map(async (op) => {
        const fleetCount = await db
          .select({ count: count() })
          .from(vehicles)
          .where(eq(vehicles.operatorId, op.id));
        
        const bookingCount = await db
          .select({ count: count() })
          .from(bookings)
          .where(eq(bookings.operatorId, op.id));
        
        return {
          ...op,
          fleetSize: fleetCount[0]?.count || 0,
          totalBookings: bookingCount[0]?.count || 0,
        };
      })
    );
    
    return operatorsWithStats;
  }),

  // Get all customers
  getCustomers: publicQuery.query(async () => {
    const db = getDb();
    const customers = await db
      .select()
      .from(users)
      .where(eq(users.role, "customer"))
      .orderBy(desc(users.createdAt));
    
    const customersWithStats = await Promise.all(
      customers.map(async (cust) => {
        const bookingCount = await db
          .select({ count: count() })
          .from(bookings)
          .where(eq(bookings.customerId, cust.id));
        
        return {
          ...cust,
          totalBookings: bookingCount[0]?.count || 0,
        };
      })
    );
    
    return customersWithStats;
  }),

  // Approve operator
  approveOperator: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(users)
        .set({ status: "active" })
        .where(eq(users.id, input.id));
      return { success: true };
    }),

  // Suspend operator
  suspendOperator: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(users)
        .set({ status: "suspended" })
        .where(eq(users.id, input.id));
      return { success: true };
    }),

  // Get all bookings
  getBookings: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select({
        id: bookings.id,
        customerId: bookings.customerId,
        operatorId: bookings.operatorId,
        carsRequested: bookings.carsRequested,
        vehicleType: bookings.vehicleType,
        eventDate: bookings.eventDate,
        totalAmount: bookings.totalAmount,
        status: bookings.status,
        paymentStatus: bookings.paymentStatus,
        createdAt: bookings.createdAt,
        customerName: users.name,
      })
      .from(bookings)
      .leftJoin(users, eq(bookings.customerId, users.id))
      .orderBy(desc(bookings.createdAt));
  }),

  // Get revenue stats
  getRevenue: publicQuery.query(async () => {
    const db = getDb();
    
    const completedBookings = await db
      .select()
      .from(bookings)
      .where(eq(bookings.status, "completed"))
      .orderBy(desc(bookings.createdAt));

    const monthlyRevenue = completedBookings.reduce((acc: Record<string, number>, booking) => {
      const month = booking.createdAt.toISOString().slice(0, 7);
      acc[month] = (acc[month] || 0) + Number(booking.totalAmount);
      return acc;
    }, {});

    return {
      completedBookings,
      monthlyRevenue: Object.entries(monthlyRevenue).map(([month, amount]) => ({
        month,
        amount,
      })),
    };
  }),
});
