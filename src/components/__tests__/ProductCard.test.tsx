import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/cartStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockProduct = {
  id: 1,
  name: "Wireless Headphones",
  price: 79.99,
  category: "Electronics",
  description: "High-quality audio.",
  imageUrl: "https://example.com/headphones.jpg",
};

// Helper to wrap component with QueryClientProvider.
// `ProductCard` depends on `useWishlist()`, which requires this provider.
// `staleTime: Infinity` stops React Query from refetching seeded data on mount,
// so a pre-populated wishlist cache stays put for the duration of the test.
function renderWithClient(
  component: React.ReactElement,
  options: { wishlist?: string[] } = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: Infinity },
    },
  });

  if (options.wishlist) {
    queryClient.setQueryData(["wishlist"], options.wishlist);
  }

  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>,
  );
}

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

afterEach(() => {
  vi.unstubAllGlobals();
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

  it("renders the 'Add to Cart' button", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />);
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  it("adds the product to the cart when 'Add to Cart' is clicked", async () => {
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

  it("does not render the 'Add to Cart' button", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="full" />);
    expect(
      screen.queryByRole("button", { name: /add to cart/i }),
    ).not.toBeInTheDocument();
  });
});

describe("ProductCard — wishlist toggle", () => {
  it("labels the heart 'Add to wishlist' when the product is not wishlisted", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />, {
      wishlist: [],
    });
    expect(
      screen.getByRole("button", { name: /add to wishlist/i }),
    ).toBeInTheDocument();
  });

  it("labels the heart 'Remove from wishlist' when the product is already wishlisted", () => {
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />, {
      wishlist: ["1"],
    });
    expect(
      screen.getByRole("button", { name: /remove from wishlist/i }),
    ).toBeInTheDocument();
  });

  it("optimistically marks the product as wishlisted while the mutation is in flight", async () => {
    // A fetch that never settles keeps the mutation pending, so the optimistic
    // update applied in `onMutate` is observable and never rolls back mid-assertion.
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {})),
    );
    const user = userEvent.setup();
    renderWithClient(<ProductCard product={mockProduct} variant="compact" />, {
      wishlist: [],
    });

    await user.click(screen.getByRole("button", { name: /add to wishlist/i }));

    expect(
      await screen.findByRole("button", { name: /remove from wishlist/i }),
    ).toBeInTheDocument();
  });
});
