import { CopyCommand } from "@/components/copy-command"
import { Logo } from "@/registry/familis/brand/logo"
import { ConfirmationDialog } from "@/registry/familis/blocks/confirmation-dialog/confirmation-dialog"
import { EmptyState } from "@/registry/familis/blocks/empty-state/empty-state"
import { MetricCard } from "@/registry/familis/blocks/metric-card/metric-card"
import { SearchToolbar } from "@/registry/familis/blocks/search-toolbar/search-toolbar"
import { SettingsPanel } from "@/registry/familis/blocks/settings-panel/settings-panel"
import { Alert, AlertDescription, AlertTitle } from "@/registry/familis/ui/alert"
import { Badge } from "@/registry/familis/ui/badge"
import { Button, buttonVariants } from "@/registry/familis/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/familis/ui/card"
import { Separator } from "@/registry/familis/ui/separator"
import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  BookOpenIcon,
  FileJsonIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

import registry from "../../registry.json"

const storybookUrl =
  import.meta.env.VITE_STORYBOOK_URL ??
  (import.meta.env.DEV ? "http://localhost:6006" : "/storybook")

const blocks = registry.items.filter((item) => item.type === "registry:block")
const primitives = registry.items.filter((item) => item.type === "registry:ui")

export const Route = createFileRoute("/")({ component: RouteComponent })

function EmptyStatePreview() {
  const [created, setCreated] = useState(false)
  return created ? (
    <div className="flex w-full flex-col gap-4">
      <Alert>
        <AlertTitle>Item added</AlertTitle>
        <AlertDescription>Your first item is ready.</AlertDescription>
      </Alert>
      <Button variant="outline" onClick={() => setCreated(false)}>
        Reset preview
      </Button>
    </div>
  ) : (
    <EmptyState
      title="No items yet"
      description="Add your first item to get started."
      action={{ label: "Add item", onClick: () => setCreated(true) }}
    />
  )
}

function SettingsPanelPreview() {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    messages: true,
    summary: false,
  })
  return (
    <SettingsPanel
      className="w-full"
      title="Notifications"
      description="Choose how you hear from your team."
      options={[
        {
          id: "messages",
          label: "New messages",
          description: "When someone sends you a message.",
          checked: preferences.messages,
        },
        {
          id: "summary",
          label: "Weekly summary",
          description: "A digest every Monday.",
          checked: preferences.summary,
        },
      ]}
      onCheckedChange={(id, checked) =>
        setPreferences((current) => ({ ...current, [id]: checked }))
      }
    />
  )
}

const previewFamilies = ["Amira Hassan", "Sofia Martin", "Noah Dubois"]

function SearchToolbarPreview() {
  const [query, setQuery] = useState("")
  const families = previewFamilies.filter((name) =>
    name.toLowerCase().includes(query.trim().toLowerCase()),
  )
  return (
    <div className="flex w-full flex-col gap-4">
      <SearchToolbar
        label="Search families"
        placeholder="Search by name"
        query={query}
        onQueryChange={setQuery}
        resultLabel={`${families.length} ${families.length === 1 ? "family" : "families"}`}
      />
      {families.length > 0 ? (
        <ul className="flex flex-col gap-3 text-sm">
          {families.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No results found"
          description="Try another name or adjust your search."
          icon={SearchIcon}
        />
      )}
    </div>
  )
}

function ConfirmationDialogPreview() {
  const [archived, setArchived] = useState(false)
  return (
    <div className="flex flex-col items-center gap-4">
      <ConfirmationDialog
        trigger={<Button variant="outline">Archive conversation</Button>}
        title="Archive this conversation?"
        description="You can find it again in your archived conversations."
        confirmLabel="Archive"
        onConfirm={() => setArchived(true)}
      />
      {archived && (
        <p role="status" className="text-sm text-muted-foreground">
          Conversation archived.
        </p>
      )}
    </div>
  )
}

function BlockPreview({ name }: { name: string }) {
  switch (name) {
    case "empty-state":
      return <EmptyStatePreview />
    case "metric-card":
      return (
        <MetricCard
          className="w-full"
          label="Families supported"
          value="128"
          description="This month"
          trend={{ direction: "up", value: "+12%", label: "vs. last month" }}
          footer="Updated just now"
        />
      )
    case "settings-panel":
      return <SettingsPanelPreview />
    case "search-toolbar":
      return <SearchToolbarPreview />
    case "confirmation-dialog":
      return <ConfirmationDialogPreview />
    default:
      return null
  }
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <MoonIcon className="dark:hidden" aria-hidden="true" />
      <SunIcon className="hidden dark:block" aria-hidden="true" />
      <span className="sr-only">
        <span className="dark:hidden">Use dark theme</span>
        <span className="hidden dark:inline">Use light theme</span>
      </span>
    </Button>
  )
}

