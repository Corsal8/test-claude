import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { createAdminSession, getSession } from "~/utils/session.server";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  if (session.get("admin")) throw redirect("/admin");
  return null;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const password = formData.get("password");

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Invalid password" };
  }

  return createAdminSession("/admin");
}

export default function AdminLogin({ actionData }: Route.ComponentProps) {
  return (
    <main className="flex min-h-screen items-center justify-center px-10">
      <div className="w-full max-w-[360px]">
        <div className="mb-10">
          <span className="font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
            Admin
          </span>
          <h1 className="font-display font-extrabold text-3xl tracking-[-0.02em] mt-2">
            Sign in
          </h1>
        </div>

        <Form method="post" className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="font-mono text-[0.68rem] tracking-[0.08em] uppercase text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-brand rounded-[2px] transition-colors"
            />
          </div>

          {actionData?.error && (
            <p className="font-mono text-[0.75rem] text-destructive">
              {actionData.error}
            </p>
          )}

          <button
            type="submit"
            className="font-mono text-[0.75rem] tracking-[0.08em] uppercase px-6 py-3 rounded-[2px] bg-brand text-brand-fg font-medium hover:brightness-110 transition-all"
          >
            Sign in
          </button>
        </Form>
      </div>
    </main>
  );
}
