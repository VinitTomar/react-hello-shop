import { delay, http, HttpResponse } from "msw";

export function wishlistHandlers(initial: string[] = []) {
  let wishlist = [...initial];

  return [
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
}
