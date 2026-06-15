import * as React from 'react'

import { cn } from '@/lib/utils'

export type PageHeroProps = {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-72 w-72 rounded-full bg-ipimGreen/10 blur-3xl dark:bg-ipimGreen/15" />
        <div className="absolute -right-32 -bottom-24 h-72 w-72 rounded-full bg-ipimIndigoLight/10 blur-3xl dark:bg-ipimIndigoLight/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,135,133,0.08),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(0,135,133,0.12),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(99,102,241,0.12),transparent_60%)]" />
      </div>

      <div className="relative px-6 py-10 tablet:px-10 tablet:py-12">
        <div className="flex max-w-3xl flex-col gap-4">
          {eyebrow ? (
            <div className="flex justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/30 dark:text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-ipimGreen" />
                {eyebrow}
              </span>
            </div>
          ) : null}

          <h1 className="font-poppins text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white phone:text-[1.65rem] tablet:text-5xl">
            {title}
          </h1>

          {description ? (
            <p className="font-source text-base leading-relaxed text-zinc-600 dark:text-zinc-300 tablet:text-lg">
              {description}
            </p>
          ) : null}

          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  )
}
