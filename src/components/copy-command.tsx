import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "@/registry/familis/ui/button"

export function CopyCommand({ command }: { command: string }) {
  const [status, setStatus] = useState("Copy command")

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      setStatus("Copied")
    } catch {
      setStatus("Select and copy the command below")
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">Install with shadcn</span>
        <Button variant="ghost" size="sm" onClick={copy}>
          {status === "Copied" ? (
            <CheckIcon data-icon="inline-start" />
          ) : (
            <CopyIcon data-icon="inline-start" />
          )}{" "}
          Copy
        </Button>
      </div>
      <pre className="overflow-x-auto rounded-md border bg-muted p-3 text-xs">
        <code>{command}</code>
      </pre>
      <output className="sr-only" aria-live="polite">
        {status}
      </output>
    </div>
  )
}
