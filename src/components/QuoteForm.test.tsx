import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QuoteForm } from "./QuoteForm";
import { requestQuote } from "@/lib/api";

vi.mock("@/lib/api", () => ({
  requestQuote: vi.fn(),
}));

describe("QuoteForm", () => {
  it("rejects a non-positive amount without calling the API", async () => {
    render(<QuoteForm />);
    fireEvent.change(screen.getByPlaceholderText("1000"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByRole("button", { name: /get quote/i }));

    expect(
      await screen.findByText(/enter a positive amount/i),
    ).toBeInTheDocument();
    expect(requestQuote).not.toHaveBeenCalled();
  });

  it("renders the quote result on success", async () => {
    vi.mocked(requestQuote).mockResolvedValue({
      asset: "USDC",
      amount: 1000,
      fee: 10,
      deliverable: 990,
      route: ["big", "mid"],
    });

    render(<QuoteForm />);
    fireEvent.click(screen.getByRole("button", { name: /get quote/i }));

    await waitFor(() => {
      expect(screen.getByText(/990 USDC/)).toBeInTheDocument();
    });
    expect(screen.getByText("big → mid")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    vi.mocked(requestQuote).mockRejectedValue(
      new Error("insufficient liquidity"),
    );

    render(<QuoteForm />);
    fireEvent.click(screen.getByRole("button", { name: /get quote/i }));

    expect(
      await screen.findByText(/insufficient liquidity/i),
    ).toBeInTheDocument();
  });
});
