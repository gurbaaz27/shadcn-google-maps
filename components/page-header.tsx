import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[800px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-18 lg:pb-16",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}

function PageHeaderNotifier({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "mb-2 min-w-fit rounded p-2 text-center text-xs leading-tight font-semibold backdrop-blur-[2px] md:text-sm lg:leading-[1.1]",
        className,
      )}
      style={{
        background: "rgba(66, 133, 244, 0.12)",
      }}
      {...props}
    />
  )
}

function PageHeaderHeading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "max-w-[330px] text-center text-3xl leading-tight font-bold tracking-tighter md:min-w-[750px] md:text-6xl lg:leading-[1.1]",
        className,
      )}
      {...props}
    />
  )
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "max-w-[750px] text-pretty text-center text-base text-muted-foreground sm:text-lg",
        className,
      )}
      {...props}
    />
  )
}

function PageActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-center space-x-4 py-4 md:pb-10",
        className,
      )}
      {...props}
    />
  )
}

export {
  PageHeader,
  PageHeaderNotifier,
  PageHeaderHeading,
  PageHeaderDescription,
  PageActions,
}
