import { useDataTable } from "@/registry/familis/ui/hooks/use-data-table"
import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn } from "storybook/test"
import { createColumnHelper, type SortingState } from "@tanstack/react-table"
import {
  useRemoteDataTable,
  type PaginatorMeta,
  type VisitFn,
} from "@/registry/familis/ui/hooks/use-remote-data-table"
import { DataTableView } from "@/registry/familis/blocks/data-table/data-table"
import type { DataTableFeatures } from "@/registry/familis/ui/hooks/use-data-table"
import { Button } from "@/registry/familis/ui/button"

const records = [
  { id: "amira", name: "Amira Hassan" },
  { id: "sofia", name: "Sofia Martin" },
  { id: "noah", name: "Noah Dubois" },
]
const helper = createColumnHelper<DataTableFeatures, (typeof records)[number]>()
const columns = helper.columns([helper.accessor("name", { header: "Name", sortFn: "text" })])
const initialMetadata: PaginatorMeta = { total: "3", perPage: "2", currentPage: "1", lastPage: "2" }

function RemoteExample({
  metadata = initialMetadata,
  current: initialCurrent,
  onVisit,
  sortable = false,
  missingResponse = false,
}: {
  metadata?: PaginatorMeta
  current?: { page: number; perPage: number }
  onVisit: VisitFn
  sortable?: boolean
  missingResponse?: boolean
}) {
  const [current, setCurrent] = useState(initialCurrent)
  const [response, setResponse] = useState(missingResponse ? undefined : { metadata })
  const [sorting, setSorting] = useState<SortingState>([])
  const options = useRemoteDataTable({
    data: response,
    current,
    visit: (next) => {
      setCurrent(next)
      onVisit(next)
    },
    sorting: sortable ? { state: sorting, onChange: setSorting } : undefined,
  })
  const { pageIndex, pageSize } = options.state.pagination
  const pending =
    !response ||
    (current !== undefined &&
      (current.page !== Number(response.metadata.currentPage) ||
        current.perPage !== Number(response.metadata.perPage)))
  const table = useDataTable({
    columns,
    data: records.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    ...options,
  })
  return (
    <div className="flex flex-col gap-4">
      <DataTableView table={table} label="Remote families" toolbar={null} loading={pending} />
      <p>Response page: {response?.metadata.currentPage ?? "none"}</p>
      <p>
        Requested page: {pageIndex + 1}; size: {pageSize}; pages: {options.pageCount}
      </p>
      <Button
        disabled={!pending}
        onClick={() =>
          setResponse({
            metadata: {
              total: 3,
              currentPage: pageIndex + 1,
              perPage: pageSize,
              lastPage: Math.ceil(3 / pageSize),
            },
          })
        }
      >
        Apply response
      </Button>
      <Button
        variant="outline"
        onClick={() => options.onPaginationChange({ pageIndex: 0, pageSize })}
      >
        Request first page
      </Button>
      <Button variant="outline" onClick={() => options.onPaginationChange((previous) => previous)}>
        Keep current page
      </Button>
    </div>
  )
}
const meta = {
  title: "UI/Hooks/Remote data table",
  component: RemoteExample,
  args: { onVisit: fn() },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof RemoteExample>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Next" }))
    await expect(args.onVisit).toHaveBeenLastCalledWith({ page: 2, perPage: 2 })
    await expect(canvas.getByText("Response page: 1")).toBeVisible()
    await expect(canvas.getByText("Requested page: 2; size: 2; pages: 2")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Apply response" }))
    await expect(canvas.getByText("Noah Dubois")).toBeVisible()
    await userEvent.selectOptions(canvas.getByRole("combobox", { name: "Rows per page" }), "10")
    await expect(args.onVisit).toHaveBeenLastCalledWith({ page: 1, perPage: 10 })
    await userEvent.click(canvas.getByRole("button", { name: "Apply response" }))
    await expect(canvas.getByText("Requested page: 1; size: 10; pages: 1")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Keep current page" }))
    await expect(args.onVisit).toHaveBeenCalledTimes(2)
  },
}
export const CurrentOverridesMetadata: Story = {
  args: { current: { page: 4, perPage: 20 } },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("Requested page: 4; size: 20; pages: 4")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Request first page" }))
    await expect(args.onVisit).toHaveBeenLastCalledWith({ page: 1, perPage: 20 })
  },
}
export const MissingResponse: Story = {
  args: { missingResponse: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Requested page: 1; size: 10; pages: 1")).toBeVisible()
  },
}
export const InvalidMetadata: Story = {
  args: {
    metadata: { total: "invalid", perPage: 0, currentPage: "invalid", lastPage: "Infinity" },
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Requested page: 1; size: 10; pages: 1")).toBeVisible()
  },
}
export const ServerSorting: Story = {
  args: { sortable: true },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Name" }))
    await expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    )
    // The adapter delegates sorting to the caller; supplied rows stay in server order.
    await expect(canvas.queryByText("Noah Dubois")).not.toBeInTheDocument()
  },
}