function BuildingBlocks() {
  return (
    <section id="blocks" aria-labelledby="blocks-title" className="flex scroll-mt-8 flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 id="blocks-title" className="text-2xl font-semibold tracking-tight">
            Building blocks
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Metrics, preferences, search and confirmations, composed from the same shared
            components. Try each preview, then install the source in your project.
          </p>
        </div>
        <Badge variant="secondary">{blocks.length} blocks</Badge>
      </div>
      <div className="grid items-start gap-6 lg:grid-cols-2">
        {blocks.map((item) => (
          <Card key={item.name} id={`block-${item.name}`}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex min-w-0 flex-col gap-6">
              <div className="flex min-h-72 min-w-0 items-center justify-center rounded-lg border bg-muted/40 p-4 sm:p-6">
                <BlockPreview name={item.name} />
              </div>
              <CopyCommand
                command={`pnpm dlx shadcn@latest add Familis-co/registry/${item.name}`}
              />
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              {storybookUrl && (
                <a
                  href={`${storybookUrl}/?path=/story/${item.meta?.storybookId}`}
                  className={buttonVariants({ variant: "outline", size: "sm" })}
                >
                  <BookOpenIcon data-icon="inline-start" /> View stories
                </a>
              )}
              <a
                href={`/r/${item.name}.json`}
                className={buttonVariants({ variant: "ghost", size: "sm" })}
                aria-label={`Open ${item.title} registry JSON`}
              >
                <FileJsonIcon data-icon="inline-start" /> Registry JSON
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

const fontSamples = [
  {
    name: "Manrope",
    role: "Headings",
    token: "font-heading",
    sample: "Familiar by design.",
    className: "font-heading text-3xl font-semibold tracking-tight",
  },
  {
    name: "Inter",
    role: "Body and interface",
    token: "font-sans",
    sample: "Clear interfaces for every family and their team.",
    className: "font-sans text-base leading-relaxed",
  },
  {
    name: "Source Serif 4",
    role: "Editorial",
    token: "font-serif",
    sample: "Every family has a story.",
    className: "font-serif text-2xl italic leading-relaxed",
  },
  {
    name: "JetBrains Mono",
    role: "Code and commands",
    token: "font-mono",
    sample: 'const family = "Familis"',
    className: "font-mono text-sm leading-relaxed break-words",
  },
]

function DesignFoundations() {
  return (
    <section id="design" aria-labelledby="design-title" className="flex scroll-mt-8 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 id="design-title" className="text-2xl font-semibold tracking-tight">
          Design foundations
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">
          The Familis blue, a shared type system and consistent spacing across every product.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {fontSamples.map((font) => (
          <Card key={font.token}>
            <CardHeader>
              <CardDescription>{font.role}</CardDescription>
              <CardTitle>{font.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`min-h-20 ${font.className}`}>{font.sample}</p>
            </CardContent>
            <CardFooter>
              <code className="text-xs text-muted-foreground">{font.token}</code>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <div
          role="img"
          aria-label="Familis blue and five chart shades"
          className="grid h-10 w-full max-w-xs grid-cols-6 overflow-hidden rounded-lg border"
        >
          <span className="bg-primary" />
          <span className="bg-chart-1" />
          <span className="bg-chart-2" />
          <span className="bg-chart-3" />
          <span className="bg-chart-4" />
          <span className="bg-chart-5" />
        </div>
        <p className="text-sm text-muted-foreground">Brand color and chart palette</p>
      </div>
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Apply the brand to an existing project</CardTitle>
          <CardDescription>
            In a project already using shadcn with Base UI, the style replaces the theme colors and
            fonts, and adds the Familis logo component.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CopyCommand command="pnpm dlx shadcn@latest add Familis-co/registry/familis" />
        </CardContent>
      </Card>
      <div className="flex flex-wrap gap-2">
        {["Logo", "Color", "Radius", "Typography", "Spacing", "Shadow", "Typeset"].map((name) =>
          storybookUrl ? (
            <a
              key={name}
              href={`${storybookUrl}/?path=/docs/design-${name.toLowerCase()}--docs`}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {name} <ArrowUpRightIcon data-icon="inline-end" />
            </a>
          ) : (
            <Badge key={name} variant="outline">
              {name}
            </Badge>
          ),
        )}
      </div>
    </section>
  )
}

function PrimitiveCatalog() {
  const [query, setQuery] = useState("")
  const search = query.trim().toLowerCase()
  const results = primitives.filter((item) =>
    `${item.title} ${item.name} ${item.description}`.toLowerCase().includes(search),
  )
  return (
    <section id="ui" aria-labelledby="ui-title" className="flex scroll-mt-8 flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h2 id="ui-title" className="text-2xl font-semibold tracking-tight">
            UI components
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Base UI primitives for your own compositions. Open a story to see its states and usage.
          </p>
        </div>
        <Badge variant="secondary">{primitives.length} components</Badge>
      </div>
      <SearchToolbar
        label="Search UI components"
        placeholder="Search by name or purpose…"
        query={query}
        onQueryChange={setQuery}
        resultLabel={`${results.length} ${results.length === 1 ? "component" : "components"}${search ? ` matching “${query.trim()}”` : " available"}`}
        className="max-w-lg"
      />
      {results.length > 0 ? (
        <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((item) => (
            <li
              key={item.name}
              className="flex min-w-0 items-center justify-between gap-2 rounded-lg border px-3 py-2"
            >
              <a
                href={
                  storybookUrl
                    ? `${storybookUrl}/?path=/story/${item.meta?.storybookId}`
                    : `/r/${item.name}.json`
                }
                className="min-w-0 text-sm font-medium underline-offset-4 hover:underline"
              >
                {item.title}
              </a>
              <a
                href={`/r/${item.name}.json`}
                aria-label={`Open ${item.title} registry JSON`}
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon-sm",
                })}
              >
                <FileJsonIcon />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No components found"
          description="Try a different name or clear your search to see every component."
          icon={SearchIcon}
          action={{ label: "Clear search", onClick: () => setQuery("") }}
        />
      )}
    </section>
  )
}

function RouteComponent() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:inline-block focus:py-3">
        Skip to content
      </a>
      <header className="flex flex-wrap items-center justify-between gap-4 py-6">
        <a href="/" aria-label="Familis Registry home">
          <Logo aria-hidden="true" />
        </a>
        <nav aria-label="Main navigation" className="flex items-center gap-2">
          <a
            href="https://github.com/Familis-co/registry#readme"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Documentation
          </a>
          <a
            href="https://github.com/Familis-co/registry"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            GitHub <ArrowUpRightIcon data-icon="inline-end" />
          </a>
          <ThemeToggle />
        </nav>
      </header>
      <Separator />
      <main id="main-content" className="flex flex-col gap-16 py-12 sm:py-16">
        <section
          className="grid items-start gap-8 md:grid-cols-[1.3fr_1fr]"
          aria-labelledby="page-title"
        >
          <div className="flex flex-col gap-5">
            <h1
              id="page-title"
              className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl"
            >
              Build once.
              <br />
              Ship across Familis.
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Reusable blocks, shared components and familiar design foundations. Preview them here,
              then make the source yours.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">Base UI</Badge>
              <Badge variant="outline">Tailwind CSS v4</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#blocks" className={buttonVariants({ size: "sm" })}>
                Browse blocks <ArrowDownIcon data-icon="inline-end" />
              </a>
              <a href="#ui" className={buttonVariants({ variant: "outline", size: "sm" })}>
                Explore {primitives.length} components
              </a>
            </div>
          </div>
          <Card id="installation">
            <CardHeader>
              <CardTitle>Start with the Familis style</CardTitle>
              <CardDescription>
                Create a TanStack Start project with the Familis colors, fonts and logo, then add
                blocks and components.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CopyCommand command="pnpm dlx shadcn@latest init --template start --base base Familis-co/registry/familis" />
            </CardContent>
            <CardFooter>
              <a
                href="https://github.com/Familis-co/registry#using-the-registry"
                className={buttonVariants({ variant: "link", size: "sm" })}
              >
                Installation guide <ArrowUpRightIcon data-icon="inline-end" />
              </a>
            </CardFooter>
          </Card>
        </section>
        <BuildingBlocks />
        <DesignFoundations />
        <PrimitiveCatalog />
      </main>
      <Separator />
      <footer className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground">
        <p>{new Date().getFullYear()} © Familis</p>
        <a href="/r/registry.json" className="underline underline-offset-4">
          View the full registry JSON
        </a>
      </footer>
    </div>
  )
}
