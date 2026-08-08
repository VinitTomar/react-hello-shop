import { server } from "@/mocks/server";
import Home from "@/pages/Home";
import { renderWithProviders } from "@/test/utils";
import { screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";

describe("Home page", () => {
  it("shows a loading message before the first page arrives", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Loading products…")).toBeInTheDocument();
  });

  it("renders the first page of products", async () => {
    renderWithProviders(<Home />);

    expect(await screen.findByText("Wireless Headphones")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("appends the next page when Load more is clicked", async () => {
    const { user } = renderWithProviders(<Home />);

    await user.click(await screen.findByRole("button", { name: "Load more" }));

    await waitFor(() => {
      expect(screen.getAllByRole("listitem")).toHaveLength(6);
    });
    expect(
      await screen.findByText("You've seen all 6 products."),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Load more" }),
    ).not.toBeInTheDocument();
  });

  it("shows an error message when the products request fails", async () => {
    server.use(
      http.get("/api/products", () => new HttpResponse(null, { status: 500 })),
    );
    renderWithProviders(<Home />);

    expect(
      await screen.findByText("Failed to load products."),
    ).toBeInTheDocument();
  });
});
