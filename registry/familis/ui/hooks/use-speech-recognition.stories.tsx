import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, waitFor } from "storybook/test"
import { Button } from "@/registry/familis/ui/button"
import {
  useSpeechRecognition,
  type SpeechRecognitionErrorCode,
  type SpeechRecognitionOptions,
} from "@/registry/familis/ui/hooks/use-speech-recognition"

/**
 * Renders dictation controls and the recognized text.
 *
 * @param props - Options forwarded to `useSpeechRecognition`.
 * @returns The example UI.
 */
function SpeechRecognitionExample(props: SpeechRecognitionOptions) {
  const { isSupported, isListening, transcript, interimTranscript, error, start, stop, reset } =
    useSpeechRecognition(props)

  if (!isSupported) {
    return <p role="status">Speech recognition is not supported in this browser.</p>
  }

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={isListening ? stop : start}>
          {isListening ? "Stop dictation" : "Start dictation"}
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
      <p role="status">{isListening ? "Listening" : "Not listening"}</p>
      <p data-testid="transcript">
        {transcript}
        {interimTranscript ? (
          <span className="text-muted-foreground"> {interimTranscript}</span>
        ) : null}
      </p>
      {error ? <p role="alert">Recognition failed: {error}</p> : null}
    </div>
  )
}

const fakeRecognitions: FakeSpeechRecognition[] = []

// Browsers cannot be driven by real speech in tests, so interaction stories use this stand-in.
class FakeSpeechRecognition extends EventTarget {
  lang = ""
  continuous = false
  interimResults = false
  private listening = false

  /** Registers the instance so play functions can emit events through it. */
  constructor() {
    super()
    fakeRecognitions.push(this)
  }

  /** Starts a session, throwing like browsers do when one is already active. */
  start() {
    if (this.listening)
      throw new DOMException("Recognition has already started.", "InvalidStateError")
    this.listening = true
    queueMicrotask(() => this.dispatchEvent(new Event("start")))
  }

  /** Ends the session after delivering pending results. */
  stop() {
    this.end()
  }

  /** Ends the session and reports an `aborted` error, as browsers do. */
  abort() {
    if (!this.listening) return
    this.emitError("aborted")
    this.end()
  }

  /**
   * Dispatches a result event.
   *
   * @param results - Transcript and finality of each result in the session.
   * @param resultIndex - Index of the first changed result.
   */
  emitResult(results: Array<[transcript: string, isFinal: boolean]>, resultIndex = 0) {
    const list = results.map(([transcript, isFinal]) =>
      Object.assign([{ transcript }], { isFinal }),
    )
    this.dispatchEvent(Object.assign(new Event("result"), { resultIndex, results: list }))
  }

  /**
   * Dispatches an error event.
   *
   * @param error - The error code to report.
   */
  emitError(error: SpeechRecognitionErrorCode) {
    this.dispatchEvent(Object.assign(new Event("error"), { error }))
  }

  /** Dispatches `end` once per session. */
  private end() {
    if (!this.listening) return
    this.listening = false
    this.dispatchEvent(new Event("end"))
  }
}

/**
 * Replaces the browser recognizers for one story.
 *
 * @param Recognition - The constructor to expose, or `undefined` to simulate no support.
 * @returns A cleanup function restoring the original properties.
 */
function mockRecognition(Recognition: typeof FakeSpeechRecognition | undefined) {
  const names = ["SpeechRecognition", "webkitSpeechRecognition"] as const
  const originals = names.map((name) => Object.getOwnPropertyDescriptor(window, name))
  for (const name of names) {
    Object.defineProperty(window, name, {
      configurable: true,
      writable: true,
      value: Recognition,
    })
  }
  return () => {
    fakeRecognitions.length = 0
    names.forEach((name, index) => {
      const original = originals[index]
      if (original) Object.defineProperty(window, name, original)
      else Reflect.deleteProperty(window, name)
    })
  }
}

