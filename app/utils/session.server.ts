import { createCookieSessionStorage, redirect } from "react-router";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is not set");
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
});

export async function getSession(request: Request) {
  return sessionStorage.getSession(request.headers.get("Cookie"));
}

export async function createAdminSession(redirectTo: string) {
  const session = await sessionStorage.getSession();
  session.set("admin", true);
  return redirect(redirectTo, {
    headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
  });
}

export async function destroyAdminSession(request: Request) {
  const session = await getSession(request);
  return redirect("/admin/login", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

export async function requireAdmin(request: Request) {
  const session = await getSession(request);
  if (!session.get("admin")) {
    throw redirect("/admin/login");
  }
}
