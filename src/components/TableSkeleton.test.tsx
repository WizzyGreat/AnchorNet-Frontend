import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TableSkeleton } from "./TableSkeleton";

describe("TableSkeleton", () => {
  it("renders an accessible loading status", () => {
    render(<TableSkeleton />);
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading table data",
    );
  });

  it("renders the requested number of placeholder rows", () => {
    const { container } = render(<TableSkeleton rows={3} columns={2} />);
    const status = container.querySelector('[role="status"]');
    // One header row plus 3 body rows = 4 direct row containers.
    expect(status?.children).toHaveLength(4);
  });
});
