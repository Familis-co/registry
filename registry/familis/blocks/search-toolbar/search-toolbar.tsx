"use client"

import { useId, useRef, type ComponentProps, type ReactNode } from "react"
import { SearchIcon, XIcon } from "lucide-react"
import { cn } from "cn"
import { Field, FieldGroup, FieldLabel } from "@/registry/familis/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/familis/ui/input-group"
import { Spinner } from "@/registry/familis/ui/spinner"

export interface SearchToolbarProps extends Omit<ComponentProps<"div">, "children" | "onChange"> {
  query: string
  onQueryChange: (query: string) => void
  label?: string
  placeholder?: string
  clearLabel?: string
  resultLabel?: string
  loading?: boolean
  disabled?: boolean
  actions?: ReactNode
}

/** Controlled search with a clear action. Filtering, debouncing and result labels belong to the caller. */
export function SearchToolbar({
  query,
  onQueryChange,
  label = "Search",
  placeholder = "Search…",
  clearLabel = "Clear search",
  resultLabel,
  loading = false,
  disabled = false,
  actions,
  className,
  ...props
}: SearchToolbarProps) {
  const id = useId()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={cn("flex w-full flex-wrap items-center gap-3", className)} {...props}>
      <FieldGroup className="min-w-0 flex-1 basis-48">
        <Field data-disabled={disabled || undefined}>
          <FieldLabel htmlFor={id} className="sr-only">
            {label}
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              ref={inputRef}
              id={id}
              type="search"
              value={query}
              placeholder={placeholder}
              disabled={disabled}
              aria-describedby={resultLabel !== undefined ? `${id}-results` : undefined}
              aria-busy={loading}
              onChange={(event) => onQueryChange(event.currentTarget.value)}
            />
            <InputGroupAddon>
              {loading ? <Spinner aria-hidden="true" /> : <SearchIcon aria-hidden="true" />}
            </InputGroupAddon>
            {query.length > 0 && (
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-xs"
                  aria-label={clearLabel}
                  disabled={disabled}
                  onClick={() => {
                    onQueryChange("")
                    inputRef.current?.focus()
                  }}
                >
                  <XIcon aria-hidden="true" />
                </InputGroupButton>
              </InputGroupAddon>
            )}
          </InputGroup>
        </Field>
      </FieldGroup>
      {actions}
      {resultLabel !== undefined && (
        <p id={`${id}-results`} role="status" className="w-full text-sm text-muted-foreground">
          {resultLabel}
        </p>
      )}
    </div>
  )
}
