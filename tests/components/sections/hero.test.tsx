import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Hero } from "~/components/sections/Hero";

describe("Hero", () => {
  it("renders the name heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: "Your Name" })
    ).toBeInTheDocument();
  });

  it("has a View Projects link", () => {
    render(<Hero />);
    expect(
      screen.getByRole("link", { name: /View Projects/i })
    ).toBeInTheDocument();
  });

  it("has a GitHub link that opens in a new tab", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /GitHub/i });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has a contact link", () => {
    render(<Hero />);
    const link = screen.getByRole("link", { name: /Get in Touch/i });
    expect(link).toHaveAttribute("href", expect.stringContaining("mailto:"));
  });
});
