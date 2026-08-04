import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import ProductGrid from "@/components/ProductGrid";
import { MOCK_PRODUCTS } from "@/data/products";
import SearchBar from "@/components/SearchBar";
import {
  filterSchema,
  type Category,
  type FilterValues,
} from "@/schemas/filter";
import FilterPanel from "@/components/FilterPanel";
import { useDebounce } from "@/hooks/useDebounce";

export default function Home() {
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

  const filteredProducts = MOCK_PRODUCTS.filter((p) => {
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
    </div>
  );
}
