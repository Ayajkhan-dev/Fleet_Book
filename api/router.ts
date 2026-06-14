import { authRouter } from "./auth-router";
import { operatorsRouter } from "./operators-router";
import { bookingsRouter } from "./bookings-router";
import { vehiclesRouter } from "./vehicles-router";
import { reviewsRouter } from "./reviews-router";
import { adminRouter } from "./admin-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  operators: operatorsRouter,
  bookings: bookingsRouter,
  vehicles: vehiclesRouter,
  reviews: reviewsRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
