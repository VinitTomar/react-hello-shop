import type { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
  // await new Promise((res) => setTimeout(res, 1000));
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: string): Promise<Product> {
  // await new Promise((res) => setTimeout(res, 800));
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found`);
  return res.json();
}
