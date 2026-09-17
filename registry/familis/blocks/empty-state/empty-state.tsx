import { FolderPlusIcon, type LucideIcon } from "lucide-react"
import { Button } from "@/registry/familis/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/familis/ui/empty"

export interface EmptyStateProps {
  title: string
  description: string
  icon?: LucideIcon
  action?: { label: string; onClick: () => void; disabled?: boolean }
}

export function EmptyState({
  title,
  description,
  icon: Icon = FolderPlusIcon,
  action,
}: EmptyStateProps) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      {action && (
        <EmptyContent>
          <Button type="button" onClick={action.onClick} disabled={action.disabled}>
            {action.label}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
