import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ConnectButton } from "./ConnectButton";
import { WalletProvider } from "./WalletProvider";

afterEach(() => {
  localStorage.clear();
});

describe("ConnectButton", () => {
  it("shows a connect prompt when disconnected", () => {
    render(
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>,
    );
    expect(
      screen.getByRole("button", { name: /connect wallet/i }),
    ).toBeInTheDocument();
  });

  it("shows a truncated address once connected", async () => {
    render(
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /connect wallet/i }));

    await waitFor(() => {
      expect(screen.getByTitle("Disconnect")).toBeInTheDocument();
    });
    expect(screen.getByTitle("Disconnect").textContent).toMatch(/…/);
  });

  it("disconnects when clicked while connected", async () => {
    render(
      <WalletProvider>
        <ConnectButton />
      </WalletProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /connect wallet/i }));
    await waitFor(() => screen.getByTitle("Disconnect"));

    fireEvent.click(screen.getByTitle("Disconnect"));

    expect(
      screen.getByRole("button", { name: /connect wallet/i }),
    ).toBeInTheDocument();
  });
});
