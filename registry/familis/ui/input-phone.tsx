"use client"

import {
  forwardRef,
  type ComponentProps,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react"
import PhoneInput, {
  getCountryCallingCode,
  type Country,
  type Props,
  type Value,
} from "react-phone-number-input"
import { cn } from "cn"
import { Input } from "@/registry/familis/ui/input"
import { NativeSelect, NativeSelectOption } from "@/registry/familis/ui/native-select"

// The package forwards its ref to the input at runtime, but declares a class ref.
const PhoneInputWithRef = PhoneInput as unknown as ForwardRefExoticComponent<
  Props<ComponentProps<"input">> & RefAttributes<HTMLInputElement>
>

export type InputPhoneProps = Omit<
  Props<ComponentProps<"input">>,
  | "onChange"
  | "inputComponent"
  | "countrySelectComponent"
  | "countrySelectProps"
  | "containerComponent"
  | "containerComponentProps"
> & {
  /** E.164 value, or an empty string when cleared. Partial numbers are not necessarily valid. */
  onChange: (value: Value | "") => void
  countryLabel?: string
  ref?: React.Ref<HTMLInputElement>
}

type CountrySelectProps = {
  value?: Country
  onChange: (country?: Country) => void
  options: { value?: Country; label: string; divider?: boolean }[]
  disabled?: boolean
  readOnly?: boolean
  "aria-label"?: string
}

const CountrySelect = forwardRef<HTMLSelectElement, CountrySelectProps>(function CountrySelect(
  { value, onChange, options, disabled, readOnly, "aria-label": label },
  ref,
) {
  return (
    <NativeSelect
      ref={ref}
      aria-label={label ?? "Country"}
      value={value ?? ""}
      disabled={disabled || readOnly}
      onChange={(event) => onChange((event.target.value || undefined) as Country | undefined)}
    >
      {options
        .filter((option) => !option.divider)
        .map((option) => (
          <NativeSelectOption key={option.value ?? "international"} value={option.value ?? ""}>
            {option.label}
            {option.value ? ` (+${getCountryCallingCode(option.value)})` : ""}
          </NativeSelectOption>
        ))}
    </NativeSelect>
  )
})

export function InputPhone({
  className,
  onChange,
  countryLabel = "Country",
  defaultCountry = "BE",
  autoComplete = "tel",
  ref,
  ...props
}: InputPhoneProps) {
  return (
    <PhoneInputWithRef
      {...props}
      ref={ref}
      defaultCountry={defaultCountry}
      autoComplete={autoComplete}
      className={cn(
        "flex min-w-0 items-center gap-2 [&>input]:flex-1 [&_[data-slot=native-select-wrapper]]:max-w-[45%]",
        className,
      )}
      inputComponent={Input}
      countrySelectComponent={CountrySelect}
      countrySelectProps={{ "aria-label": countryLabel }}
      onChange={(value) => onChange(value ?? "")}
    />
  )
}
