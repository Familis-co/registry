"use client"

import { useEffect, useMemo, useRef, type MouseEvent, type TouchEvent } from "react"

export type PressEvent = MouseEvent | TouchEvent

export interface LongPressOptions {
  threshold?: number
  onStart?: (event: PressEvent) => void
  onFinish?: (event: PressEvent) => void
  onCancel?: (event: PressEvent) => void
}

function isTouchEvent(event: PressEvent): event is TouchEvent {
  return "touches" in event.nativeEvent
}

function isMouseEvent(event: PressEvent): event is MouseEvent {
  return "button" in event.nativeEvent
}

export function useLongPress(
  callback: (event: PressEvent) => void,
  { threshold = 400, onStart, onFinish, onCancel }: LongPressOptions = {},
) {
  const isLongPressActive = useRef(false)
  const isPressed = useRef(false)
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const callbacks = useRef({ callback, onStart, onFinish, onCancel })

  useEffect(() => {
    callbacks.current = { callback, onStart, onFinish, onCancel }
  }, [callback, onStart, onFinish, onCancel])

  useEffect(() => {
    return () => {
      clearTimeout(timerId.current)
      timerId.current = undefined
      isLongPressActive.current = false
      isPressed.current = false
    }
  }, [threshold])

  return useMemo(() => {
    const start = (event: PressEvent) => {
      if (isPressed.current) return
      if (isMouseEvent(event)) {
        if (event.button !== 0) return
      } else if (isTouchEvent(event)) {
        if (event.touches.length !== 1) return
      } else {
        return
      }

      isPressed.current = true
      isLongPressActive.current = false
      timerId.current = setTimeout(() => {
        timerId.current = undefined
        isLongPressActive.current = true
        callbacks.current.callback(event)
      }, threshold)
      callbacks.current.onStart?.(event)
    }

    const cancel = (event: PressEvent) => {
      if (!isPressed.current) return
      const finished = isLongPressActive.current
      clearTimeout(timerId.current)
      timerId.current = undefined
      isLongPressActive.current = false
      isPressed.current = false

      if (finished) {
        callbacks.current.onFinish?.(event)
      } else {
        callbacks.current.onCancel?.(event)
      }
    }

    return {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
      onTouchStart: start,
      onTouchEnd: cancel,
      onTouchCancel: cancel,
    }
  }, [threshold])
}
