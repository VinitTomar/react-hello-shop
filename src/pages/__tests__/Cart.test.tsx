import Cart from "@/pages/Cart";
import { useCartStore } from "@/store/cartStore";
import { renderWithProviders } from "@/test/utils";
import { screen, within } from "@testing-library/react";

const headphones = {
  id: 1,
  name: "Wireless Headphones",
  price: 79.99,
  category: "Electronics",
  description: "High-quality audio.",
  imageUrl: "https://example.com/headphones.jpg",
};

function seedCart(quantity = 1) {
  useCartStore.setState({ items: [{ product: headphones, quantity }] });
}

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("Cart page", () => {
  it("shows the empty state when there are no items", () => {
    renderWithProviders(<Cart />);

    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse products/i }),
    ).toBeInTheDocument();
  });

  it("renders each item's name and formatted price", () => {
    seedCart();
    renderWithProviders(<Cart />);

    expect(screen.getByText("Wireless Headphones")).toBeInTheDocument();

    const row = screen.getByRole("listitem");
    expect(within(row).getByText("$79.99")).toBeInTheDocument();
  });

  it("disables the decrement button when the quantity is 1", () => {
    seedCart(1);
    renderWithProviders(<Cart />);

    expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
  });

  it("increments the quantity when + is clicked", async () => {
    seedCart(1);
    const { user } = renderWithProviders(<Cart />);

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(useCartStore.getState().items[0].quantity).toBe(2);
  });

  it("removes an item when × is clicked", async () => {
    seedCart();
    const { user } = renderWithProviders(<Cart />);

    await user.click(screen.getByRole("button", { name: "×" }));

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("empties the cart when Clear Cart is clicked", async () => {
    seedCart(3);
    const { user } = renderWithProviders(<Cart />);

    await user.click(screen.getByRole("button", { name: "Clear Cart" }));

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("shows the Checkout link only when the cart has items", () => {
    const { unmount } = renderWithProviders(<Cart />);
    expect(
      screen.queryByRole("link", { name: "Checkout" }),
    ).not.toBeInTheDocument();
    unmount();

    seedCart();
    renderWithProviders(<Cart />);
    expect(screen.getByRole("link", { name: "Checkout" })).toBeInTheDocument();
  });
});
