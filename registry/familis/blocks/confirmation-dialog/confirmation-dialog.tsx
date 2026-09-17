"use client"

import { useRef, useState, type ReactElement } from "react"
import { Alert, AlertDescription } from "@/registry/familis/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/familis/ui/alert-dialog"
import { Spinner } from "@/registry/familis/ui/spinner"

export interface ConfirmationDialogProps {
  trigger: ReactElement
  title: string
  description: string
  onConfirm: () => void | Promise<void>
  confirmLabel?: string
  cancelLabel?: string
  pendingLabel?: string
  errorMessage?: string
  variant?: "default" | "destructive"
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/** Resolves before closing; failed actions keep the dialog open so the user can retry. */
export function ConfirmationDialog({
  trigger,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  pendingLabel = "Confirming…",
  errorMessage = "Could not complete the action. Please try again.",
  variant = "default",
  open,
  defaultOpen = false,
  onOpenChange,
}: ConfirmationDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [pending, setPending] = useState(false)
  const [failed, setFailed] = useState(false)
  const pendingRef = useRef(false)

  function changeOpen(nextOpen: boolean) {
    setInternalOpen(nextOpen)
    setFailed(false)
    onOpenChange?.(nextOpen)
  }

  async function confirm() {
    if (pendingRef.current) return
    pendingRef.current = true
    setPending(true)
    setFailed(false)
    try {
      await onConfirm()
      pendingRef.current = false
      changeOpen(false)
    } catch {
      setFailed(true)
    } finally {
      pendingRef.current = false
      setPending(false)
    }
  }

  return (
    <AlertDialog
      open={open ?? internalOpen}
      onOpenChange={(nextOpen, details) => {
        if (pendingRef.current) {
          details.cancel()
          return
        }
        changeOpen(nextOpen)
      }}
    >
      <AlertDialogTrigger render={trigger} />
      <AlertDialogContent aria-busy={pending}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {failed && (
          <Alert variant="destructive">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={pending}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction type="button" variant={variant} disabled={pending} onClick={confirm}>
            {pending && <Spinner data-icon="inline-start" aria-hidden="true" />}
            {pending ? pendingLabel : confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
