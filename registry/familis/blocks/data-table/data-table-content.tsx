"use client"

import type { ReactNode } from "react"
import type { RowData, ReactTable, Row } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/registry/familis/blocks/data-table/data-table-features"
import { Checkbox } from "@/registry/familis/ui/checkbox"
import { DataTableColumnHeader } from "@/registry/familis/blocks/data-table/data-table-column-header"
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/registry/familis/ui/table"

export function DataTableContent<TData extends RowData>({
  table,
  label,
  loading = false,
  enableSelection = false,
  emptyMessage = "No results found.",
  renderRow,
  wrapRows,
  leadingHeader,
}: {
  table: ReactTable<DataTableFeatures, TData>
  label: string
  loading?: boolean
  enableSelection?: boolean
  emptyMessage?: ReactNode
  renderRow?: (row: Row<DataTableFeatures, TData>) => ReactNode
  wrapRows?: (rows: ReactNode) => ReactNode
  leadingHeader?: ReactNode
}) {
  const visibleCount =
    table.getVisibleLeafColumns().length +
    (enableSelection ? 1 : 0) +
    (leadingHeader !== undefined ? 1 : 0)
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table aria-label={label} aria-busy={loading}>
        <TableHeader>
          {table.getHeaderGroups().map((group, groupIndex) => (
            <TableRow key={group.id}>
              {leadingHeader !== undefined && groupIndex === 0 ? (
                <TableHead rowSpan={table.getHeaderGroups().length}>{leadingHeader}</TableHead>
              ) : null}
              {enableSelection && groupIndex === 0 && (
                <TableHead rowSpan={table.getHeaderGroups().length}>
                  <Checkbox
                    aria-label="Select all rows on this page"
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={
                      table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
                    }
                    disabled={loading || table.getRowModel().rows.length === 0}
                    onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
                  />
                </TableHead>
              )}
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  aria-sort={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : undefined
                  }
                >
                  {header.isPlaceholder ? null : header.column.getCanSort() &&
                    typeof header.column.columnDef.header === "string" ? (
                    <DataTableColumnHeader column={header.column}>
                      <table.FlexRender header={header} />
                    </DataTableColumnHeader>
                  ) : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading || table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={Math.max(1, visibleCount)}>
                <div role="status" className="flex min-h-24 items-center justify-center">
                  {loading ? "Loading…" : emptyMessage}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            (() => {
              const rows = table
                .getRowModel()
                .rows.map((row) =>
                  renderRow ? (
                    renderRow(row)
                  ) : (
                    <DataTableRow
                      key={row.id}
                      row={row}
                      table={table}
                      enableSelection={enableSelection}
                    />
                  ),
                )
              return wrapRows ? wrapRows(rows) : rows
            })()
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export function DataTableRow<TData extends RowData>({
  row,
  table,
  enableSelection = false,
  leadingCell,
  ...props
}: {
  row: Row<DataTableFeatures, TData>
  table: ReactTable<DataTableFeatures, TData>
  enableSelection?: boolean
  leadingCell?: ReactNode
} & Omit<React.ComponentProps<"tr">, "children">) {
  return (
    <TableRow {...props} data-state={row.getIsSelected() ? "selected" : undefined}>
      {leadingCell !== undefined ? <TableCell>{leadingCell}</TableCell> : null}
      {enableSelection ? (
        <TableCell>
          <Checkbox
            aria-label={`Select row ${row.id}`}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onCheckedChange={(checked) => row.toggleSelected(checked)}
          />
        </TableCell>
      ) : null}
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <table.FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  )
}
