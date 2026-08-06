import { useWishlist } from "@/hooks/useWishlist";
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

  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id.toString());

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleWishlist(product.id.toString());
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          aria-label={
            isWishlisted(product.id.toString())
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={
              wishlisted
                ? "w-4 h-4 fill-red-500 stroke-red-500"
                : "w-4 h-4 fill-none stroke-gray-400"
            }
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          className="w-full aspect-[4/3] object-cover rounded-t-xl"
        />
      </div>
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
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {name}
        </span>
        <span className="text-base font-bold text-gray-900 dark:text-white">
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
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
