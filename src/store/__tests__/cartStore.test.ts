import { useCartStore } from "@/store/cartStore";

const mockProduct = {
  id: 1,
  name: "Wireless Headphones",
  price: 79.99,
  category: "Electronics",
  description: "High-quality audio.",
  imageUrl: "https://example.com/headphones.jpg",
};

const mockProduct2 = {
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

describe("cartStore", () => {
  it("starts with an empty cart", () => {
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("adds a product with quantity 1", () => {
    useCartStore.getState().addToCart(mockProduct);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
  });

  it("increments quantity when the same product is added twice", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("removes a product by id", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().removeFromCart(mockProduct.id);
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updates the quantity of an item", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().updateQuantity(mockProduct.id, 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("does not affect other items when updating quantity", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct2);
    useCartStore.getState().updateQuantity(mockProduct.id, 3);
    const other = useCartStore
      .getState()
      .items.find((i) => i.product.id === mockProduct2.id);
    expect(other?.quantity).toBe(1);
  });

  it("clears all items from the cart", () => {
    useCartStore.getState().addToCart(mockProduct);
    useCartStore.getState().addToCart(mockProduct2);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });
});
