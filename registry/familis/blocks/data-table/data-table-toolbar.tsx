"use client"

import type { ReactNode } from "react"
import type { RowData, ReactTable } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/registry/familis/blocks/data-table/data-table-features"
import { Input } from "@/registry/familis/ui/input"
import { Button } from "@/registry/familis/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/registry/familis/ui/dropdown-menu"

export function DataTableToolbar<TData extends RowData>({
  table,
  filterColumn,
  filterLabel = "Filter rows",
  children,
}: {
  table: ReactTable<DataTableFeatures, TData>
  filterColumn?: string
  filterLabel?: string
  children?: ReactNode
}) {
  const filter = filterColumn ? table.getColumn(filterColumn) : undefined
  return (
    <div className="flex flex-wrap items-center gap-2">
      {filter && (
        <Input
          type="search"
          aria-label={filterLabel}
          placeholder={filterLabel}
          value={String(filter.getFilterValue() ?? "")}
          onChange={(event) => filter.setFilterValue(event.target.value)}
          className="min-w-40 flex-1"
        />
      )}
      {children}
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
          Columns
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            {table
              .getAllLeafColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  disabled={column.getIsVisible() && table.getVisibleLeafColumns().length === 1}
                  onCheckedChange={(checked) => column.toggleVisibility(checked)}
                >
                  {typeof column.columnDef.header === "string"
                    ? column.columnDef.header
                    : column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
