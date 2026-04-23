import { describe, it, expect } from "vitest";
import { cn } from "~/utils/cn";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", undefined, null, false, "bar")).toBe("foo bar");
  });
});
