import ProductGrid from "@/components/ProductGrid";
import { MOCK_PRODUCTS } from "@/data/products";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProductGrid products={MOCK_PRODUCTS} />
    </div>
  );
}
