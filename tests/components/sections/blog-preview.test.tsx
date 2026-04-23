import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router";
import { BlogPreview } from "~/components/sections/BlogPreview";
import type { Post } from "~/types/blog.types";

const makePosts = (count: number): Post[] =>
  Array.from({ length: count }, (_, i) => ({
    slug: `post-${i + 1}`,
    title: `Post ${i + 1}`,
    description: `Description ${i + 1}`,
    date: `2026-01-0${i + 1}`,
    tags: ["react"],
    published: true,
  }));

const renderPreview = (posts: Post[]) =>
  render(
    <MemoryRouter>
      <BlogPreview posts={posts} />
    </MemoryRouter>
  );

describe("BlogPreview", () => {
  it("shows empty state when there are no posts", () => {
    renderPreview([]);
    expect(screen.getByText("Posts coming soon.")).toBeInTheDocument();
  });

  it("renders post titles", () => {
    renderPreview(makePosts(2));
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("caps the list at 3 posts", () => {
    renderPreview(makePosts(4));
    expect(screen.getByText("Post 3")).toBeInTheDocument();
    expect(screen.queryByText("Post 4")).not.toBeInTheDocument();
  });

  it("has a link to the full blog", () => {
    renderPreview([]);
    expect(
      screen.getByRole("link", { name: /All posts/i })
    ).toBeInTheDocument();
  });
});
