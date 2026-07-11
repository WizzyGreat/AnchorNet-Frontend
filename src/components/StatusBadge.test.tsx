import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it("renders a capitalized label for each status", () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("applies status-specific styling", () => {
    const { rerender } = render(<StatusBadge status="pending" />);
    expect(screen.getByText("Pending")).toHaveClass("text-amber-300");

    rerender(<StatusBadge status="executed" />);
    expect(screen.getByText("Executed")).toHaveClass("text-emerald-300");

    rerender(<StatusBadge status="cancelled" />);
    expect(screen.getByText("Cancelled")).toHaveClass("text-zinc-300");
  });
});
