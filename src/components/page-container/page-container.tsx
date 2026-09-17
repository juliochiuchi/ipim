import * as React from 'react'

import { cn } from '@/lib/utils'

type PageContainerSize = 'default' | 'wide' | 'narrow'

export type PageContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: PageContainerSize
}

/**
 * Container PADRÃO com padding lateral RESPONSIVO (escala por breakpoint).
 *
 * - px-4 em celulares (16px)
 * - tablet:px-12 (48px) a partir de 1024px
 * - laptop:px-20 (80px) a partir de 1366px
 * - desktop:px-28 (112px) a partir de 2000px
 * - ultrawide:px-36 (144px) a partir de 3440px
 *
 * Usa breakpoints existentes no tailwind.config.js (phone/tablet/laptop/desktop/ultrawide).
 */
export function PageContainer({
  size = 'default',
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 tablet:px-12 laptop:px-20 desktop:px-28 ultrawide:px-36',
        size === 'narrow' && 'max-w-4xl',
        size === 'default' && 'max-w-full',
        size === 'wide' && 'max-w-full',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
