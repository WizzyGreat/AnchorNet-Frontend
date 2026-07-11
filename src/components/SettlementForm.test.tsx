import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SettlementForm } from "./SettlementForm";

describe("SettlementForm", () => {
  it("blocks submission and flags every missing field", () => {
    const onSubmit = vi.fn();
    render(<SettlementForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Asset"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Open settlement"));

    expect(screen.getByText("Anchor id is required.")).toBeInTheDocument();
    expect(screen.getByText("Asset is required.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid amount.")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("rejects a non-positive amount", () => {
    const onSubmit = vi.fn();
    render(<SettlementForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Anchor id"), {
      target: { value: "anchor-a" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Open settlement"));

    expect(
      screen.getByText("Amount must be greater than zero."),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits trimmed values and resets the amount field", () => {
    const onSubmit = vi.fn();
    render(<SettlementForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("Anchor id"), {
      target: { value: " anchor-a " },
    });
    const amountInput = screen.getByPlaceholderText("Amount");
    fireEvent.change(amountInput, { target: { value: "500" } });
    fireEvent.click(screen.getByText("Open settlement"));

    expect(onSubmit).toHaveBeenCalledWith({
      anchor: "anchor-a",
      asset: "USDC",
      amount: 500,
    });
    expect(amountInput).toHaveValue("");
  });

  it("clears a field's error as soon as it is edited", () => {
    render(<SettlementForm onSubmit={() => {}} />);

    fireEvent.click(screen.getByText("Open settlement"));
    expect(screen.getByText("Anchor id is required.")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Anchor id"), {
      target: { value: "a" },
    });
    expect(screen.queryByText("Anchor id is required.")).not.toBeInTheDocument();
  });
});
