import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor } from "storybook/test"
import { createColumnHelper } from "@tanstack/react-table"
import type { DataTableFeatures } from "@/registry/familis/blocks/data-table/data-table-features"
import { SortableDataTable } from "@/registry/familis/blocks/sortable-data-table/sortable-data-table"
const helper = createColumnHelper<DataTableFeatures, { id: string; name: string }>()
const columns = helper.columns([
  helper.accessor("name", { header: "Name", sortFn: "text", filterFn: "includesString" }),
])
const initialData = [
  { id: "amira", name: "Amira Hassan" },
  { id: "sofia", name: "Sofia Martin" },
  { id: "noah", name: "Noah Dubois" },
]
function Example({
  onDataChange,
  pageSize = 3,
}: {
  onDataChange: (data: typeof initialData) => void
  pageSize?: number
}) {
  const [data, setData] = useState(initialData)
  return (
    <SortableDataTable
      columns={columns}
      data={data}
      label="Reorder families"
      getRowId={(row) => row.id}
      pageSize={pageSize}
      filterColumn="name"
      filterLabel="Search families"
      enableSelection
      onDataChange={(next) => {
        setData(next)
        onDataChange(next)
      }}
    />
  )
}
const meta = {
  title: "UI/Blocks/Sortable data table",
  component: Example,
  args: { onDataChange: fn() },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, args, userEvent }) => {
    const handle = canvas.getByRole("button", { name: "Reorder row amira" })
    handle.focus()
    await userEvent.keyboard("[Space]")
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Space]")
    await waitFor(() =>
      expect(args.onDataChange).toHaveBeenLastCalledWith([
        initialData[1],
        initialData[0],
        initialData[2],
      ]),
    )
    await userEvent.type(canvas.getByRole("searchbox"), "Amira")
    await expect(canvas.getByRole("button", { name: "Reorder row amira" })).toBeDisabled()
  },
}
export const Cancel: Story = {
  play: async ({ canvas, args, userEvent }) => {
    canvas.getByRole("button", { name: "Reorder row amira" }).focus()
    await userEvent.keyboard("[Space][ArrowDown][Escape]")
    await expect(args.onDataChange).not.toHaveBeenCalled()
  },
}
export const Paginated: Story = { args: { pageSize: 2 } }
export const Dark: Story = { globals: { theme: "dark" } }
