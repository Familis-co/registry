"use client"

import { useState, type ReactNode } from "react"
import { cn } from "cn"
import {
  useTable,
  type ColumnDef,
  type RowData,
  type RowSelectionState,
  type ReactTable,
  type TableOptions,
  type Row,
} from "@tanstack/react-table"
import {
  dataTableFeatures,
  type DataTableFeatures,
} from "@/registry/familis/blocks/data-table/data-table-features"
import { DataTableToolbar } from "@/registry/familis/blocks/data-table/data-table-toolbar"
import { DataTablePagination } from "@/registry/familis/blocks/data-table/data-table-pagination"
import { DataTableContent } from "@/registry/familis/blocks/data-table/data-table-content"

export type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  /** Accessible name of the table. */
  label: string
  filterColumn?: string
  filterLabel?: string
  pageSize?: number
  enableSelection?: boolean
  /** Stable IDs preserve selection when data changes order. */
  getRowId?: (row: TData, index: number) => string
  onSelectionChange?: (selection: RowSelectionState) => void
  emptyMessage?: ReactNode
  loading?: boolean
  className?: string
  renderRow?: (row: Row<DataTableFeatures, TData>) => ReactNode
  wrapRows?: (rows: ReactNode) => ReactNode
  leadingHeader?: ReactNode
  toolbar?: ReactNode | ((table: ReactTable<DataTableFeatures, TData>) => ReactNode)
  pagination?: ReactNode | ((table: ReactTable<DataTableFeatures, TData>) => ReactNode)
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  label,
  filterColumn,
  filterLabel = "Filter rows",
  pageSize = 10,
  enableSelection = false,
  getRowId,
  onSelectionChange,
  emptyMessage = "No results found.",
  loading = false,
  className,
  toolbar,
  pagination,
  renderRow,
  wrapRows,
  leadingHeader,
}: DataTableProps<TData>) {
  const [selection, setSelection] = useState<RowSelectionState>({})
  const table = useTable(
    {
      features: dataTableFeatures,
      columns,
      data,
      getRowId,
      enableRowSelection: enableSelection,
      initialState: { pagination: { pageIndex: 0, pageSize: Math.max(1, pageSize) } },
      state: { rowSelection: selection },
      onRowSelectionChange: (updater) => {
        const next = typeof updater === "function" ? updater(selection) : updater
        setSelection(next)
        onSelectionChange?.(next)
      },
    },
    (state) => state,
  )
  return (
    <DataTableView
      table={table}
      label={label}
      filterColumn={filterColumn}
      filterLabel={filterLabel}
      enableSelection={enableSelection}
      emptyMessage={emptyMessage}
      loading={loading}
      className={className}
      toolbar={toolbar}
      renderRow={renderRow}
      wrapRows={wrapRows}
      leadingHeader={leadingHeader}
      pagination={pagination}
    />
  )
}

export type DataTableViewProps<TData extends RowData> = Omit<
  DataTableProps<TData>,
  "columns" | "data" | "getRowId" | "onSelectionChange" | "pageSize"
> & {
  table: ReactTable<DataTableFeatures, TData>
}

/** Compose your own toolbar/footer, or use the supplied defaults. Null hides a slot. */
export function DataTableView<TData extends RowData>({
  table,
  label,
  filterColumn,
  filterLabel,
  enableSelection = false,
  emptyMessage,
  loading = false,
  className,
  toolbar,
  pagination,
  renderRow,
  wrapRows,
  leadingHeader,
}: DataTableViewProps<TData>) {
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-4", className)}>
      {toolbar === undefined ? (
        <DataTableToolbar table={table} filterColumn={filterColumn} filterLabel={filterLabel} />
      ) : typeof toolbar === "function" ? (
        toolbar(table)
      ) : (
        toolbar
      )}
      <DataTableContent
        table={table}
        label={label}
        loading={loading}
        enableSelection={enableSelection}
        renderRow={renderRow}
        wrapRows={wrapRows}
        leadingHeader={leadingHeader}
        emptyMessage={emptyMessage}
      />
      {pagination === undefined ? (
        <DataTablePagination table={table} enableSelection={enableSelection} loading={loading} />
      ) : typeof pagination === "function" ? (
        pagination(table)
      ) : (
        pagination
      )}
    </div>
  )
}

/** Accepts TanStack options, including controlled state and manual server pagination. */
export function useDataTable<TData extends RowData>(
  options: Omit<TableOptions<DataTableFeatures, TData>, "features">,
) {
  return useTable({ ...options, features: dataTableFeatures })
}
