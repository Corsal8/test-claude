import { describe, it, expect } from "vitest";
import { getAllPosts, getPostMeta, getPostComponent } from "~/utils/blog";

describe("getAllPosts", () => {
  it("returns an array", () => {
    expect(Array.isArray(getAllPosts())).toBe(true);
  });

  it("only includes published posts", () => {
    getAllPosts().forEach((post) => expect(post.published).toBe(true));
  });

  it("sorts posts by date descending", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(new Date(posts[i - 1].date).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i].date).getTime()
      );
    }
  });

  it("each post has required fields", () => {
    getAllPosts().forEach((post) => {
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("date");
      expect(post).toHaveProperty("tags");
    });
  });
});

describe("getPostMeta", () => {
  it("returns null for an unknown slug", () => {
    expect(getPostMeta("does-not-exist")).toBeNull();
  });
});

describe("getPostComponent", () => {
  it("returns null for an unknown slug", () => {
    expect(getPostComponent("does-not-exist")).toBeNull();
  });
});
