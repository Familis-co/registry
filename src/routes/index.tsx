import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { ArrowUpRightIcon, BookOpenIcon, MoonIcon, SunIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CopyCommand } from "@/components/copy-command"
import { EmptyState } from "@/registry/familis/blocks/empty-state/empty-state"
import { ProjectCard } from "@/registry/familis/blocks/project-card/project-card"
import registry from "../../registry.json"

const storybookUrl =
  import.meta.env.VITE_STORYBOOK_URL ?? (import.meta.env.DEV ? "http://localhost:6006" : undefined)

const blocks = registry.items.filter((item) => item.type === "registry:block")
const primitives = registry.items.filter((item) => item.type === "registry:ui")

export const Route = createFileRoute("/")({ component: RouteComponent })

function RouteComponent() {
  const [dark, setDark] = useState(false)
  const [created, setCreated] = useState(false)

  function toggleTheme() {
    document.documentElement.classList.toggle("dark", !dark)
    setDark(!dark)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 py-6">
        <a
          href="/"
          className="flex items-center gap-3 font-semibold"
          aria-label="Familis Registry home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            f.
          </span>
          Familis <span className="font-normal text-muted-foreground">/ registry</span>
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
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </Button>
        </nav>
      </header>
      <Separator />
      <main className="flex flex-col gap-12 py-12 sm:py-16">
        <section
          className="grid items-start gap-8 md:grid-cols-[1.3fr_1fr]"
          aria-labelledby="page-title"
        >
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Familis design system</Badge>
              <span className="text-xs text-muted-foreground">v0.1.0</span>
            </div>
            <h1
              id="page-title"
              className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl"
            >
              Build once.
              <br />
              Ship across Familis.
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Shared components for the products we build together. Preview a building block, copy
              the command, and make it yours.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">TanStack Start</Badge>
              <Badge variant="outline">Nitro</Badge>
              <Badge variant="outline">shadcn / Base UI</Badge>
            </div>
          </div>
          <Card id="installation">
            <CardHeader>
              <CardTitle>Start with your next project</CardTitle>
              <CardDescription>
                Install directly from our public GitHub registry into a React project initialized
                with shadcn.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CopyCommand command="pnpm dlx shadcn@latest add Familis-co/registry/project-card" />
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
        <section aria-labelledby="design-title" className="flex flex-col gap-4">
          <h2 id="design-title" className="text-2xl font-semibold tracking-tight">
            Design
          </h2>
          <p className="text-sm text-muted-foreground">
            Shared foundations, documented in Storybook with light and dark themes.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Color", "Radius", "Typography", "Spacing", "Shadow"].map((name) =>
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
        <section aria-labelledby="ui-title" className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <h2 id="ui-title" className="text-2xl font-semibold tracking-tight">
              UI
            </h2>
            <Badge variant="secondary">{primitives.length} components</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Browse the full Base UI collection. Install any component with{" "}
            <code>Familis-co/registry/&lt;name&gt;</code>.
          </p>
          <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {primitives.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2"
              >
                <a
                  href={`/r/${item.name}.json`}
                  className="text-sm font-medium underline-offset-4 hover:underline"
                >
                  {item.title}
                </a>
                {storybookUrl && (
                  <a
                    href={`${storybookUrl}/?path=/story/${item.meta?.storybookId}`}
                    aria-label={`Preview ${item.title} in Storybook`}
                    className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
                  >
                    <BookOpenIcon />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="components-title" className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-col gap-1">
              <h2 id="components-title" className="text-2xl font-semibold tracking-tight">
                Building blocks
              </h2>
              <p className="text-sm text-muted-foreground">
                Portable React source, ready to adapt to your product.
              </p>
            </div>
            <Badge variant="secondary">{blocks.length} blocks</Badge>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {blocks.map((item) => (
              <Card key={item.name}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle>{item.title}</CardTitle>
                    <Badge variant="outline">Block</Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex min-h-72 items-center justify-center rounded-lg border bg-muted/40 p-6">
                    {item.name === "project-card" ? (
                      <ProjectCard
                        title="Client portal"
                        description="A shared workspace for clients and their team."
                        detail="Updated today · 4 team members"
                        href="#installation"
                      />
                    ) : created ? (
                      <div className="flex w-full flex-col gap-4">
                        <ProjectCard
                          title="Your new project"
                          description="The empty state becomes a project when you create one."
                          href="#installation"
                        />
                        <Button variant="outline" size="sm" onClick={() => setCreated(false)}>
                          Reset preview
                        </Button>
                      </div>
                    ) : (
                      <EmptyState
                        title="No projects yet"
                        description="Create a project to bring your team and clients together."
                        action={{ label: "Create project", onClick: () => setCreated(true) }}
                      />
                    )}
                  </div>
                  <CopyCommand
                    command={`pnpm dlx shadcn@latest add Familis-co/registry/${item.name}`}
                  />
                </CardContent>
                <CardFooter className="flex flex-wrap gap-3">
                  <a
                    href={`/r/${item.name}.json`}
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    Registry JSON <ArrowUpRightIcon data-icon="inline-end" />
                  </a>
                  {storybookUrl && (
                    <a
                      href={`${storybookUrl}/?path=/story/${item.meta?.storybookId}`}
                      className={buttonVariants({ variant: "ghost", size: "sm" })}
                    >
                      <BookOpenIcon data-icon="inline-start" /> Storybook
                    </a>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Separator />
      <footer className="flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-muted-foreground">
        <p>Familis Registry · Shared by the team, owned by your project.</p>
        <a href="/r/registry.json" className="underline underline-offset-4">
          Browse the registry catalog
        </a>
      </footer>
    </div>
  )
}
