import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { getEnv } from "~/utils/env.server";

type Db = ReturnType<typeof drizzle<typeof schema>>;

let _db: Db | undefined;

export function getDb(): Db {
  if (!_db) {
    _db = drizzle(postgres(getEnv().DATABASE_URL), { schema });
  }
  return _db;
}
