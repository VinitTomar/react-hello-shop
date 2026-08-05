import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { CATEGORIES, type FilterValues } from "@/schemas/filter";

type FilterPanelProps = {
  register: UseFormRegister<FilterValues>;
  errors: FieldErrors<FilterValues>;
};

export default function FilterPanel({ register, errors }: FilterPanelProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex flex-col gap-4">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-700">
        Filters
      </h2>

      {/* Category */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
          Category
        </p>
        {CATEGORIES.map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
          >
            <input
              type="checkbox"
              value={cat}
              className="accent-blue-500"
              {...register("categories")}
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          Price Range
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Min</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="0"
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("minPrice", { valueAsNumber: true })}
          />
          {errors.minPrice && (
            <p className="text-xs text-red-500 mt-1">
              {errors.minPrice.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 dark:text-gray-400">Max</label>
          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="Any"
            className="w-full border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("maxPrice", { valueAsNumber: true })}
          />
          {errors.maxPrice && (
            <p className="text-xs text-red-500 mt-1">
              {errors.maxPrice.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
