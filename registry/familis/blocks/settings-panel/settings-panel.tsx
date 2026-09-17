"use client"

import { Fragment, useId, type ComponentProps, type ReactNode } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/familis/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/familis/ui/field"
import { Switch } from "@/registry/familis/ui/switch"

export interface PreferenceOption {
  /** A unique, stable identifier within this panel. */
  id: string
  label: string
  description?: string
  checked: boolean
  disabled?: boolean
}

export interface SettingsPanelProps extends Omit<
  ComponentProps<typeof Card>,
  "title" | "children"
> {
  title: string
  description?: string
  options: readonly PreferenceOption[]
  onCheckedChange: (id: string, checked: boolean) => void
  disabled?: boolean
  footer?: ReactNode
}

/** Controlled boolean preferences. Persist changes or render a save action in the consuming app. */
export function SettingsPanel({
  title,
  description,
  options,
  onCheckedChange,
  disabled = false,
  footer,
  ...props
}: SettingsPanelProps) {
  const panelId = useId()

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <FieldSet disabled={disabled}>
          <FieldLegend className="sr-only">{title}</FieldLegend>
          <FieldGroup>
            {options.map((option, index) => {
              const id = `${panelId}-${option.id}`
              const optionDisabled = disabled || option.disabled
              return (
                <Fragment key={option.id}>
                  {index > 0 && <FieldSeparator />}
                  <Field orientation="horizontal" data-disabled={optionDisabled || undefined}>
                    <FieldContent>
                      <FieldLabel htmlFor={id}>{option.label}</FieldLabel>
                      {option.description && (
                        <FieldDescription id={`${id}-description`}>
                          {option.description}
                        </FieldDescription>
                      )}
                    </FieldContent>
                    <Switch
                      id={id}
                      name={option.id}
                      checked={option.checked}
                      disabled={optionDisabled}
                      aria-describedby={option.description ? `${id}-description` : undefined}
                      onCheckedChange={(checked) => onCheckedChange(option.id, checked)}
                    />
                  </Field>
                </Fragment>
              )
            })}
          </FieldGroup>
        </FieldSet>
      </CardContent>
      {footer != null && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
