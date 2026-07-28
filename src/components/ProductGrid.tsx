import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Link } from "react-router-dom";

export type ProductGridProps = { products: Product[] };

function ProductGrid({ products }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <p className="min-h-[200px] text-sm text-gray-400 text-center">
        No products found.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => {
        return (
          <li key={p.id}>
            <Link
              to={`/products/${p.id}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
            >
              <ProductCard product={p} variant="compact" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ProductGrid;
