import { MOCK_PRODUCTS } from "@/data/products";
import type { ProductPage } from "@/types/product";
import { delay, http, HttpResponse } from "msw";

let wishlist: string[] = [];

export const handlers = [
  http.get<{ id: string }>("/api/products/:id", async ({ params }) => {
    await delay(400);
    const product = MOCK_PRODUCTS.find((p) => p.id.toString() === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  http.get("/api/products", async ({ request }) => {
    await delay(600);
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? "1");
    const limit = Number(url.searchParams.get("limit") ?? "3");
    const start = (page - 1) * limit;
    const slice = MOCK_PRODUCTS.slice(start, start + limit);
    return HttpResponse.json({
      products: slice,
      hasMore: start + limit < MOCK_PRODUCTS.length,
      nextPage: start + limit < MOCK_PRODUCTS.length ? page + 1 : null,
      total: MOCK_PRODUCTS.length,
    } satisfies ProductPage);
  }),

  http.get("/api/wishlist", async () => {
    await delay(300);
    return HttpResponse.json(wishlist);
  }),

  http.post("/api/wishlist/:productId", async ({ params }) => {
    await delay(300);
    const id = params.productId as string;
    if (!wishlist.includes(id)) wishlist = [...wishlist, id];

    return HttpResponse.json({ id });
  }),

  http.delete("/api/wishlist/:productId", async ({ params }) => {
    await delay(300);
    wishlist = wishlist.filter((id) => id !== params.productId);

    return new HttpResponse(null, { status: 204 });
  }),
];
