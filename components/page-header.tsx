import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[800px] flex-col items-center gap-4 py-8 md:gap-5 md:py-10 md:pb-6 lg:gap-6 lg:py-12 lg:pb-8",
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
        "min-w-fit rounded p-2.5 text-center text-xs leading-tight font-semibold backdrop-blur-[2px] md:text-sm lg:leading-[1.1]",
        className,
      )}
      style={{
        background: "rgba(99, 86, 36, 0.1)",
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
        "max-w-[750px] text-pretty text-center text-base leading-relaxed text-muted-foreground sm:text-lg",
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
        "flex w-full items-center justify-center gap-3",
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
