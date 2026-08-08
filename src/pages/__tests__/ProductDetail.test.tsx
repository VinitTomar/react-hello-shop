import App from "@/App";
import { renderWithProviders } from "@/test/utils";
import { screen } from "@testing-library/react";

describe("ProductDetail page", () => {
  it("shows a loading message while the product loads", async () => {
    renderWithProviders(<App />, { route: "/products/1" });
    expect(await screen.findByText("Loading…")).toBeInTheDocument();
  });

  it("renders the product name, category, price and description", async () => {
    renderWithProviders(<App />, { route: "/products/1" });

    expect(
      await screen.findByRole("heading", { name: "Wireless Headphones" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Electronics")).toBeInTheDocument();
    expect(screen.getByText("$79.99")).toBeInTheDocument();

    expect(
      screen.getByText("Wireless Headphone description"),
    ).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown product id", async () => {
    renderWithProviders(<App />, { route: "/products/999" });

    expect(await screen.findByText("Product not found.")).toBeInTheDocument();
  });
});
