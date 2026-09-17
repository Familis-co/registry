import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/familis/ui/table"

type Radius = {
  name: string
  value: string
}

/**
 * Renders a tile previewing a radius token resolved from a CSS custom property.
 *
 * @param props - Component props.
 * @param props.value - CSS custom property name of the radius token (e.g. `--radius-md`).
 */
const RadiusTile = ({ value }: Pick<Radius, "value">) => {
  const style = window.getComputedStyle(document.body)
  const radius = style.getPropertyValue(value)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="size-20 border-2 bg-card" style={{ borderRadius: radius }} />
      <p className="text-center text-xs opacity-70">{value}</p>
      <p className="text-center text-xs">{radius}</p>
    </div>
  )
}

const meta = {
  title: "Design/Radius",
  render: (args) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <span className="sr-only">Preview</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {args.radius.map(({ name, value }) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <RadiusTile value={value} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Meta<{
  radius: Radius[]
}>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    radius: [
      { name: "xs", value: "--radius-xs" },
      { name: "sm", value: "--radius-sm" },
      { name: "md", value: "--radius-md" },
      { name: "lg", value: "--radius-lg" },
      { name: "xl", value: "--radius-xl" },
      { name: "2xl", value: "--radius-2xl" },
      { name: "3xl", value: "--radius-3xl" },
      { name: "4xl", value: "--radius-4xl" },
      { name: "full", value: "--radius-full" },
    ],
  },
}
