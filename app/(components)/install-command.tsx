"use client"

import { Check, ChevronDown, Copy } from "lucide-react"
import { useEffect, useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const registrySuffix = "shadcn@latest add"

const packageManagers = [
  { id: "npm", label: "npm", runner: "npx" },
  { id: "yarn", label: "yarn", runner: "npx" },
  { id: "pnpm", label: "pnpm", runner: "pnpm dlx" },
  { id: "bun", label: "bun", runner: "bunx" },
] as const

type PackageManagerId = (typeof packageManagers)[number]["id"]

function getInstallCommand(pm: PackageManagerId, registryUrl: string) {
  const { runner } = packageManagers.find((p) => p.id === pm)!
  return `${runner} ${registrySuffix} ${registryUrl}`
}

interface InstallCommandProps {
  registryUrl: string
  className?: string
  defaultPackageManager?: PackageManagerId
}

export function InstallCommand({
  registryUrl,
  className,
  defaultPackageManager = "bun",
}: InstallCommandProps) {
  const [packageManager, setPackageManager] =
    useState<PackageManagerId>(defaultPackageManager)
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const installCommand = getInstallCommand(packageManager, registryUrl)
  const activePm = packageManagers.find((p) => p.id === packageManager)!

  useEffect(() => {
    if (!copied) {
      return
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
  }

  return (
    <div
      className={cn("flex w-full max-w-xl flex-col items-center gap-2", className)}
    >
      <div className="flex w-full items-center rounded-lg border border-border bg-muted/40 font-mono text-sm shadow-xs">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className="flex shrink-0 items-center gap-1 border-r border-border px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          >
            <span>{activePm.label}</span>
            <ChevronDown className="h-3.5 w-3.5 opacity-60" />
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="w-36 p-1 font-mono"
            sideOffset={6}
          >
            {packageManagers.map((pm) => (
              <button
                key={pm.id}
                type="button"
                className={cn(
                  "flex w-full rounded-md px-2.5 py-1.5 text-left text-sm transition-colors hover:bg-muted",
                  pm.id === packageManager && "bg-muted font-medium",
                )}
                onClick={() => {
                  setPackageManager(pm.id)
                  setOpen(false)
                }}
              >
                {pm.label}
              </button>
            ))}
          </PopoverContent>
        </Popover>

        <div className="min-w-0 flex-1 overflow-x-auto px-3 py-2.5 text-foreground">
          <span className="whitespace-nowrap">
            {registrySuffix}{" "}
            <span className="text-muted-foreground">{registryUrl}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={() => void handleCopy()}
          className="flex shrink-0 items-center justify-center border-l border-border px-3 py-2.5 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
          aria-label="Copy install command"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  )
}