/**
 * Returns the recognizer created by the rendered example.
 *
 * @returns The active fake recognizer.
 */
function getFakeRecognition() {
  const recognition = fakeRecognitions.at(-1)
  if (!recognition) throw new Error("The example did not create a recognizer.")
  return recognition
}

const meta = {
  title: "UI/Hooks/Speech recognition",
  component: SpeechRecognitionExample,
  args: { lang: "en-US", continuous: true, interimResults: true },
  parameters: { a11y: { test: "error" } },
} satisfies Meta<typeof SpeechRecognitionExample>
export default meta
type Story = StoryObj<typeof meta>

// Uses the browser's recognizer; allow microphone access to try it.
export const Default: Story = {
  args: {
    lang: "en-US",
  },
}

export const Transcription: Story = {
  args: { onResult: fn() },
  beforeEach: () => mockRecognition(FakeSpeechRecognition),
  play: async ({ args, canvas, userEvent }) => {
    const status = canvas.getByRole("status")
    const transcript = canvas.getByTestId("transcript")
    await userEvent.click(canvas.getByRole("button", { name: "Start dictation" }))
    await waitFor(() => expect(status).toHaveTextContent("Listening"))

    const recognition = getFakeRecognition()
    await expect(recognition.lang).toBe("en-US")
    await expect(recognition.continuous).toBe(true)
    await expect(recognition.interimResults).toBe(true)

    recognition.emitResult([["hello wor", false]])
    await waitFor(() => expect(transcript).toHaveTextContent("hello wor"))
    recognition.emitResult([[" hello world", true]])
    await waitFor(() => expect(transcript).toHaveTextContent(/^hello world$/))
    // Earlier final results stay in the list and must not be appended twice.
    recognition.emitResult(
      [
        [" hello world", true],
        [" again", true],
      ],
      1,
    )
    await waitFor(() => expect(transcript).toHaveTextContent(/^hello world again$/))
    await expect(args.onResult).toHaveBeenNthCalledWith(1, "hello world")
    await expect(args.onResult).toHaveBeenNthCalledWith(2, "again")

    await userEvent.click(canvas.getByRole("button", { name: "Stop dictation" }))
    await waitFor(() => expect(status).toHaveTextContent("Not listening"))
    await userEvent.click(canvas.getByRole("button", { name: "Reset" }))
    await waitFor(() => expect(transcript).toBeEmptyDOMElement())
  },
}

export const Errors: Story = {
  args: { onError: fn() },
  beforeEach: () => mockRecognition(FakeSpeechRecognition),
  play: async ({ args, canvas, userEvent }) => {
    const status = canvas.getByRole("status")
    await userEvent.click(canvas.getByRole("button", { name: "Start dictation" }))
    await waitFor(() => expect(status).toHaveTextContent("Listening"))

    // Manual aborts end the session without surfacing an error.
    getFakeRecognition().abort()
    await waitFor(() => expect(status).toHaveTextContent("Not listening"))
    await expect(canvas.queryByRole("alert")).not.toBeInTheDocument()

    await userEvent.click(canvas.getByRole("button", { name: "Start dictation" }))
    await waitFor(() => expect(status).toHaveTextContent("Listening"))
    getFakeRecognition().emitError("not-allowed")
    await expect(await canvas.findByRole("alert")).toHaveTextContent("not-allowed")
    await expect(args.onError).toHaveBeenCalledWith("not-allowed")
    await expect(args.onError).toHaveBeenCalledTimes(1)

    await userEvent.click(canvas.getByRole("button", { name: "Stop dictation" }))
    await userEvent.click(canvas.getByRole("button", { name: "Start dictation" }))
    await waitFor(() => expect(canvas.queryByRole("alert")).not.toBeInTheDocument())
  },
}

export const Unsupported: Story = {
  beforeEach: () => mockRecognition(undefined),
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("status")).toHaveTextContent("not supported")
    await expect(canvas.queryByRole("button")).not.toBeInTheDocument()
  },
}
