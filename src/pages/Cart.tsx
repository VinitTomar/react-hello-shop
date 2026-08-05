import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      {items.length === 0 && (
        <>
          <span className="text-gray-600 dark:text-gray-300">
            Your cart is empty.
          </span>
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            {" "}
            Browse products →{" "}
          </Link>
        </>
      )}

      {items.length > 0 && (
        <div className="max-w-3xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Your Cart
          </h2>
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {items.map((item) => (
              <li
                key={item.product.id}
                className="flex items-center gap-4 py-4"
              >
                <img
                  src={item.product.imageUrl}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  alt={item.product.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {item.product.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    $${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={item.quantity === 1}
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                    {item.quantity}
                  </span>
                  <button
                    className="w-7 h-7 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() =>
                      updateQuantity(item.product.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="text-gray-300 hover:text-red-400 p-1 ml-2"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-end py-6 border-t border-gray-100 dark:border-gray-700 gap-2">
            <span className="text-base text-gray-500 dark:text-gray-400">
              Total
            </span>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              $${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="text-sm text-red-500 hover:text-red-700"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
            <button
              className="bg-gray-200 text-gray-400 cursor-not-allowed px-6 py-3 rounded-lg text-sm font-medium"
              disabled
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
