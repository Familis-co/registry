"use client"

import type { OnChangeFn, PaginationState, SortingState } from "@tanstack/react-table"

export interface PaginatorMeta {
  total: number | string
  perPage: number | string
  currentPage: number | string
  lastPage: number | string
  firstPage?: number | string
  firstPageUrl?: string
  lastPageUrl?: string
  nextPageUrl?: string | null
  previousPageUrl?: string | null
}

export type VisitFn = (args: { page: number; perPage: number }) => void

export interface UseRemoteDataTableOptions {
  data: { metadata: PaginatorMeta } | undefined
  visit: VisitFn
  sorting?: { state: SortingState; onChange: OnChangeFn<SortingState> }
  /** Requested 1-based page and size, usually held in the URL or query state. */
  current?: { page: number; perPage: number }
}

export interface RemoteDataTableOptions {
  manualPagination: true
  manualSorting: true
  enableSorting: boolean
  autoResetPageIndex: false
  rowCount?: number
  pageCount: number
  state: { pagination: PaginationState; sorting?: SortingState }
  onPaginationChange: OnChangeFn<PaginationState>
  onSortingChange?: OnChangeFn<SortingState>
}

function positiveInteger(value: unknown, fallback: number): number {
  const number = Number(value)
  return Number.isFinite(number) && number >= 1 ? Math.floor(number) : fallback
}

/**
 * Adapts API metadata to controlled TanStack options; the caller fetches through visit.
 * Current takes priority over stale response metadata while a request is in flight.
 * Page-size changes request page 1. Sorting's handler owns refetching and page resets.
 * This adapter derives options without duplicating the caller's state or fetching data.
 */
export function useRemoteDataTable({
  data,
  visit,
  sorting,
  current,
}: UseRemoteDataTableOptions): RemoteDataTableOptions {
  const metadata = data?.metadata
  const pageIndex = positiveInteger(current?.page ?? metadata?.currentPage, 1) - 1
  const pageSize = positiveInteger(current?.perPage ?? metadata?.perPage, 10)
  const pageCount = Math.max(positiveInteger(metadata?.lastPage, 1), pageIndex + 1)
  const total = metadata?.total === undefined ? undefined : Number(metadata.total)
  const rowCount =
    total !== undefined && Number.isFinite(total) && total >= 0 ? Math.floor(total) : undefined

  return {
    manualPagination: true,
    manualSorting: true,
    enableSorting: sorting !== undefined,
    autoResetPageIndex: false,
    rowCount,
    pageCount,
    state: { pagination: { pageIndex, pageSize }, ...(sorting ? { sorting: sorting.state } : {}) },
    onPaginationChange: (updater) => {
      const previous = { pageIndex, pageSize }
      const next = typeof updater === "function" ? updater(previous) : updater
      const perPage = positiveInteger(next.pageSize, pageSize)
      const page = perPage !== pageSize ? 1 : positiveInteger(next.pageIndex + 1, pageIndex + 1)
      if (page === pageIndex + 1 && perPage === pageSize) return
      visit({ page, perPage })
    },
    ...(sorting ? { onSortingChange: sorting.onChange } : {}),
  }
}
