import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { SettlementDetail } from "./SettlementDetail";
import { ToastProvider } from "./ToastProvider";
import {
  fetchSettlement,
  executeSettlement,
  cancelSettlement,
} from "@/lib/settlementsApi";

vi.mock("@/lib/settlementsApi", () => ({
  fetchSettlement: vi.fn(),
  executeSettlement: vi.fn(),
  cancelSettlement: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const pending = {
  id: 1,
  anchor: "anchorA",
  asset: "USDC",
  amount: 400,
  fee: 4,
  status: "pending" as const,
  createdAt: "",
};

function renderDetail(id = 1) {
  return render(
    <ToastProvider>
      <SettlementDetail id={id} />
    </ToastProvider>,
  );
}

describe("SettlementDetail", () => {
  it("renders the settlement's fields once loaded", async () => {
    vi.mocked(fetchSettlement).mockResolvedValue(pending);

    renderDetail();

    expect(await screen.findByText("Settlement #1")).toBeInTheDocument();
    expect(screen.getByText("anchorA")).toBeInTheDocument();
    expect(screen.getByText("USDC")).toBeInTheDocument();
  });

  it("copies the anchor address to the clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    vi.mocked(fetchSettlement).mockResolvedValue(pending);

    renderDetail();
    await screen.findByText("Settlement #1");

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith("anchorA"));
    vi.unstubAllGlobals();
  });

  it("shows an error message when the settlement fails to load", async () => {
    vi.mocked(fetchSettlement).mockRejectedValue(new Error("not found"));

    renderDetail();

    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });

  it("hides execute/cancel actions for a non-pending settlement", async () => {
    vi.mocked(fetchSettlement).mockResolvedValue({
      ...pending,
      status: "executed",
    });

    renderDetail();
    await screen.findByText("Settlement #1");

    expect(
      screen.queryByRole("button", { name: "Execute" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Cancel" }),
    ).not.toBeInTheDocument();
  });

  it("executes a pending settlement", async () => {
    vi.mocked(fetchSettlement).mockResolvedValue(pending);
    vi.mocked(executeSettlement).mockResolvedValue({
      ...pending,
      status: "executed",
    });

    renderDetail();
    await screen.findByText("Settlement #1");

    fireEvent.click(screen.getByRole("button", { name: "Execute" }));

    await waitFor(() => expect(executeSettlement).toHaveBeenCalledWith(1));
  });

  it("confirms before cancelling a pending settlement", async () => {
    vi.mocked(fetchSettlement).mockResolvedValue(pending);
    vi.mocked(cancelSettlement).mockResolvedValue({
      ...pending,
      status: "cancelled",
    });

    renderDetail();
    await screen.findByText("Settlement #1");

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(cancelSettlement).not.toHaveBeenCalled();

    const dialog = screen.getByRole("alertdialog");
    fireEvent.click(
      within(dialog).getByRole("button", { name: "Cancel settlement" }),
    );

    await waitFor(() => expect(cancelSettlement).toHaveBeenCalledWith(1));
  });
});
