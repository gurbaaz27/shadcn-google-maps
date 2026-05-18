import Link from "next/link"
import { readFile } from "fs/promises"
import path from "path"
import { Star } from "lucide-react"

import { CopyLlmsButton } from "@/app/(components)/copy-llms-button"
import { ExampleCode } from "@/app/(components)/example-code"
import { PlacesDemoHero } from "@/app/(components)/places-demo"
import { Icons } from "@/components/icons"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderNotifier,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

const fadeUpClassname =
  "lg:motion-safe:opacity-0 lg:motion-safe:animate-fade-up"

async function getRepoStarCount() {
  try {
    const res = await fetch(`https://api.github.com/repos/${siteConfig.name}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return "—"
    }

    const data = (await res.json()) as { stargazers_count?: number }
    const starCount = data.stargazers_count ?? 0

    if (starCount > 999) {
      return `${(starCount / 1000).toFixed(1)}K`
    }

    return String(starCount)
  } catch {
    return "—"
  }
}

export default async function IndexPage() {
  const starCount = await getRepoStarCount()
  const llmsContent = await readFile(
    path.join(process.cwd(), "public", "llms.txt"),
    "utf-8",
  )

  return (
    <div className="container relative flex flex-1 flex-col items-center justify-center">
      <PageHeader>
        <PageHeaderNotifier>
          Google Places API (New) — not the legacy Autocomplete widget.
          <span className="mx-2">📍</span>
        </PageHeaderNotifier>

        <PageHeaderHeading className={cn(fadeUpClassname)}>
          Modern address autocomplete for shadcn/ui.
        </PageHeaderHeading>

        <PlacesDemoHero
          className={cn(
            fadeUpClassname,
            "lg:motion-safe:[animation-delay:1000ms]",
          )}
        />

        <PageHeaderDescription
          className={cn(
            fadeUpClassname,
            "lg:motion-safe:[animation-delay:3000ms]",
          )}
        >
          Ship forms with session-token billing, typed place results, and a
          polished dropdown.
          <br />
          Copy-paste friendly. Customizable. Open Source.
        </PageHeaderDescription>

        <PageActions
          className={cn(
            fadeUpClassname,
            "lg:motion-safe:[animation-delay:3000ms]",
          )}
        >
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(
              "group relative !py-0",
              buttonVariants({ variant: "outline" }),
            )}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            <div className="flex h-full items-center">
              <div className="hidden md:block">{siteConfig.name}</div>
              <div className="mx-4 hidden h-full w-px bg-input group-hover:bg-foreground md:block" />
              <Star size={16} className="mr-2" />
              <div>{starCount}</div>
            </div>
          </Link>
          <CopyLlmsButton content={llmsContent} />
        </PageActions>
      </PageHeader>

      <ExampleCode />

      <PageHeader>
        <PageHeaderHeading
          className={cn(
            fadeUpClassname,
            "py-4 text-3xl md:text-4xl lg:motion-safe:[animation-delay:4000ms]",
          )}
        >
          Examples
        </PageHeaderHeading>

        <PageHeaderHeading
          className={cn(
            fadeUpClassname,
            "text-xl md:text-2xl lg:motion-safe:[animation-delay:4000ms]",
          )}
        >
          Country restriction
        </PageHeaderHeading>

        <PlacesDemoHero
          countryCode="us"
          label="Suggestions biased to United States (includedRegionCodes)"
          className={cn(
            fadeUpClassname,
            "lg:motion-safe:[animation-delay:1000ms]",
          )}
        />

        <PageHeaderHeading
          className={cn(
            fadeUpClassname,
            "text-xl md:text-2xl lg:motion-safe:[animation-delay:4000ms]",
          )}
        >
          Install via registry
        </PageHeaderHeading>

        <PageHeaderDescription
          className={cn(
            fadeUpClassname,
            "font-mono text-sm lg:motion-safe:[animation-delay:4000ms]",
          )}
        >
          bunx shadcn@latest add {siteConfig.registry.placesAutocomplete}
        </PageHeaderDescription>
      </PageHeader>
    </div>
  )
}

export const revalidate = 3600
