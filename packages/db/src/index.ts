import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import { keys } from "./keys";

export const createDb = (databaseUrl: string) => {
  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
};

export const db = createDb(keys().DATABASE_URL);

export { keys };
