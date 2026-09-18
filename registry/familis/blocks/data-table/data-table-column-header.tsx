"use client"
import type { ReactNode } from "react"
import type { Column, RowData } from "@tanstack/react-table"
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDownIcon } from "lucide-react"
import type { DataTableFeatures } from "@/registry/familis/ui/hooks/use-data-table"
import { Button } from "@/registry/familis/ui/button"

export function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  children,
}: {
  column: Column<DataTableFeatures, TData, TValue>
  children: ReactNode
}) {
  if (!column.getCanSort()) return children
  const Icon =
    column.getIsSorted() === "asc"
      ? ArrowUpIcon
      : column.getIsSorted() === "desc"
        ? ArrowDownIcon
        : ArrowUpDownIcon
  return (
    <Button variant="ghost" size="sm" onClick={() => column.toggleSorting()}>
      {children}
      <Icon data-icon="inline-end" aria-hidden="true" />
    </Button>
  )
}
