import type { Route } from "./+types/posts.$id.delete";
import { redirect } from "react-router";
import { deletePost } from "~/db/posts";
import { requireAdmin } from "~/utils/session.server";

export async function action({ request, params }: Route.ActionArgs) {
  await requireAdmin(request);
  await deletePost(params.id);
  return redirect("/admin");
}
