import type { SortKey } from "@/types/sort";
import { memo } from "react";

interface SortBarProps {
  sortBy: SortKey;
  onSortChange: (sort: SortKey) => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
];

function SortBar({ sortBy, onSortChange }: SortBarProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortKey)}
        className="text-sm border border-gray-200 dark:border-gray-600 rounded-md px-2 py-1 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(SortBar);
