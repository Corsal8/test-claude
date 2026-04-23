import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import Home from "~/routes/home";
import type { Post } from "~/types/blog.types";

vi.mock("~/utils/blog", () => ({
  getAllPosts: vi.fn(() => []),
}));

const mockPost: Post = {
  slug: "test-post",
  title: "Test Post",
  description: "A test post",
  date: "2026-01-01",
  tags: ["react"],
  published: true,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderHome = (posts: Post[] = []) =>
  render(
    <MemoryRouter>
      <Home loaderData={{ posts }} {...({} as any)} />
    </MemoryRouter>
  );

describe("Home route", () => {
  it("renders without crashing", () => {
    renderHome();
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders the hero heading", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: "Your Name" })
    ).toBeInTheDocument();
  });

  it("renders the about section", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: /About Me/i })
    ).toBeInTheDocument();
  });

  it("renders the projects section", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: /Projects/i })
    ).toBeInTheDocument();
  });

  it("shows blog empty state when no posts", () => {
    renderHome([]);
    expect(screen.getByText("Posts coming soon.")).toBeInTheDocument();
  });

  it("shows blog posts when provided", () => {
    renderHome([mockPost]);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });
});
