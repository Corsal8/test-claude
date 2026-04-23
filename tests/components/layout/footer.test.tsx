import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "~/components/layout/Footer";

describe("Footer", () => {
  it("displays the current year", () => {
    render(<Footer />);
    expect(
      screen.getByText(new RegExp(new Date().getFullYear().toString()))
    ).toBeInTheDocument();
  });

  it("has a React Router link with correct attributes", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "React Router" });
    expect(link).toHaveAttribute("href", "https://reactrouter.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has a Tailwind CSS link with correct attributes", () => {
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Tailwind CSS" });
    expect(link).toHaveAttribute("href", "https://tailwindcss.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
