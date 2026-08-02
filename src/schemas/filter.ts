import { z } from "zod";

export const CATEGORIES = ["Electronics", "Books", "Clothing"] as const;
export type Category = (typeof CATEGORIES)[number];

export const filterSchema = z
  .object({
    search: z.string(),
    categories: z.array(z.enum(CATEGORIES)),
    minPrice: z
      .union([
        z.number().nonnegative("Must be ≥ 0"),
        z.nan().transform((): undefined => undefined),
      ])
      .optional(),
    maxPrice: z
      .union([
        z.number().nonnegative("Must be ≥ 0"),
        z.nan().transform((): undefined => undefined),
      ])
      .optional(),
  })
  .refine(
    (d) => d.maxPrice == null || d.minPrice == null || d.minPrice <= d.maxPrice,
    { message: "Min must be ≤ Max", path: ["maxPrice"] },
  );

export type FilterValues = z.infer<typeof filterSchema>;
