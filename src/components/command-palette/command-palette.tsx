import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'
import { Home, Calendar, Heart, Radio, Tent, LogIn, ChartColumn, ArrowRight } from 'lucide-react'

const navItems = [
  { label: 'Início', icon: Home, hint: 'Página inicial', to: '/' },
  { label: 'Programação', icon: Calendar, hint: 'Agenda e eventos', to: '/calendar' },
  { label: 'Dízimos e Ofertas', icon: Heart, hint: 'Contribuir com a obra', to: '/doe' },
  { label: 'Culto Online', icon: Radio, hint: 'Assistir transmissões ao vivo', to: '/live' },
  { label: 'Acampamento', icon: Tent, hint: 'CATI e retiros espirituais', to: '/acampamento' },
]

const adminItems = [
  { label: 'Painel Administrativo', icon: LogIn, hint: 'Área de login da equipe', to: '/login' },
  { label: 'Portal Financeiro (Lumina)', icon: ChartColumn, hint: 'Controle de doações e caixa', href: 'https://lumina-omega-one.vercel.app/', external: true },
]

const DOUBLE_PRESS_WINDOW = 400
const SINGLE_META_MAX_HOLD = 500

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const lastMetaPressRef = useRef(0)
  const lastShiftPressRef = useRef(0)
  const metaDownAtRef = useRef<number | null>(null)
  const otherKeyPressedWithMetaRef = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((value) => !value)
        return
      }
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key === 'Meta' && !e.repeat) {
        const now = Date.now()
        metaDownAtRef.current = now
        otherKeyPressedWithMetaRef.current = false
        if (now - lastMetaPressRef.current < DOUBLE_PRESS_WINDOW) {
          e.preventDefault()
          setOpen(true)
          lastMetaPressRef.current = 0
          metaDownAtRef.current = null
        } else {
          lastMetaPressRef.current = now
        }
        return
      }
      if (e.key === 'Shift' && !e.repeat) {
        const now = Date.now()
        if (now - lastShiftPressRef.current < DOUBLE_PRESS_WINDOW) {
          e.preventDefault()
          setOpen(true)
          lastShiftPressRef.current = 0
        } else {
          lastShiftPressRef.current = now
        }
        return
      }
      if (metaDownAtRef.current !== null && e.key !== 'Meta') {
        otherKeyPressedWithMetaRef.current = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Meta' && metaDownAtRef.current !== null) {
        const heldFor = Date.now() - metaDownAtRef.current
        const wasClean = !otherKeyPressedWithMetaRef.current
        const wasShort = heldFor < SINGLE_META_MAX_HOLD
        if (wasClean && wasShort) {
          setOpen(true)
        }
        metaDownAtRef.current = null
        otherKeyPressedWithMetaRef.current = false
      }
    }

    const handleOpenEvent = () => setOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('open-ipim-command-palette', handleOpenEvent)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('open-ipim-command-palette', handleOpenEvent)
    }
  }, [])

  const handleSelect = (to?: string, href?: string) => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    } else if (to) {
      navigate({ to } as any)
    }
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar página, ação ou painel administrativo…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="🌐 Navegação do site">
          {navItems.map((item) => (
            <CommandItem
              key={item.to}
              value={`${item.label} ${item.hint}`}
              onSelect={() => handleSelect(item.to)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ipimGreenLight/40 to-ipimGold/20 dark:from-ipimGreen/15 dark:to-ipimGold/10 text-ipimGreen dark:text-ipimGreenLight">
                <item.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-ipimNavy dark:text-white">{item.label}</span>
                <span className="text-[12px] text-muted-foreground font-normal">{item.hint}</span>
              </div>
              <ArrowRight className="ml-auto h-4 w-4 text-muted-foreground/50" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="⚙️ Painéis Administrativos">
          {adminItems.map((item) => (
            <CommandItem
              key={item.label}
              value={`${item.label} ${item.hint}`}
              onSelect={() => handleSelect(item.to, item.href)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ipimNavy/15 to-ipimNavyLight/10 dark:from-ipimGold/15 dark:to-ipimNavy/10 text-ipimNavy dark:text-ipimGoldLight">
                <item.icon className="h-[18px] w-[18px]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-semibold text-ipimNavy dark:text-white">{item.label}</span>
                <span className="text-[12px] text-muted-foreground font-normal">{item.hint}</span>
              </div>
              <CommandShortcut>{item.external ? '↗ externo' : '↵'}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
