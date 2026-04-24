import { createCookieSessionStorage, redirect } from "react-router";
import type { SessionStorage } from "react-router";
import { getEnv } from "~/utils/env.server";

let _storage: SessionStorage<{ admin: boolean }> | undefined;

function getStorage() {
  if (!_storage) {
    const env = getEnv();
    _storage = createCookieSessionStorage({
      cookie: {
        name: "__session",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [env.SESSION_SECRET],
        secure: env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      },
    });
  }
  return _storage;
}

export async function getSession(request: Request) {
  return getStorage().getSession(request.headers.get("Cookie"));
}

export async function createAdminSession(redirectTo: string) {
  const session = await getStorage().getSession();
  session.set("admin", true);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await getStorage().commitSession(session) },
  });
}

export async function destroyAdminSession(request: Request) {
  const session = await getSession(request);
  return redirect("/admin/login", {
    headers: { "Set-Cookie": await getStorage().destroySession(session) },
  });
}

export async function requireAdmin(request: Request) {
  const session = await getSession(request);
  if (!session.get("admin")) {
    throw redirect("/admin/login");
  }
}
