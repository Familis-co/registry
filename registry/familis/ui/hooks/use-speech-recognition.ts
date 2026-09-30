"use client"

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"

export type SpeechRecognitionErrorCode =
  | "aborted"
  | "audio-capture"
  | "language-not-supported"
  | "network"
  | "no-speech"
  | "not-allowed"
  | "service-not-allowed"

export interface SpeechRecognitionOptions {
  /** BCP 47 language tag. Defaults to the document language. */
  lang?: string
  /** Keep listening after the first final result until `stop` is called. */
  continuous?: boolean
  /** Expose partial results through `interimTranscript` while the user speaks. */
  interimResults?: boolean
  /** Called with each final phrase, for example to append it to a form field. */
  onResult?: (transcript: string) => void
  /** Called when recognition fails. Manual aborts are not reported. */
  onError?: (error: SpeechRecognitionErrorCode) => void
}

export interface SpeechRecognitionState {
  isSupported: boolean
  isListening: boolean
  /** Final phrases recognized since the last reset, separated by spaces. */
  transcript: string
  /** The phrase still being recognized; empty unless `interimResults` is enabled. */
  interimTranscript: string
  error: SpeechRecognitionErrorCode | null
  start: () => void
  stop: () => void
  abort: () => void
  reset: () => void
}

// TypeScript's DOM library omits the recognizer itself, so the hook declares the subset it uses.
interface RecognitionAlternative {
  transcript: string
}

interface RecognitionResult extends ArrayLike<RecognitionAlternative> {
  isFinal: boolean
}

interface RecognitionResultEvent extends Event {
  resultIndex: number
  results: ArrayLike<RecognitionResult>
}

interface RecognitionErrorEvent extends Event {
  error: SpeechRecognitionErrorCode
}

interface Recognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
}

type RecognitionConstructor = new () => Recognition

/**
 * Resolves the standard or WebKit-prefixed recognizer exposed by the browser.
 *
 * @returns The recognizer constructor, or `undefined` when the browser has none.
 */
function getRecognitionConstructor(): RecognitionConstructor | undefined {
  const scope = window as Window & {
    SpeechRecognition?: RecognitionConstructor
    webkitSpeechRecognition?: RecognitionConstructor
  }
  return scope.SpeechRecognition ?? scope.webkitSpeechRecognition
}

/**
 * Support never changes during a page's lifetime, so there is nothing to subscribe to.
 *
 * @returns A no-op unsubscribe function.
 */
const subscribe = () => () => {}

/**
 * Reads support on the client after hydration.
 *
 * @returns Whether the browser exposes a speech recognizer.
 */
const getSnapshot = () => getRecognitionConstructor() !== undefined

/**
 * Reports no support on the server so the first client render matches the markup.
 *
 * @returns Always `false`.
 */
const getServerSnapshot = () => false

/**
 * Transcribes microphone input with the browser's Web Speech API.
 *
 * @param options - Recognition settings and callbacks. Setting changes apply on the next `start`.
 * @param options.lang - BCP 47 language tag. Defaults to the document language.
 * @param options.continuous - Keep listening after the first final result. Defaults to `false`.
 * @param options.interimResults - Expose partial results while the user speaks. Defaults to `false`.
 * @param options.onResult - Called with each final phrase.
 * @param options.onError - Called when recognition fails, except for manual aborts.
 * @returns Support and listening flags, transcripts, the latest error, and session controls.
 */
export function useSpeechRecognition({
  lang = "",
  continuous = false,
  interimResults = false,
  onResult,
  onError,
}: SpeechRecognitionOptions = {}): SpeechRecognitionState {
  const isSupported = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const recognitionRef = useRef<Recognition | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [interimTranscript, setInterimTranscript] = useState("")
  const [error, setError] = useState<SpeechRecognitionErrorCode | null>(null)

  const handleResult = useEffectEvent((event: RecognitionResultEvent) => {
    let finalText = ""
    let interimText = ""
    // Results before resultIndex are final and were already appended by an earlier event.
    for (let index = event.resultIndex; index < event.results.length; index++) {
      const result = event.results[index]
      if (result.isFinal) finalText += result[0].transcript
      else interimText += result[0].transcript
    }

    setInterimTranscript(interimText.trim())
    const phrase = finalText.trim()
    if (!phrase) return
    setTranscript((previous) => (previous ? `${previous} ${phrase}` : phrase))
    onResult?.(phrase)
  })

  const handleError = useEffectEvent((event: RecognitionErrorEvent) => {
    if (event.error === "aborted") return
    setError(event.error)
    onError?.(event.error)
  })

  useEffect(() => {
    const Recognition = isSupported ? getRecognitionConstructor() : undefined
    if (!Recognition) return

    const recognition = new Recognition()
    const onStart = () => setIsListening(true)
    const onEnd = () => {
      setIsListening(false)
      setInterimTranscript("")
    }
    const onResultEvent = (event: Event) => handleResult(event as RecognitionResultEvent)
    const onErrorEvent = (event: Event) => handleError(event as RecognitionErrorEvent)

    recognition.addEventListener("start", onStart)
    recognition.addEventListener("end", onEnd)
    recognition.addEventListener("result", onResultEvent)
    recognition.addEventListener("error", onErrorEvent)
    recognitionRef.current = recognition

    return () => {
      recognitionRef.current = null
      // Remove listeners first so the abort does not update an unmounted component.
      recognition.removeEventListener("start", onStart)
      recognition.removeEventListener("end", onEnd)
      recognition.removeEventListener("result", onResultEvent)
      recognition.removeEventListener("error", onErrorEvent)
      recognition.abort()
      setIsListening(false)
    }
  }, [isSupported])

  const start = useCallback(() => {
    const recognition = recognitionRef.current
    if (!recognition) return
    recognition.lang = lang
    recognition.continuous = continuous
    recognition.interimResults = interimResults
    setError(null)
    try {
      recognition.start()
    } catch (startError) {
      // Starting an active session throws; treat repeated starts as a no-op.
      if (!(startError instanceof DOMException && startError.name === "InvalidStateError")) {
        throw startError
      }
    }
  }, [lang, continuous, interimResults])

  const stop = useCallback(() => recognitionRef.current?.stop(), [])
  const abort = useCallback(() => recognitionRef.current?.abort(), [])

  const reset = useCallback(() => {
    setTranscript("")
    setInterimTranscript("")
    setError(null)
  }, [])

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    error,
    start,
    stop,
    abort,
    reset,
  }
}
