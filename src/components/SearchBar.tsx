import type { UseFormRegister } from "react-hook-form";
import type { FilterValues } from "@/schemas/filter";

type SearchBarProps = {
  register: UseFormRegister<FilterValues>;
};

export default function SearchBar({ register }: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...register("search")}
    />
  );
}
