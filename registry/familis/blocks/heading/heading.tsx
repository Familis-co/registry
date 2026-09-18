import { cn } from "cn"
import type { ComponentProps, ReactNode } from "react"

export type HeadingProps = Omit<ComponentProps<"header">, "title" | "children"> & {
  title: string
  description?: string
  variant?: "default" | "small"
  children?: ReactNode
}

/** Default titles a page (h1); small titles a section (h2). Parent layout owns spacing. */
export function Heading({
  title,
  description,
  variant = "default",
  children,
  className,
  ...props
}: HeadingProps) {
  const Title = variant === "default" ? "h1" : "h2"
  return (
    <header
      {...props}
      className={cn("flex flex-wrap items-start justify-between gap-4", className)}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Title
          className={cn(
            "truncate",
            variant === "small" ? "text-base font-medium" : "text-xl font-semibold tracking-tight",
          )}
        >
          {title}
        </Title>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-2">{children}</div> : null}
    </header>
  )
}
