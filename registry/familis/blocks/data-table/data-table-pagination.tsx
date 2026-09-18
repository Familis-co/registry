"use client"

import type { RowData, ReactTable } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/registry/familis/ui/hooks/use-data-table"
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react"
import { Button } from "@/registry/familis/ui/button"
import { NativeSelect, NativeSelectOption } from "@/registry/familis/ui/native-select"

const defaultPageSizes = [10, 20, 50]
export function DataTablePagination<TData extends RowData>({
  table,
  enableSelection = false,
  loading = false,
  pageSizes = defaultPageSizes,
}: {
  table: ReactTable<DataTableFeatures, TData>
  enableSelection?: boolean
  loading?: boolean
  pageSizes?: number[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p role="status" className="text-sm text-muted-foreground">
        {enableSelection && `${table.getFilteredSelectedRowModel().rows.length} selected · `}
        {table.getRowCount()} rows
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <NativeSelect
          aria-label="Rows per page"
          value={table.state.pagination.pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
        >
          {[...new Set([table.state.pagination.pageSize, ...pageSizes.filter((size) => size > 0)])]
            .sort((a, b) => a - b)
            .map((size) => (
              <NativeSelectOption key={size} value={size}>
                {size} / page
              </NativeSelectOption>
            ))}
        </NativeSelect>
        <span className="text-sm text-muted-foreground">
          Page {table.getPageCount() === 0 ? 0 : table.state.pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="First page"
          disabled={loading || !table.getCanPreviousPage()}
          onClick={() => table.setPageIndex(0)}
        >
          <ChevronsLeftIcon aria-hidden="true" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={loading || !table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={loading || !table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Last page"
          disabled={loading || !table.getCanNextPage()}
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          <ChevronsRightIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
