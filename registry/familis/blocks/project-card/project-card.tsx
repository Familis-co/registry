import { ArrowUpRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export interface ProjectCardProps {
  title: string
  description: string
  href: string
  status?: "active" | "draft" | "archived"
  detail?: string
  linkLabel?: string
}

const statuses = {
  active: { label: "Active", variant: "default" },
  draft: { label: "Draft", variant: "secondary" },
  archived: { label: "Archived", variant: "outline" },
} as const

export function ProjectCard({
  title,
  description,
  href,
  status = "active",
  detail,
  linkLabel = "View project",
}: ProjectCardProps) {
  const currentStatus = statuses[status]

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{title}</CardTitle>
          <Badge variant={currentStatus.variant}>{currentStatus.label}</Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {detail ?? "Everything your team needs, in one place."}
        </p>
      </CardContent>
      <CardFooter>
        <a
          href={href}
          aria-label={`${linkLabel}: ${title}`}
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          {linkLabel}
          <ArrowUpRightIcon data-icon="inline-end" />
        </a>
      </CardFooter>
    </Card>
  )
}
