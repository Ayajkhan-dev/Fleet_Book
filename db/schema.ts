import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  decimal,
  boolean,
  bigint,
  date,
} from "drizzle-orm/mysql-core";

// ========== USERS (Customers + Operators + Admins) ==========
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  avatar: text("avatar"),
  password: varchar("password", { length: 255 }),
  role: mysqlEnum("role", ["customer", "operator", "admin"]).default("customer").notNull(),
  // Operator-specific fields
  businessName: varchar("business_name", { length: 255 }),
  city: varchar("city", { length: 255 }),
  operatingCities: text("operating_cities"), // comma-separated
  gstNumber: varchar("gst_number", { length: 50 }),
  yearsInBusiness: int("years_in_business"),
  documents: text("documents"), // JSON string for aadhaar, pan, business docs
  status: mysqlEnum("status", ["pending", "active", "suspended"]).default("active"),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  totalReviews: int("total_reviews").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ========== VEHICLES ==========
export const vehicles = mysqlTable("vehicles", {
  id: serial("id").primaryKey(),
  operatorId: bigint("operator_id", { mode: "number", unsigned: true }).notNull(),
  vehicleNumber: varchar("vehicle_number", { length: 50 }).notNull(),
  type: mysqlEnum("type", ["sedan", "innova", "fortuner", "tempo", "luxury"]).notNull(),
  capacity: int("capacity").notNull(),
  year: int("year"),
  photos: text("photos"), // JSON array of photo URLs
  documents: text("documents"), // JSON string for rc, insurance, fitness
  insuranceExpiry: date("insurance_expiry"),
  driverName: varchar("driver_name", { length: 255 }),
  driverPhone: varchar("driver_phone", { length: 20 }),
  driverLicense: varchar("driver_license", { length: 100 }),
  driverPhoto: text("driver_photo"),
  pricePerDay: decimal("price_per_day", { precision: 10, scale: 2 }).notNull(),
  isAvailable: boolean("is_available").default(true),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = typeof vehicles.$inferInsert;

// ========== BOOKINGS ==========
export const bookings = mysqlTable("bookings", {
  id: serial("id").primaryKey(),
  customerId: bigint("customer_id", { mode: "number", unsigned: true }).notNull(),
  operatorId: bigint("operator_id", { mode: "number", unsigned: true }).notNull(),
  carsRequested: int("cars_requested").notNull(),
  vehicleType: varchar("vehicle_type", { length: 50 }).notNull(),
  pickupAddress: text("pickup_address").notNull(),
  dropAddress: text("drop_address").notNull(),
  eventDate: date("event_date").notNull(),
  returnDate: date("return_date"),
  eventTime: varchar("event_time", { length: 20 }),
  specialInstructions: text("special_instructions"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal("platform_fee", { precision: 10, scale: 2 }).notNull(),
  operatorAmount: decimal("operator_amount", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  paymentStatus: mysqlEnum("payment_status", ["unpaid", "paid", "refunded"]).default("unpaid").notNull(),
  razorpayOrderId: varchar("razorpay_order_id", { length: 255 }),
  razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// ========== REVIEWS ==========
export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  bookingId: bigint("booking_id", { mode: "number", unsigned: true }).notNull(),
  customerId: bigint("customer_id", { mode: "number", unsigned: true }).notNull(),
  operatorId: bigint("operator_id", { mode: "number", unsigned: true }).notNull(),
  rating: int("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
