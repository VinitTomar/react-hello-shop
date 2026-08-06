import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import {
  filterSchema,
  type Category,
  type FilterValues,
} from "@/schemas/filter";
import FilterPanel from "@/components/FilterPanel";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { ProductPage } from "@/types/product";

export default function Home() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetch(`/api/products?page=${pageParam}&limit=3`).then(
        (r) => r.json() as Promise<ProductPage>,
      ),
    initialPageParam: 1,
    getNextPageParam: ({ hasMore, nextPage }) =>
      hasMore && nextPage != null ? nextPage : undefined,
  });

  const products = data?.pages.flatMap((page) => page.products) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const {
    register,
    control,
    formState: { errors },
  } = useForm<FilterValues>({
    resolver: zodResolver(filterSchema),
    mode: "onChange",
    defaultValues: {
      search: "",
      categories: [],
      minPrice: undefined,
      maxPrice: undefined,
    },
  });

  const values = useWatch({ control });
  const debounceSearch = useDebounce(values.search ?? "", 300);

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-500">Loading products…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-gray-500">Failed to load products.</p>
      </div>
    );
  }

  const filteredProducts = products.filter((p) => {
    const q = debounceSearch?.toLowerCase();

    if (q && !p.name.toLowerCase().includes(q)) return false;

    if (
      values.categories &&
      values.categories.length > 0 &&
      !values.categories.includes(p.category as Category)
    )
      return false;

    if (values.minPrice != null && p.price < values.minPrice) return false;
    if (values.maxPrice != null && p.price > values.maxPrice) return false;

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar register={register} />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-56 shrink-0">
          <FilterPanel register={register} errors={errors} />
        </div>
        <div className="flex-1 min-w-0">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-8 mx-auto block px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}

      {!hasNextPage && products.length > 0 && (
        <p className="mt-8 text-center text-sm text-gray-400">
          You've seen all {total} products.
        </p>
      )}
    </div>
  );
}
