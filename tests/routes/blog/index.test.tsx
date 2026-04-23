import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import BlogIndex from "~/routes/blog/index";
import type { Post } from "~/types/blog.types";

vi.mock("~/utils/blog", () => ({
  getAllPosts: vi.fn(() => []),
}));

const mockPost: Post = {
  slug: "test-post",
  title: "Test Post Title",
  description: "A test post description",
  date: "2026-01-15",
  tags: ["react", "typescript"],
  published: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderBlogIndex = (posts: Post[]) =>
  render(
    <MemoryRouter>
      <BlogIndex loaderData={{ posts }} {...({} as any)} />
    </MemoryRouter>
  );

describe("Blog index route", () => {
  it("renders the Blog heading", () => {
    renderBlogIndex([]);
    expect(screen.getByRole("heading", { name: /Blog/i })).toBeInTheDocument();
  });

  it("shows empty state when there are no posts", () => {
    renderBlogIndex([]);
    expect(screen.getByText("Posts coming soon.")).toBeInTheDocument();
  });

  it("renders post titles when posts exist", () => {
    renderBlogIndex([mockPost]);
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders post description", () => {
    renderBlogIndex([mockPost]);
    expect(screen.getByText("A test post description")).toBeInTheDocument();
  });

  it("renders post tags", () => {
    renderBlogIndex([mockPost]);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("renders the formatted date", () => {
    renderBlogIndex([mockPost]);
    expect(screen.getByText("Jan 15, 2026")).toBeInTheDocument();
  });

  it("post links to the correct slug", () => {
    renderBlogIndex([mockPost]);
    expect(screen.getByRole("link", { name: /Test Post Title/i })).toHaveAttribute(
      "href",
      "/blog/test-post"
    );
  });
});
