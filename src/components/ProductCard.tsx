import { useCartStore } from "@/store/cartStore";
import type { Product, ProductCardVariant } from "@/types/product";

export type ProductCardProps = { product: Product } & ProductCardVariant;

const categoryBadgeClasses: Record<string, string> = {
  Electronics: "bg-blue-100 text-blue-700",
  Clothing: "bg-purple-100 text-purple-700",
  Books: "bg-amber-100 text-amber-700",
};

function ProductCard({ product, variant }: ProductCardProps) {
  const { imageUrl, name, price, category, description } = product;
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="w-full aspect-[4/3] object-cover rounded-t-xl"
      />
      <div className="p-4 flex flex-col">
        {variant === "full" && (
          <span
            className={
              (categoryBadgeClasses[category] ?? "bg-gray-100 text-gray-700") +
              " self-start text-xs font-medium px-2 py-0.5 rounded-full mb-2"
            }
          >
            {category}
          </span>
        )}
        <span className="text-sm font-semibold text-gray-900">{name}</span>
        <span className="text-base font-bold text-gray-900">
          ${price.toFixed(2)}
        </span>
        {variant === "compact" && (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full mt-3 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Add to Cart
          </button>
        )}
        {variant === "full" && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
