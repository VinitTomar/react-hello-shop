import { MOCK_PRODUCTS } from "@/data/products";
import type { Order } from "@/types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  orders: Order[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-001",
    createdAt: "2025-06-15",
    status: "delivered",
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 1, unitPrice: 79.99 },
      { product: MOCK_PRODUCTS[2], quantity: 2, unitPrice: 29.99 },
    ],
    total: 139.97,
  },
  {
    id: "ORD-002",
    createdAt: "2025-07-01",
    status: "shipped",
    items: [{ product: MOCK_PRODUCTS[3], quantity: 1, unitPrice: 149.99 }],
    total: 149.99,
  },
  {
    id: "ORD-003",
    createdAt: "2025-07-20",
    status: "processing",
    items: [{ product: MOCK_PRODUCTS[5], quantity: 3, unitPrice: 9.99 }],
    total: 29.97,
  },
];

export const fetchOrders = createAsyncThunk<Order[]>(
  "orders/fetchOrders",
  async () => {
    await new Promise<void>((r) => setTimeout(() => r(), 800));
    return MOCK_ORDERS;
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  } as OrdersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load orders";
      });
  },
});

export default orderSlice.reducer;
