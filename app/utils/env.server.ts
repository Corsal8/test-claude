import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(1),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

let _env: Env | undefined;

export function getEnv(): Env {
  if (!_env) {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      const missing = result.error.issues
        .map((i) => i.path.join("."))
        .join(", ");
      throw new Error(`Missing or invalid environment variables: ${missing}`);
    }
    _env = result.data;
  }
  return _env;
}
