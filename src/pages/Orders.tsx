import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchOrders } from "@/store/ordersSlice";
import type { OrderStatus } from "@/types/order";

const badgeClasses: Record<OrderStatus, string> = {
  processing: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
};

export default function Orders() {
  const dispatch = useAppDispatch();
  const { status, orders } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (status === "idle") dispatch(fetchOrders());
  }, [status, dispatch]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Order History
      </h2>

      {status === "loading" && (
        <ul className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <li
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-2"></div>
            </li>
          ))}
        </ul>
      )}

      {status === "failed" && (
        <p className="text-sm text-red-500">Failed to load orders.</p>
      )}

      {status === "succeeded" && orders.length === 0 && (
        <div className="min-h-[300px] flex flex-col items-center justify-center gap-4">
          <span className="text-gray-600 dark:text-gray-300">No orders yet.</span>
          <Link to="/" className="text-blue-600 hover:underline text-sm">
            Browse products →
          </Link>
        </div>
      )}

      {status === "succeeded" && orders.length > 0 && (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {order.id}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeClasses[order.status]}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {order.items.length}{" "}
                {order.items.length === 1 ? "item" : "items"} · $
                {order.total.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
