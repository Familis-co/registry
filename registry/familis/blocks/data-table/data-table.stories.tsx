import { useDataTable } from "@/registry/familis/ui/hooks/use-data-table"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/registry/familis/ui/dialog"
import { Input } from "@/registry/familis/ui/input"
import { Badge } from "@/registry/familis/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/familis/ui/tabs"
import { useState, useMemo } from "react"
import { DataTableToolbar } from "@/registry/familis/blocks/data-table/data-table-toolbar"
import { DataTableColumnHeader } from "@/registry/familis/blocks/data-table/data-table-column-header"
import { Button } from "@/registry/familis/ui/button"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, within } from "storybook/test"
import { createColumnHelper } from "@tanstack/react-table"
import { DataTable, DataTableView } from "@/registry/familis/blocks/data-table/data-table"
import type { DataTableFeatures } from "@/registry/familis/ui/hooks/use-data-table"

const helper = createColumnHelper<DataTableFeatures, { id: string; name: string; email: string }>()
const columns = helper.columns([
  helper.accessor("name", { header: "Name", sortFn: "text", filterFn: "includesString" }),
  helper.accessor("email", { header: "Email", sortFn: "text" }),
])
const data = [
  { id: "amira", name: "Amira Hassan", email: "amira@example.com" },
  { id: "sofia", name: "Sofia Martin", email: "sofia@example.com" },
  { id: "noah", name: "Noah Dubois", email: "noah@example.com" },
]
function Example(args: {
  loading?: boolean
  empty?: boolean
  enableSelection?: boolean
  onSelectionChange?: (selection: Record<string, boolean>) => void
}) {
  return (
    <DataTable
      columns={columns}
      data={args.empty ? [] : data}
      label="Families"
      filterColumn="name"
      filterLabel="Search families"
      pageSize={2}
      getRowId={(row) => row.id}
      {...args}
    />
  )
}
const meta = {
  title: "UI/Blocks/Data table",
  component: Example,
  args: { enableSelection: true, onSelectionChange: fn() },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof Example>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  play: async ({ canvas, userEvent, args }) => {
    await expect(canvas.getByRole("button", { name: "Previous" })).toBeDisabled()
    await userEvent.click(canvas.getByRole("checkbox", { name: "Select row amira" }))
    await expect(args.onSelectionChange).toHaveBeenLastCalledWith({ amira: true })
    await userEvent.click(canvas.getByRole("button", { name: "Next" }))
    await expect(canvas.getByText("Noah Dubois")).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Next" })).toBeDisabled()
    await userEvent.type(canvas.getByRole("searchbox"), "Sofia")
    await expect(canvas.getByText("Sofia Martin")).toBeVisible()
    await expect(canvas.queryByText("Noah Dubois")).not.toBeInTheDocument()
    await userEvent.clear(canvas.getByRole("searchbox"))
    await userEvent.click(canvas.getByRole("button", { name: "Name" }))
    await expect(canvas.getByRole("columnheader", { name: "Name" })).toHaveAttribute(
      "aria-sort",
      "ascending",
    )
    await expect(within(canvas.getAllByRole("row")[2]).getByText("Noah Dubois")).toBeVisible()
    await userEvent.click(canvas.getByRole("button", { name: "Columns" }))
    const menu = await within(document.body).findByRole("menu")
    await userEvent.click(within(menu).getByRole("menuitemcheckbox", { name: "Email" }))
    await userEvent.keyboard("{Escape}")
    await expect(canvas.queryByRole("columnheader", { name: "Email" })).not.toBeInTheDocument()
    await userEvent.type(canvas.getByRole("searchbox"), "unknown")
    await expect(canvas.getByText("No results found.")).toBeVisible()
  },
}
export const Empty: Story = { args: { empty: true } }
export const Loading: Story = { args: { loading: true } }
export const WithoutSelection: Story = { args: { enableSelection: false } }
export const Dark: Story = { globals: { theme: "dark" } }

