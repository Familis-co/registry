import type { ReactNode } from "react"
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router"
import stylesheet from "@/styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Familis Registry" },
      {
        name: "description",
        content: "Shared components and building blocks for Familis projects.",
      },
    ],
    links: [{ rel: "stylesheet", href: stylesheet }],
  }),
  component: () => <Outlet />,
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <main className="p-8">
      This page could not be found. <a href="/">Back to the registry</a>
    </main>
  ),
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
