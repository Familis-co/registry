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

/** Countries offered when `countries` is not provided: Benelux, neighbours and common destinations. */
export const DEFAULT_PHONE_COUNTRIES: Country[] = [
  "BE",
  "NL",
  "LU",
  "FR",
  "DE",
  "GB",
  "ES",
  "IT",
  "CH",
  "US",
]

/**
 * Converts an ISO 3166-1 alpha-2 country code into its flag emoji.
 *
 * Flags are pairs of regional indicator symbols, offset from the ASCII letters of the code.
 * Native `<option>` elements only render text, so emoji are the only way to show a flag there.
 *
 * @param {Country} [country] - The country code, or undefined for the international option.
 * @returns {string} The flag emoji, or a globe for the international option.
 */
function getFlagEmoji(country?: Country): string {
  if (!country) return "🌐"
  return String.fromCodePoint(...[...country].map((letter) => 0x1f1a5 + letter.charCodeAt(0)))
}

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

/**
 * Renders the country picker as a native select with a flag and calling code per option.
 *
 * @param {CountrySelectProps} props - Selected country, change handler and options from the phone input.
 * @param {React.ForwardedRef<HTMLSelectElement>} ref - Ref forwarded to the underlying select.
 * @returns {React.ReactElement} The country select.
 */
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
            {getFlagEmoji(option.value)} {option.label}
            {option.value ? ` (+${getCountryCallingCode(option.value)})` : ""}
          </NativeSelectOption>
        ))}
    </NativeSelect>
  )
})

/**
 * An international phone input with a flagged country select that emits E.164 values.
 *
 * Every default (`defaultCountry`, `countries`, `addInternationalOption`, `autoComplete`,
 * `countryLabel`) can be overridden through its prop.
 *
 * @param {InputPhoneProps} props - Phone input props, forwarded to `react-phone-number-input`.
 * @returns {React.ReactElement} The phone input.
 */
export function InputPhone({
  className,
  onChange,
  countryLabel = "Country",
  defaultCountry = "BE",
  countries = DEFAULT_PHONE_COUNTRIES,
  addInternationalOption = false,
  autoComplete = "tel",
  ref,
  ...props
}: InputPhoneProps) {
  return (
    <PhoneInputWithRef
      {...props}
      ref={ref}
      defaultCountry={defaultCountry}
      countries={countries}
      addInternationalOption={addInternationalOption}
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
