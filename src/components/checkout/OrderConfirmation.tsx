import type { OrderResult } from "@/types/checkout";

interface OrderConfirmationProps {
  result: OrderResult;
  onContinue: () => void;
}

export default function OrderConfirmation({
  result,
  onContinue,
}: OrderConfirmationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
        <span className="text-green-600 dark:text-green-400 text-2xl">✓</span>
      </div>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Order Placed!
      </h2>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        Your order number
      </p>
      <p className="text-base font-semibold text-gray-900 dark:text-white mb-6">
        {result.orderId}
      </p>

      <button
        onClick={onContinue}
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );
}
