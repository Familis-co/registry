import type { ComponentProps, ReactNode } from "react"
import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"
import { Badge } from "@/registry/familis/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/familis/ui/card"

export interface MetricCardProps extends Omit<ComponentProps<typeof Card>, "children"> {
  label: string
  value: ReactNode
  description?: string
  trend?: {
    direction: "up" | "down" | "neutral"
    value: string
    label: string
  }
  footer?: ReactNode
}

/** A formatted metric with an optional comparison. Values and labels are localized by the caller. */
export function MetricCard({
  label,
  value,
  description,
  trend,
  footer,
  ...props
}: MetricCardProps) {
  const TrendIcon =
    trend?.direction === "up"
      ? TrendingUpIcon
      : trend?.direction === "down"
        ? TrendingDownIcon
        : MinusIcon

  return (
    <Card role="group" aria-label={label} {...props}>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-4xl font-semibold tracking-tight tabular-nums">{value}</p>
        {trend && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">
              <TrendIcon data-icon="inline-start" aria-hidden="true" />
              {trend.value}
            </Badge>
            <span className="text-sm text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
      {footer != null && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
