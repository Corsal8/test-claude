import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { Navbar } from "~/components/layout/Navbar";

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
}));

const renderNavbar = () =>
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

describe("Navbar", () => {
  it("renders the logo link", () => {
    renderNavbar();
    expect(screen.getByRole("link", { name: /YN/i })).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    renderNavbar();
    const labels = ["About", "Skills", "Projects", "Blog", "Contact"];
    labels.forEach((label) =>
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument()
    );
  });

  it("renders the mobile menu trigger button", () => {
    renderNavbar();
    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });

  it("header starts with transparent background", () => {
    renderNavbar();
    expect(screen.getByRole("banner").className).toContain("bg-transparent");
  });

  it("adds backdrop styles after scrolling", () => {
    renderNavbar();
    fireEvent.scroll(window, { target: { scrollY: 20 } });
    // Trigger the scroll handler directly
    window.dispatchEvent(new Event("scroll"));
    const header = screen.getByRole("banner");
    expect(header.className).toContain("bg-background/80");
  });
});
