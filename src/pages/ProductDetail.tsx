import { useNavigate, useParams } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/api/products";

const categoryBadgeClasses: Record<string, string> = {
  Electronics: "bg-blue-100 text-blue-700",
  Clothing: "bg-purple-100 text-purple-700",
  Books: "bg-amber-100 text-amber-700",
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    data: product,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    retry: false,
  });

  if (isPending) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <span>Product not found.</span>
        <button
          onClick={() => navigate("/")}
          className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-6"
        >
          ← Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1 mb-6"
      >
        ← Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full aspect-[4/3] object-cover rounded-xl"
        />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>
          <span
            className={
              (categoryBadgeClasses[product.category] ??
                "bg-gray-100 text-gray-700") +
              " text-xs font-medium px-2 py-0.5 rounded-full self-start mb-2"
            }
          >
            {product.category}
          </span>
          <span className="text-xl font-bold mt-1 text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <p className="text-gray-600 dark:text-gray-300 mt-3">
            {product.description}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="w-full mt-6 py-3 px-6 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
