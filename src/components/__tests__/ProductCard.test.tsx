import ProductCard from "@/components/ProductCard";
import { server } from "@/mocks/server";
import { useCartStore } from "@/store/cartStore";
import { wishlistHandlers } from "@/test/wishlist-handlers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";

const mockProduct = {
  id: 1,
  name: "Wireless Headphones",
  price: 79.99,
  category: "Electronics",
  description: "High-quality audio.",
  imageUrl: "https://example.com/headphones.jpg",
};

function renderWithClient(component: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
}

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("ProductCard - compact variant", () => {
  it("Should render the product name", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);
    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();
  });

  it("should render price formatted to two decimal places", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);
    expect(screen.getByText("$79.99")).toBeInTheDocument();
  });

  it("does not render the category badge", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);
    expect(screen.queryByText("Electronics")).not.toBeInTheDocument();
  });

  it("does not render the description", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);
    expect(screen.queryByText("High-quality audio.")).not.toBeInTheDocument();
  });

  it('renders the "Add to Cart" button', () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it('adds the product to the cart when "Add to Cart" is clicked', async () => {
    const user = userEvent.setup();
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);

    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    const { items } = useCartStore.getState();

    expect(items).toHaveLength(1);
    expect(items[0].product.id).toBe(1);
    expect(items[0].quantity).toBe(1);
  });
});

describe("ProductCard — full variant", () => {
  it("renders the category badge", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="full" />);
    expect(screen.getByText("Electronics")).toBeInTheDocument();
  });

  it("renders the description", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="full" />);
    expect(screen.getByText("High-quality audio.")).toBeInTheDocument();
  });

  it('does not render the "Add to Cart" button', () => {
    renderWithClient(<ProductCard product={mockProduct} variant="full" />);
    expect(
      screen.queryByRole("button", { name: /add to cart/i }),
    ).not.toBeInTheDocument();
  });
});

describe("ProductCard — wishlist toggle", () => {
  it('labels the heart "Add to wishlist" when the fetched wishlist is empty', async () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);

    expect(
      await screen.findByRole("button", { name: /add to wishlist/i }),
    ).toBeInTheDocument();
  });

  it('labels the heart "Remove from wishlist" when the fetched wishlist contains the product', async () => {
    server.use(...wishlistHandlers(["1"]));
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);

    expect(
      await screen.findByRole("button", { name: /remove from wishlist/i }),
    ).toBeInTheDocument();
  });

  it("optimistically marks the product as wishlisted before the request settles", async () => {
    const user = userEvent.setup();
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);

    await user.click(
      await screen.findByRole("button", { name: /add to wishlist/i }),
    );
    expect(
      await screen.findByRole("button", { name: /remove from wishlist/i }),
    ).toBeInTheDocument();
  });

  it("rolls the label back when the add request fails", async () => {
    server.use(
      http.post("/api/wishlist/:productId", async () => {
        await delay(300);
        return new HttpResponse(null, { status: 500 });
      }),
    );
    const user = userEvent.setup();
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);

    await user.click(
      await screen.findByRole("button", { name: /add to wishlist/i }),
    );

    await screen.findByRole("button", { name: /remove from wishlist/i });

    expect(
      await screen.findByRole("button", { name: /add to wishlist/i }),
    ).toBeInTheDocument();
  });

  it("keeps the server's wishlist after the mutation settles", async () => {
    let wishlist: string[] = [];
    let getCount = 0;

    server.use(
      // No delay on GET — deliberately, and only here. This test waits on two
      // round-trips (POST, then the onSettled refetch); at the fixture's uniform
      // delay(300) that is ~900 ms against waitFor's 1000 ms default. §6.4 keeps
      // the shared fixture faithful and sanctions exactly this kind of per-test
      // override when a window needs widening.
      http.get("/api/wishlist", () => {
        getCount += 1;
        return HttpResponse.json(wishlist);
      }),
      http.post("/api/wishlist/:productId", async ({ params }) => {
        await delay(300);
        wishlist = [...wishlist, params.productId as string];
        return HttpResponse.json({ id: params.productId });
      }),
    );

    const user = userEvent.setup();
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);

    await user.click(
      await screen.findByRole("button", { name: /add to wishlist/i }),
    );

    await waitFor(() => expect(getCount).toBeGreaterThan(1));

    expect(wishlist).toEqual(["1"]);
    expect(
      screen.getByRole("button", { name: /remove from wishlist/i }),
    ).toBeInTheDocument();
  });
});
