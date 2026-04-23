import { describe, it, expect } from "vitest";
import { getAllPosts, getPostMeta, getPostComponent } from "~/utils/blog";

const SLUG = "My first website";

describe("getAllPosts", () => {
  it("returns an array", () => {
    expect(Array.isArray(getAllPosts())).toBe(true);
  });

  it("only includes published posts", () => {
    getAllPosts().forEach((post) => expect(post.published).toBe(true));
  });

  it("includes the existing MDX post", () => {
    const post = getAllPosts().find((p) => p.slug === SLUG);
    expect(post).toBeDefined();
    expect(post?.title).toBe("My fist website title");
    expect(post?.tags).toEqual(["engineering", "cloud"]);
  });

  it("sorts posts by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].date).getTime()
      );
    }
  });
});

describe("getPostMeta", () => {
  it("returns metadata for a known slug", () => {
    const meta = getPostMeta(SLUG);
    expect(meta).not.toBeNull();
    expect(meta?.slug).toBe(SLUG);
    expect(meta?.description).toBeTruthy();
  });

  it("returns null for an unknown slug", () => {
    expect(getPostMeta("does-not-exist")).toBeNull();
  });
});

describe("getPostComponent", () => {
  it("returns a component function for a known slug", () => {
    expect(typeof getPostComponent(SLUG)).toBe("function");
  });

  it("returns null for an unknown slug", () => {
    expect(getPostComponent("does-not-exist")).toBeNull();
  });
});
