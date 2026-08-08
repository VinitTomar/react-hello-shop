import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import PaymentForm from "@/components/checkout/PaymentForm";
import ShippingForm from "@/components/checkout/ShippingForm";
import { useCartStore } from "@/store/cartStore";
import type {
  CheckoutStep,
  OrderResult,
  PaymentData,
  ShippingData,
} from "@/types/checkout";

const STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "shipping", label: "Shipping" },
  { key: "payment", label: "Payment" },
  { key: "confirmation", label: "Confirmation" },
];

export default function Checkout() {
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [shippingData, setShippingData] = useState<ShippingData | null>(null);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const items = useCartStore((state) => state.items);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) navigate("/cart", { replace: true });
  }, [items.length, navigate]);

  const currentIndex = STEPS.findIndex((s) => s.key === step);

  function handleShippingSubmit(data: ShippingData) {
    setShippingData(data);
    setStep("payment");
  }

  async function handlePaymentSubmit(_paymentData: PaymentData) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Card details are never sent or stored — the mock API only needs the
      // cart and the shipping address (§2).
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping: shippingData }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const result: OrderResult = await res.json();
      setOrderResult(result);
      setStep("confirmation");
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleContinueShopping() {
    useCartStore.getState().clearCart();
    navigate("/");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Checkout
      </h2>

      <nav aria-label="Checkout steps" className="flex items-center gap-3 mb-8">
        {STEPS.map(({ key, label }, index) => (
          <div
            key={key}
            className="flex items-center gap-3 flex-1 last:flex-none"
          >
            <span className="flex items-center gap-2">
              <span
                className={
                  index <= currentIndex
                    ? "w-2.5 h-2.5 rounded-full bg-blue-600"
                    : "w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"
                }
              />
              <span
                className={
                  index <= currentIndex
                    ? "text-sm font-medium text-blue-600 dark:text-blue-400"
                    : "text-sm text-gray-400 dark:text-gray-500"
                }
              >
                {label}
              </span>
            </span>
            {index < STEPS.length - 1 && (
              <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            )}
          </div>
        ))}
      </nav>

      {step === "shipping" && <ShippingForm onSubmit={handleShippingSubmit} />}

      {step === "payment" && (
        <PaymentForm
          onSubmit={handlePaymentSubmit}
          isSubmitting={isSubmitting}
          error={submitError}
        />
      )}

      {step === "confirmation" && orderResult && (
        <OrderConfirmation
          result={orderResult}
          onContinue={handleContinueShopping}
        />
      )}
    </div>
  );
}
