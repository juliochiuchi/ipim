import * as React from 'react'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

type OfferActionCardBaseProps = {
  title: React.ReactNode
  description: React.ReactNode
  icon: React.ReactNode
  variant?: 'neutral' | 'indigo'
  className?: string
  iconClassName?: string
  trailingIcon?: React.ReactNode
}

type OfferActionCardButtonProps = OfferActionCardBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type OfferActionCardLinkProps = OfferActionCardBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a'
  }

export type OfferActionCardProps = OfferActionCardButtonProps | OfferActionCardLinkProps

export function OfferActionCard(props: OfferActionCardButtonProps): React.JSX.Element
export function OfferActionCard(props: OfferActionCardLinkProps): React.JSX.Element
export function OfferActionCard(props: OfferActionCardProps) {
  const { title, description, icon, variant = 'neutral', className, iconClassName, trailingIcon } = props

  const outerClassName = cn(
    'group flex min-h-[10rem] min-w-0 flex-1 flex-col justify-between',
    variant === 'neutral'
      ? 'rounded-2xl border border-zinc-200/80 bg-white/85 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ipimIndigoLight/40 dark:border-zinc-800/60 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/30 disabled:cursor-not-allowed disabled:opacity-60'
      : 'rounded-2xl border border-ipimIndigoLight/30 bg-ipimIndigoLight/5 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-ipimIndigoLight/10 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ipimIndigoLight/40',
    className,
  )

  const leadingIconWrapperClassName = cn(
    'flex h-10 w-10 items-center justify-center rounded-xl',
    variant === 'neutral' ? 'bg-ipimIndigoLight/10 text-ipimIndigoLight' : 'bg-ipimIndigoLight text-white',
    iconClassName,
  )

  const endIcon = trailingIcon ?? (
    <ArrowUpRight className="text-zinc-400 transition group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
  )

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className={leadingIconWrapperClassName}>{icon}</div>
        {endIcon}
      </div>
      <div className="space-y-1">
        <div className="font-poppins text-base font-semibold text-zinc-900 dark:text-white">{title}</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-300">{description}</div>
      </div>
    </>
  )

  if (props.as === 'a') {
    const { as, ...anchorProps } = props
    void as

    return (
      <a className={outerClassName} {...anchorProps}>
        {content}
      </a>
    )
  }

  const { as, ...buttonProps } = props
  void as

  return (
    <button className={outerClassName} {...buttonProps}>
      {content}
    </button>
  )
}
