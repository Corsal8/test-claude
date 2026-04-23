import type { Route } from "./+types/login";
import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
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
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 font-mono text-2xl font-bold">
          <span className="text-sky-400">// </span>Admin
        </h1>

        <Form method="post" className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-muted-foreground">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {actionData?.error && (
            <p className="text-sm text-destructive">{actionData.error}</p>
          )}

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </Form>
      </div>
    </main>
  );
}