const composedColumns = helper.columns([
  helper.accessor("name", {
    header: ({ column }) => <DataTableColumnHeader column={column}>Name</DataTableColumnHeader>,
    sortFn: "text",
    filterFn: "includesString",
  }),
  helper.accessor("email", { header: "Email", sortFn: "text" }),
  helper.display({
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => (
      <Button variant="outline" size="sm" onClick={() => row.toggleSelected()}>
        Select {row.original.name}
      </Button>
    ),
  }),
])
function ComposedExample() {
  const table = useDataTable({
    columns: composedColumns,
    data,
    getRowId: (row) => row.id,
    initialState: { pagination: { pageSize: 2, pageIndex: 0 } },
  })
  return (
    <DataTableView
      table={table}
      label="Families"
      enableSelection
      toolbar={
        <DataTableToolbar table={table} filterColumn="name" filterLabel="Search families">
          <Button variant="outline" onClick={() => table.resetColumnFilters()}>
            Reset filters
          </Button>
        </DataTableToolbar>
      }
    />
  )
}
export const Composed: Story = {
  render: () => <ComposedExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Select Amira Hassan" }))
    await expect(canvas.getByRole("checkbox", { name: "Select row amira" })).toBeChecked()
    await userEvent.type(canvas.getByRole("searchbox"), "Sofia")
    await userEvent.click(canvas.getByRole("button", { name: "Reset filters" }))
    await expect(canvas.getByRole("searchbox")).toHaveValue("")
    await expect(canvas.getByRole("button", { name: "Name" })).toBeVisible()
  },
}
function ServerPaginationExample() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 2 })
  // The same state can drive a query key; only the requested page is supplied to the table.
  const table = useDataTable({
    columns,
    data: data.slice(
      pagination.pageIndex * pagination.pageSize,
      (pagination.pageIndex + 1) * pagination.pageSize,
    ),
    manualPagination: true,
    rowCount: data.length,
    state: { pagination },
    onPaginationChange: setPagination,
  })
  return <DataTableView table={table} label="Server-paginated families" toolbar={null} />
}
export const ServerPagination: Story = {
  render: () => <ServerPaginationExample />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Next" }))
    await expect(canvas.getByText("Noah Dubois")).toBeVisible()
    await expect(canvas.queryByText("Amira Hassan")).not.toBeInTheDocument()
  },
}

function RichExample() {
  const [rows, setRows] = useState(data)
  const richColumns = useMemo(
    () =>
      helper.columns([
        helper.accessor("name", {
          header: "Name",
          sortFn: "text",
          filterFn: "includesString",
          cell: ({ row }) => (
            <Dialog>
              <DialogTrigger render={<Button variant="link" />}>{row.original.name}</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{row.original.name}</DialogTitle>
                  <DialogDescription>{row.original.email}</DialogDescription>
                </DialogHeader>
                <Badge variant="secondary">Supported family</Badge>
              </DialogContent>
            </Dialog>
          ),
        }),
        helper.accessor("email", {
          header: "Email",
          sortFn: "text",
          cell: ({ row }) => (
            <Input
              aria-label={`Email for ${row.original.name}`}
              type="email"
              value={row.original.email}
              onChange={(event) =>
                setRows((current) =>
                  current.map((item) =>
                    item.id === row.id ? { ...item, email: event.target.value } : item,
                  ),
                )
              }
            />
          ),
        }),
      ]),
    [],
  )
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All families</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <DataTable
          columns={richColumns}
          data={rows}
          label="Families"
          getRowId={(row) => row.id}
          enableSelection
          toolbar={(table) => (
            <DataTableToolbar table={table} filterColumn="name" filterLabel="Search families">
              <Button variant="outline" onClick={() => table.toggleAllPageRowsSelected(true)}>
                Select page
              </Button>
            </DataTableToolbar>
          )}
        />
      </TabsContent>
      <TabsContent value="overview">
        <p>{rows.length} supported families</p>
      </TabsContent>
    </Tabs>
  )
}
export const EditableCellsAndDetails: Story = {
  render: () => <RichExample />,
  play: async ({ canvas, userEvent }) => {
    const email = canvas.getByRole("textbox", { name: "Email for Amira Hassan" })
    await userEvent.clear(email)
    await userEvent.type(email, "new@example.com")
    await expect(email).toHaveValue("new@example.com")
    await userEvent.click(canvas.getByRole("button", { name: "Amira Hassan" }))
    await expect(within(document.body).getByRole("dialog")).toHaveTextContent("new@example.com")
    await userEvent.keyboard("{Escape}")
    await userEvent.click(canvas.getByRole("tab", { name: "Overview" }))
    await expect(canvas.getByText("3 supported families")).toBeVisible()
  },
}
