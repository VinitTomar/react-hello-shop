import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { PaymentData } from "@/types/checkout";

const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Enter a 16-digit card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY format"),
  cvv: z.string().regex(/^\d{3,4}$/, "Invalid CVV"),
});

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
const errorClass = "mt-1 text-xs text-red-500 dark:text-red-400";

function inputClass(hasError: boolean) {
  return hasError
    ? "w-full border border-red-400 dark:border-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    : "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
}

interface PaymentFormProps {
  onSubmit: (data: PaymentData) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}

export default function PaymentForm({
  onSubmit,
  isSubmitting,
  error,
}: PaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    mode: "onBlur",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="mb-4">
        <label htmlFor="cardNumber" className={labelClass}>
          Card Number
        </label>
        <input
          id="cardNumber"
          className={inputClass(!!errors.cardNumber)}
          {...register("cardNumber")}
        />
        {errors.cardNumber?.message && (
          <p className={errorClass}>{errors.cardNumber.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="expiry" className={labelClass}>
            Expiry
          </label>
          <input
            id="expiry"
            className={inputClass(!!errors.expiry)}
            {...register("expiry")}
          />
          {errors.expiry?.message && (
            <p className={errorClass}>{errors.expiry.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="cvv" className={labelClass}>
            CVV
          </label>
          <input
            id="cvv"
            className={inputClass(!!errors.cvv)}
            {...register("cvv")}
          />
          {errors.cvv?.message && (
            <p className={errorClass}>{errors.cvv.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
      >
        {isSubmitting ? "Placing Order…" : "Place Order"}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </form>
  );
}
