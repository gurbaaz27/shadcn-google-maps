import { cn } from "@/lib/utils"

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={cn(
        "mx-auto flex max-w-[800px] flex-col items-center gap-8 py-12 md:gap-10 md:py-16 md:pb-12 lg:gap-12 lg:py-24 lg:pb-20",
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
        "mb-2 min-w-fit rounded p-2.5 text-center text-xs leading-tight font-semibold backdrop-blur-[2px] md:text-sm lg:leading-[1.1]",
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
        "my-2 max-w-[330px] text-center text-3xl leading-tight font-bold tracking-tighter md:my-4 md:min-w-[750px] md:text-6xl lg:leading-[1.1]",
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
        "flex w-full items-center justify-center space-x-4 pt-2 pb-4 md:pt-4 md:pb-12",
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
