import type { Product } from "@/types/product";

export type OrderStatus = "processing" | "shipped" | "delivered";

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}
