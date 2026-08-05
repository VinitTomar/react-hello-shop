import { MOCK_PRODUCTS } from "@/data/products";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", () => {
    return HttpResponse.json(MOCK_PRODUCTS);
  }),

  http.get<{ id: string }>("/api/products/:id", ({ params }) => {
    const product = MOCK_PRODUCTS.find((p) => p.id.toString() === params.id);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),
];
