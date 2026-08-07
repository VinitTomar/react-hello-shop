import type {
  ColumnDef,
  SortableKeys,
  SortState,
  TableSortKey,
} from "@/types/table";
import clsx from "clsx";
import { useMemo, useState } from "react";

export interface SortableTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowKey: (row: T) => string;
  defaultSort?: TableSortKey<T>;
}

function parseSortKey<T>(sortKey: TableSortKey<T>): SortState<T> {
  const i = sortKey.lastIndexOf("_");
  const direction = sortKey.slice(i + 1) === "asc" ? "asc" : "desc";

  return {
    key: sortKey.slice(0, i) as SortableKeys<T>,
    direction,
  };
}

function SortableTable<T>({
  data,
  columns,
  getRowKey,
  defaultSort,
}: SortableTableProps<T>) {
  const [sort, setSort] = useState<SortState<T> | null>(
    defaultSort ? parseSortKey(defaultSort) : null,
  );

  const sorted = useMemo(() => {
    if (!sort) return data;

    return [...data].sort((a, b) => {
      const av = a[sort.key] as string | number;
      const bv = b[sort.key] as string | number;

      if (av < bv) return sort.direction === "asc" ? -1 : 1;

      if (av > bv) return sort.direction === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sort]);

  function handleSort(key: SortableKeys<T>) {
    setSort((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={clsx(
                  "px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap",
                  col.sortKey &&
                    "cursor-pointer select-none hover:text-gray-900",
                  col.headerClassName,
                )}
                onClick={
                  col.sortKey ? () => handleSort(col.sortKey!) : undefined
                }
              >
                {col.header}
                {col.sortKey && sort?.key === col.sortKey && (
                  <span className="ml-1 text-blue-600">
                    {sort.direction === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {sorted.map((row) => (
            <tr
              key={getRowKey(row)}
              className="bg-white hover:bg-gray-50 transition-colors"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`px-4 py-3 ${col.className ?? ""}`}
                >
                  {col.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SortableTable;
