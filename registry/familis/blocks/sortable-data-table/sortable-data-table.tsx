"use client"

import { useId } from "react"
import type { Row, RowData, ReactTable } from "@tanstack/react-table"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  useSortable,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import { CSS } from "@dnd-kit/utilities"
import { GripVerticalIcon } from "lucide-react"
import {
  DataTableView,
  useDataTable,
  type DataTableProps,
} from "@/registry/familis/blocks/data-table/data-table"
import type { DataTableFeatures } from "@/registry/familis/blocks/data-table/data-table-features"
import { DataTableRow } from "@/registry/familis/blocks/data-table/data-table-content"
import { Button } from "@/registry/familis/ui/button"

export type SortableDataTableProps<TData extends RowData> = Omit<
  DataTableProps<TData>,
  "getRowId" | "onSelectionChange" | "renderRow" | "wrapRows" | "leadingHeader"
> & {
  getRowId: (row: TData) => string
  /** The parent owns the reordered data and can persist it. */
  onDataChange: (data: TData[]) => void
}

export function SortableDataTableRow<TData extends RowData>({
  row,
  table,
  disabled,
  enableSelection,
}: {
  row: Row<DataTableFeatures, TData>
  table: ReactTable<DataTableFeatures, TData>
  disabled: boolean
  enableSelection?: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id, disabled })
  return (
    <DataTableRow
      row={row}
      table={table}
      enableSelection={enableSelection}
      ref={setNodeRef}
      data-dragging={isDragging}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      leadingCell={
        <Button
          {...attributes}
          {...listeners}
          ref={setActivatorNodeRef}
          variant="ghost"
          size="icon-sm"
          disabled={disabled}
          aria-label={`Reorder row ${row.id}`}
        >
          <GripVerticalIcon aria-hidden="true" />
        </Button>
      }
    />
  )
}

/** Optional drag-and-drop composition. Reordering applies to the visible page in source order. */
export function SortableDataTable<TData extends RowData>({
  data,
  columns,
  onDataChange,
  getRowId,
  pageSize = 10,
  enableSelection = false,
  loading = false,
  ...viewProps
}: SortableDataTableProps<TData>) {
  const id = useId()
  const table = useDataTable({
    data,
    columns,
    getRowId,
    enableRowSelection: enableSelection,
    initialState: { pagination: { pageIndex: 0, pageSize: Math.max(1, pageSize) } },
  })
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )
  const disabled = loading || table.state.sorting.length > 0 || table.state.columnFilters.length > 0
  function onDragEnd({ active, over }: DragEndEvent) {
    if (disabled || !over || active.id === over.id) return
    const from = data.findIndex((row) => getRowId(row) === active.id)
    const to = data.findIndex((row) => getRowId(row) === over.id)
    if (from < 0 || to < 0) return
    onDataChange(arrayMove(data, from, to))
  }
  return (
    <DndContext
      id={id}
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      <div className="flex flex-col gap-2">
        {disabled && !loading ? (
          <p role="status" className="text-sm text-muted-foreground">
            Clear sorting and filters to reorder rows.
          </p>
        ) : null}
        <DataTableView
          {...viewProps}
          table={table}
          loading={loading}
          enableSelection={enableSelection}
          leadingHeader={<span className="sr-only">Reorder</span>}
          renderRow={(row) => (
            <SortableDataTableRow
              key={row.id}
              row={row}
              table={table}
              disabled={disabled}
              enableSelection={enableSelection}
            />
          )}
          wrapRows={(rows) => (
            <SortableContext
              items={table.getRowModel().rows.map((row) => row.id)}
              strategy={verticalListSortingStrategy}
            >
              {rows}
            </SortableContext>
          )}
        />
      </div>
    </DndContext>
  )
}
