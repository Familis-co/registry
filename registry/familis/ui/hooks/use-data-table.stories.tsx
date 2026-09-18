import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import { createColumnHelper, type PaginationState } from "@tanstack/react-table"
import { useDataTable, type DataTableFeatures } from "@/registry/familis/ui/hooks/use-data-table"
import { Button } from "@/registry/familis/ui/button"
import { Input } from "@/registry/familis/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/familis/ui/table"

const data = [{ name: "Sofia Martin" }, { name: "Amira Hassan" }, { name: "Noah Dubois" }]
const helper = createColumnHelper<DataTableFeatures, (typeof data)[number]>()
const columns = helper.columns([
  helper.accessor("name", { header: "Name", sortFn: "text", filterFn: "includesString" }),
])
const initialPagination = { pageIndex: 0, pageSize: 2 }
function Example({ controlled = false }: { controlled?: boolean }) {
  const [pagination, setPagination] = useState<PaginationState>(initialPagination)
  const table = useDataTable({
    data,
    columns,
    initialState: { pagination: initialPagination },
    ...(controlled ? { state: { pagination }, onPaginationChange: setPagination } : {}),
  })
  const column = table.getColumn("name")!
  return (
    <div className="flex flex-col gap-4">
      <Input
        type="search"
        aria-label="Filter families"
        value={String(column.getFilterValue() ?? "")}
        onChange={(event) => column.setFilterValue(event.target.value)}
      />
      <Table aria-label="Families">
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => column.toggleSorting(false)}>
                Sort names
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <table.FlexRender cell={row.getVisibleCells()[0]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p role="status">
        Page {table.state.pagination.pageIndex + 1}; {table.getRowCount()} families
      </p>
      <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        Next page
      </Button>
      <Button
        variant="outline"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous page
      </Button>
      {controlled ? <p>Controlled page index: {pagination.pageIndex}</p> : null}
    </div>
  )
}
const meta = {
  title: "UI/Hooks/Data table",
  component: Example,
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Sort names" }))
    await expect(canvas.getAllByRole("row")[1]).toHaveTextContent("Amira Hassan")
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }))
    await expect(canvas.getByRole("status")).toHaveTextContent("Page 2")
    await userEvent.type(canvas.getByRole("searchbox"), "Amira")
    await expect(canvas.getByRole("status")).toHaveTextContent("Page 1; 1 families")
    await expect(canvas.getByText("Amira Hassan")).toBeVisible()
  },
}
export const Controlled: Story = {
  args: { controlled: true },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }))
    await expect(canvas.getByText("Controlled page index: 1")).toBeVisible()
    await expect(canvas.getByText("Noah Dubois")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Previous page" }))
    await expect(canvas.getByText("Controlled page index: 0")).toBeVisible()
  },
}
