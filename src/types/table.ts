import type { ReactNode } from "react";

export type SortDirection = "asc" | "desc";

export type SortableKeys<T> = {
  [K in keyof T]: T[K] extends string | number | boolean ? K : never;
}[keyof T];

export type TableSortKey<T> = `${string & SortableKeys<T>}_${SortDirection}`;

export interface SortState<T> {
  key: SortableKeys<T>;
  direction: SortDirection;
}

export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortKey?: SortableKeys<T>;
  className?: string;
  headerClassName?: string;
}

export type SelectionProps =
  | {
      selectable: true;
      selectedKeys: Set<string>;
      onToggleRow: (key: string) => void;
    }
  | { selectable?: false };
