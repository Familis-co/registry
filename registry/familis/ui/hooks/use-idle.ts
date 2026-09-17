"use client"

import { useEffect, useState } from "react"

const ACTIVITY_EVENTS = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "wheel",
] as const

export function useIdle(ms: number = 60_000): boolean {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    let lastActivity = Date.now()
    let timeoutId: number | undefined
    const handleTimeout = () => {
      timeoutId = undefined
      const remaining = ms - (Date.now() - lastActivity)
      if (remaining > 0) {
        timeoutId = window.setTimeout(handleTimeout, remaining)
      } else {
        setIdle(true)
      }
    }

    const handleEvent = () => {
      lastActivity = Date.now()
      setIdle(false)
      // Frequent events update the deadline without creating a timer for every event.
      if (timeoutId === undefined) {
        timeoutId = window.setTimeout(handleTimeout, ms)
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) handleEvent()
    }

    timeoutId = window.setTimeout(handleTimeout, ms)
    for (const event of ACTIVITY_EVENTS) {
      window.addEventListener(event, handleEvent, { passive: true })
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      for (const event of ACTIVITY_EVENTS) {
        window.removeEventListener(event, handleEvent)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.clearTimeout(timeoutId)
    }
  }, [ms])

  return idle
}
