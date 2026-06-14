import { relations } from "drizzle-orm";
import { users, vehicles, bookings, reviews } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  vehicles: many(vehicles),
  bookingsAsCustomer: many(bookings, { relationName: "customer" }),
  bookingsAsOperator: many(bookings, { relationName: "operator" }),
  reviews: many(reviews),
}));

export const vehiclesRelations = relations(vehicles, ({ one }) => ({
  operator: one(users, {
    fields: [vehicles.operatorId],
    references: [users.id],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  customer: one(users, {
    fields: [bookings.customerId],
    references: [users.id],
    relationName: "customer",
  }),
  operator: one(users, {
    fields: [bookings.operatorId],
    references: [users.id],
    relationName: "operator",
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  customer: one(users, {
    fields: [reviews.customerId],
    references: [users.id],
  }),
  operator: one(users, {
    fields: [reviews.operatorId],
    references: [users.id],
  }),
}));
