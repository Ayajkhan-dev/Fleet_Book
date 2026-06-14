import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
// FleetBook users queries
import { getDb } from "./connection";
import { env } from "../lib/env";

export async function findUserByUnionId(unionId: string) {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.unionId, unionId))
    .limit(1);
  return rows.at(0);
}

export async function upsertUser(data: { unionId: string; name?: string | null; avatar?: string | null; lastSignInAt?: Date }) {
  const db = getDb();
  
  // Check if user exists
  const existing = await findUserByUnionId(data.unionId);
  
  if (existing) {
    // Update
    await db
      .update(schema.users)
      .set({
        name: data.name || existing.name,
        avatar: data.avatar || existing.avatar,
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, existing.id));
  } else {
    // Insert new user
    const role = data.unionId === env.ownerUnionId ? "admin" : "customer";
    await db.insert(schema.users).values({
      unionId: data.unionId,
      name: data.name || "User",
      email: `${data.unionId}@fleetbook.local`,
      avatar: data.avatar,
      role,
      status: "active",
      city: "Lucknow",
    });
  }
}
