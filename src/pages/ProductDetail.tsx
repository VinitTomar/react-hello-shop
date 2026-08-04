import { useNavigate, useParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "@/data/products";
import { useCartStore } from "@/store/cartStore";

const categoryBadgeClasses: Record<string, string> = {
  Electronics: "bg-blue-100 text-blue-700",
  Clothing: "bg-purple-100 text-purple-700",
  Books: "bg-amber-100 text-amber-700",
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = MOCK_PRODUCTS.find((p) => p.id.toString() === id);
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {!product && (
        <div>
          <span>Product not found.</span>
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 mb-6"
      >
        ← Back to products
      </button>

      {product && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full aspect-[4/3] object-cover rounded-xl"
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <span
              className={
                (categoryBadgeClasses[product.category] ??
                  "bg-gray-100 text-gray-700") +
                " text-xs font-medium px-2 py-0.5 rounded-full self-start mb-2"
              }
            >
              {product.category}
            </span>
            <span className="text-xl font-bold mt-1 text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <p className="text-gray-600 mt-3">{product.description}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full mt-6 py-3 px-6 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
