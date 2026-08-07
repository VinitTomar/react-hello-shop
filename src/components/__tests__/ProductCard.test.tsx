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
