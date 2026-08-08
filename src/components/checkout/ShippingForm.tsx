import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ShippingData } from "@/types/checkout";

const shippingSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid postal code"),
});

const labelClass =
  "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";
const errorClass = "mt-1 text-xs text-red-500 dark:text-red-400";

function inputClass(hasError: boolean) {
  return hasError
    ? "w-full border border-red-400 dark:border-red-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    : "w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
}

interface ShippingFormProps {
  onSubmit: (data: ShippingData) => void;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    mode: "onBlur",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6"
    >
      <div className="mb-4">
        <label htmlFor="fullName" className={labelClass}>
          Full Name
        </label>
        <input
          id="fullName"
          className={inputClass(!!errors.fullName)}
          {...register("fullName")}
        />
        {errors.fullName?.message && (
          <p className={errorClass}>{errors.fullName.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className={labelClass}>
          Address
        </label>
        <input
          id="address"
          className={inputClass(!!errors.address)}
          {...register("address")}
        />
        {errors.address?.message && (
          <p className={errorClass}>{errors.address.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="city" className={labelClass}>
            City
          </label>
          <input
            id="city"
            className={inputClass(!!errors.city)}
            {...register("city")}
          />
          {errors.city?.message && (
            <p className={errorClass}>{errors.city.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="country" className={labelClass}>
            Country
          </label>
          <input
            id="country"
            className={inputClass(!!errors.country)}
            {...register("country")}
          />
          {errors.country?.message && (
            <p className={errorClass}>{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="postalCode" className={labelClass}>
          Postal Code
        </label>
        <input
          id="postalCode"
          className={inputClass(!!errors.postalCode)}
          {...register("postalCode")}
        />
        {errors.postalCode?.message && (
          <p className={errorClass}>{errors.postalCode.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-6"
      >
        Continue to Payment
      </button>
    </form>
  );
}
