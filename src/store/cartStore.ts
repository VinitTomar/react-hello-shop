import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartStore {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const createCartSlice: StateCreator<CartStore> = (set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }

      return { items: [...state.items, { product, quantity: 1 }] };
    }),

  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    })),

  clearCart: () => set({ items: [] }),
});

export const useCartStore = create<CartStore>()(
  devtools(persist(createCartSlice, { name: "cart-storage" })),
);
