import * as React from 'react'

import { cn } from '@/lib/utils'

type PageContainerSize = 'default' | 'wide'

export type PageContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: PageContainerSize
}

export function PageContainer({
  size = 'default',
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 tablet:px-6 desktop:px-8',
        size === 'default' && 'max-w-6xl',
        size === 'wide' && 'max-w-7xl',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

