import { Dialog as LightboxPrimitive } from "@base-ui/react/dialog"
import { cn } from "cn"

/**
 * A full-screen, dark stage for viewing media: photos, videos, documents.
 * Built on the dialog primitive, so it traps focus, closes on Escape and
 * restores focus to whatever opened it.
 *
 * @param props - Properties forwarded to the dialog root.
 * @returns The lightbox root.
 */
function Lightbox({ ...props }: LightboxPrimitive.Root.Props) {
  return <LightboxPrimitive.Root data-slot="lightbox" {...props} />
}

/**
 * Renders the element that opens the lightbox, typically a thumbnail.
 *
 * @param props - Properties forwarded to the dialog trigger.
 * @returns The lightbox trigger.
 */
function LightboxTrigger({ ...props }: LightboxPrimitive.Trigger.Props) {
  return <LightboxPrimitive.Trigger data-slot="lightbox-trigger" {...props} />
}

/**
 * Renders an element that closes the lightbox.
 *
 * @param props - Properties forwarded to the dialog close.
 * @returns The lightbox close.
 */
function LightboxClose({ ...props }: LightboxPrimitive.Close.Props) {
  return <LightboxPrimitive.Close data-slot="lightbox-close" {...props} />
}

/**
 * Renders the lightbox content: a popup covering the whole viewport, always in
 * the dark theme so media reads the same whatever the app's theme.
 *
 * @param props - Properties forwarded to the dialog popup; `className` handles layout.
 * @returns The portalled backdrop and popup.
 */
function LightboxContent({ className, ...props }: LightboxPrimitive.Popup.Props) {
  return (
    <LightboxPrimitive.Portal data-slot="lightbox-portal">
      <LightboxPrimitive.Backdrop
        data-slot="lightbox-overlay"
        className="fixed inset-0 isolate z-50 bg-black/80 duration-150 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
      />
      <LightboxPrimitive.Popup
        data-slot="lightbox-content"
        className={cn(
          "dark fixed inset-0 z-50 flex h-dvh w-dvw bg-background text-sm text-foreground duration-150 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-98 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-98",
          className,
        )}
        {...props}
      />
    </LightboxPrimitive.Portal>
  )
}

/**
 * Renders the lightbox title, which names the dialog for assistive technology.
 *
 * @param props - Properties forwarded to the dialog title.
 * @returns The lightbox title.
 */
function LightboxTitle({ className, ...props }: LightboxPrimitive.Title.Props) {
  return (
    <LightboxPrimitive.Title
      data-slot="lightbox-title"
      className={cn("font-heading text-base leading-none font-medium", className)}
      {...props}
    />
  )
}

export { Lightbox, LightboxClose, LightboxContent, LightboxTitle, LightboxTrigger }
