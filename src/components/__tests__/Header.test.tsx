import Header from "@/components/Header";
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

const tshirt = {
  id: 2,
  name: "Cotton T-Shirt",
  price: 29.99,
  category: "Clothing",
  description: "Comfortable everyday wear.",
  imageUrl: "https://example.com/tshirt.jpg",
};

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

afterEach(() => {
  document.documentElement.classList.remove("dark");
});

describe("Header", () => {
  it("renders no cart badge when the cart is empty", () => {
    renderWithProviders(<Header />);

    // Anchored regex: the link holds the word and nothing else.
    expect(screen.getByRole("link", { name: /cart/i })).toHaveTextContent(
      /^Cart$/,
    );
  });

  it("shows the summed quantity across items in the cart badge", () => {
    useCartStore.setState({
      items: [
        { product: headphones, quantity: 2 },
        { product: tshirt, quantity: 3 },
      ],
    });
    renderWithProviders(<Header />);

    const cartLink = screen.getByRole("link", { name: /cart/i });

    expect(within(cartLink).getByText("5")).toBeInTheDocument();
  });

  it("flips the theme toggle icon when clicked", async () => {
    const { user } = renderWithProviders(<Header />);

    const toggle = screen.getByRole("button", { name: "Toggle theme" });
    expect(toggle).toHaveTextContent("☾");

    await user.click(toggle);

    expect(toggle).toHaveTextContent("☀");
  });

  it("adds the dark class to the document element when toggled", async () => {
    const { user } = renderWithProviders(<Header />);

    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(screen.getByRole("button", { name: "Toggle theme" }));

    expect(document.documentElement).toHaveClass("dark");
  });

  it("shows the user name and a Log out button after logging in", async () => {
    const { user } = renderWithProviders(<Header />);

    await user.click(screen.getByRole("button", { name: "Log in" }));

    expect(screen.getByText("Alex")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();
  });
});
