import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Link, useLocation } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTheme } from "@/hooks/use-theme"
import { Button } from "@/components/ui/button"
import {
  LogIn, ChartColumn, Menu, X, Heart, Calendar, Radio, Tent, Home,
  ChevronRight, Phone, Mail, MapPin, Command as CmdIcon
} from "lucide-react"
import logoDark from '../../assets/logo-ipim-verde.png'
import logoLight from '../../assets/logo-ipim-verde.png'

export function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { theme } = useTheme()
  const currentLogo = theme === 'dark' ? logoDark : logoLight

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    return path !== '/' && location.pathname === path
  }

  const getNavItemClasses = (path: string) => {
    const baseClasses = "relative px-2.5 tablet:px-3 laptop:px-3.5 py-2 tablet:py-2.5 laptop:py-3 text-[12px] tablet:text-[13px] laptop:text-[14px] font-semibold rounded-xl no-underline outline-hidden select-none transition-all duration-300 flex items-center gap-1 tablet:gap-1.5 laptop:gap-2 group whitespace-nowrap"
    const hoverClasses = "hover:text-ipimGreen dark:hover:text-ipimGreenLight hover:bg-ipimGreenLight/25 dark:hover:bg-ipimGreen/10"
    const activeClasses = "text-ipimGreen dark:text-ipimGreenLight bg-ipimGreenLight/35 dark:bg-ipimGreen/15"
    const inactiveClasses = "text-ipimNavy dark:text-gray-200"
    return isActive(path) ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses} ${hoverClasses}`
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const menuItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/calendar', label: 'Programação', icon: Calendar },
    { path: '/doe', label: 'Contribuir', icon: Heart },
    { path: '/live', label: 'Culto Online', icon: Radio },
    { path: '/acampamento', label: 'Acampamento', icon: Tent },
  ]

  const quickContacts = [
    { icon: Phone, label: '(17) 3256-1234' },
    { icon: Mail, label: 'contato@ipim.org.br' },
  ]

  const PAD_OUTER = 'px-4 tablet:px-12 laptop:px-20 desktop:px-28 ultrawide:px-36'
  const INNER_ALIGN = 'w-full max-w-full'

  return (
    <header className="w-full relative z-50 sticky top-0">
      <div className={`bg-ipimHeaderBg dark:bg-ipimBgDark border-b border-ipimHeaderBorder dark:border-ipimBorderDark transition-all duration-300 ${PAD_OUTER} ${
        isScrolled
          ? 'shadow-[0_6px_28px_-10px_rgba(30,58,95,0.22)] dark:shadow-[0_6px_28px_-10px_rgba(0,0,0,0.48)] py-3 tablet:py-3.5 laptop:py-4'
          : 'shadow-[0_1px_0_0_rgba(184,134,11,0.12),0_2px_14px_-8px_rgba(30,58,95,0.10)] dark:shadow-[0_1px_0_0_rgba(184,134,11,0.18),0_2px_14px_-8px_rgba(0,0,0,0.25)] py-4 tablet:py-5 laptop:py-6'
      }`}>
        <div className={`${INNER_ALIGN}`}>
          <div className="hidden tablet:block">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5 tablet:gap-6 laptop:gap-8">
                <Link to="/" className="flex items-center gap-3 tablet:gap-3.5 laptop:gap-4 group">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-ipimGreen/20 to-ipimGold/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <img
                      src={currentLogo}
                      alt="Logo IPIM - Igreja Presbiteriana Independente de Macaubal"
                      className="h-12 tablet:h-14 laptop:h-16 w-auto relative z-10 drop-shadow-sm"
                    />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="font-poppins font-bold text-[17px] tablet:text-lg laptop:text-xl text-ipimNavy dark:text-white tracking-tight">
                      IPIM
                    </span>
                    <span className="font-nunito text-[9px] tablet:text-[10px] laptop:text-[11px] text-ipimTextFooter dark:text-gray-400 uppercase tracking-[0.14em] tablet:tracking-[0.15em] laptop:tracking-[0.18em] font-semibold">
                      Igreja Presbiteriana
                    </span>
                  </div>
                </Link>

                <NavigationMenu>
                  <NavigationMenuList className="flex items-center gap-1 tablet:gap-1.5 laptop:gap-2">
                    {menuItems.map((item) => (
                      <NavigationMenuItem key={item.path}>
                        <NavigationMenuLink asChild className={getNavItemClasses(item.path)}>
                          <Link to={item.path}>
                            <item.icon className="w-[14px] tablet:w-4 laptop:w-[17px] h-[14px] tablet:h-4 laptop:h-[17px]" />
                            <span>{item.label}</span>
                            {isActive(item.path) && (
                              <span className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-10 h-0.5 bg-gradient-to-r from-ipimGreen via-ipimGold to-ipimGreen rounded-full" />
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex items-center gap-1.5 tablet:gap-2 laptop:gap-2.5">
                <Button
                variant="ghost"
                size="icon"
                onClick={() => window.dispatchEvent(new CustomEvent('open-ipim-command-palette'))}
                className="hidden tablet:flex sr-only h-9 tablet:h-10 w-9 tablet:w-10 rounded-xl hover:bg-ipimGreenLight/30 dark:hover:bg-ipimGreen/10 text-ipimNavy dark:text-gray-200 hover:text-ipimGreen dark:hover:text-ipimGreenLight transition-all duration-200 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.03]"
                aria-label="Abrir atalhos e painéis administrativos (⌘, ⌘⌘, Shift Shift, ⌘K / Ctrl+K)"
              >
                <CmdIcon className="h-[16px] tablet:h-[17px] w-[16px] tablet:w-[17px]" />
                <span className="sr-only">Abrir painel de atalhos</span>
              </Button>
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div className="tablet:hidden">
            <div className="flex items-center justify-between py-2.5">
              <Link to="/" className="flex items-center gap-3">
                <img src={currentLogo} alt="Logo IPIM" className="h-11 w-11 drop-shadow-sm" />
                <div className="flex flex-col leading-tight">
                  <span className="font-poppins font-bold text-lg text-ipimNavy dark:text-white tracking-tight">IPIM</span>
                  <span className="font-nunito text-[10px] text-ipimTextFooter dark:text-gray-400 uppercase tracking-[0.15em] font-semibold">
                    Presbiteriana
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-1.5">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className="relative p-2.5 rounded-lg hover:bg-ipimGreenLight/30 dark:hover:bg-ipimGreen/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ipimGreen/30 dark:focus:ring-ipimGreen/20"
                  aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen
                    ? <X className="w-6 h-6 text-ipimNavy dark:text-white" />
                    : <Menu className="w-6 h-6 text-ipimNavy dark:text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={closeMenu}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-sm bg-white dark:bg-ipimBgDark shadow-2xl z-50 transform transition-transform duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-ipimNavy to-ipimNavyLight dark:from-ipimNavyDark dark:to-ipimNavy">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center">
                <span className="text-2xl text-ipimGoldLight">✝</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-poppins font-bold text-lg text-white">Menu</span>
                <span className="font-nunito text-[11px] text-white/70">Navegação do site</span>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2.5 rounded-xl hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Fechar menu"
            >
              <X className="w-[22px] h-[22px] text-white" />
            </button>
          </div>

          <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-800 bg-ipimCream/50 dark:bg-gray-900/30">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-ipimGreen to-ipimGreenDark hover:from-ipimGreenHover hover:to-ipimGreenDark text-white rounded-xl h-[52px] font-poppins font-semibold shadow-lg shadow-ipimGreen/20 hover:shadow-xl transition-all duration-300 text-[15px]"
            >
              <Link to="/doe" onClick={closeMenu} className="flex items-center justify-center gap-2.5">
                <Heart className="w-5 h-5 fill-current" />
                <span>Contribuir com Dízimo ou Oferta</span>
              </Link>
            </Button>
          </div>

          <nav className="flex-1 px-4 py-5 overflow-y-auto custom-scrollbar">
            <ul className="space-y-2.5">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center justify-between w-full px-5 py-4 rounded-xl transition-all duration-200 group ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-ipimGreenLight/40 to-ipimGold/10 text-ipimGreen dark:from-ipimGreen/15 dark:to-ipimGold/10 dark:text-ipimGreenLight shadow-sm'
                        : 'text-ipimNavy dark:text-gray-200 hover:bg-ipimGreenLight/20 dark:hover:bg-ipimGreen/5 active:bg-ipimGreenLight/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isActive(item.path)
                          ? 'bg-ipimGreen text-white dark:bg-ipimGreenLight dark:text-ipimNavy shadow-md'
                          : 'bg-ipimCream dark:bg-gray-800 text-ipimNavy dark:text-gray-300 group-hover:bg-ipimGreen group-hover:text-white dark:group-hover:bg-ipimGreen'
                      }`}>
                        <item.icon className="w-[22px] h-[22px]" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="font-poppins font-semibold text-[15px]">{item.label}</span>
                        <span className="font-nunito text-[11px] text-ipimTextFooter dark:text-gray-500 mt-0.5">
                          {isActive(item.path) ? 'Página atual' : 'Acessar seção'}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-all duration-200 ${
                      isActive(item.path)
                        ? 'text-ipimGreen dark:text-ipimGreenLight translate-x-0.5'
                        : 'text-gray-300 dark:text-gray-600 group-hover:text-ipimGreen group-hover:translate-x-0.5'
                    }`} />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3.5">
              <div className="px-2">
                <span className="font-poppins font-bold text-[11px] uppercase tracking-[0.18em] text-ipimTextFooter dark:text-gray-500">
                  Links Úteis
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/calendar" onClick={closeMenu} className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-ipimCream dark:bg-gray-800/50 hover:bg-ipimGreenLight/30 dark:hover:bg-ipimGreen/10 transition-colors duration-200 group">
                  <Calendar className="w-[18px] h-[18px] text-ipimGold dark:text-ipimGoldLight" />
                  <span className="font-poppins text-sm font-medium text-ipimNavy dark:text-gray-200">Agenda</span>
                </Link>
                <a href="https://lumina-omega-one.vercel.app/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-ipimCream dark:bg-gray-800/50 hover:bg-ipimGreenLight/30 dark:hover:bg-ipimGreen/10 transition-colors duration-200 group">
                  <ChartColumn className="w-[18px] h-[18px] text-ipimGold dark:text-ipimGoldLight" />
                  <span className="font-poppins text-sm font-medium text-ipimNavy dark:text-gray-200">Financeiro</span>
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/login" onClick={closeMenu} className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-ipimCream dark:bg-gray-800/50 hover:bg-ipimGreenLight/30 dark:hover:bg-ipimGreen/10 transition-colors duration-200 group">
                  <LogIn className="w-[18px] h-[18px] text-ipimGold dark:text-ipimGoldLight" />
                  <span className="font-poppins text-sm font-medium text-ipimNavy dark:text-gray-200">Login</span>
                </Link>
                <button
                  onClick={() => { window.dispatchEvent(new CustomEvent('open-ipim-command-palette')); closeMenu() }}
                  className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-ipimCream dark:bg-gray-800/50 hover:bg-ipimGreenLight/30 dark:hover:bg-ipimGreen/10 transition-colors duration-200 group"
                >
                  <CmdIcon className="w-[18px] h-[18px] text-ipimGold dark:text-ipimGoldLight" />
                  <span className="font-poppins text-sm font-medium text-ipimNavy dark:text-gray-200">Atalhos</span>
                </button>
              </div>
            </div>
          </nav>

          <div className="px-6 py-5 border-t border-gray-100 dark:border-gray-800 bg-ipimCream/30 dark:bg-gray-900/30">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-ipimGreen/20 to-ipimGold/20 flex items-center justify-center">
                <span className="text-xl text-ipimGreen">✝</span>
              </div>
              <div className="flex-1">
                <p className="font-poppins font-semibold text-sm text-ipimNavy dark:text-gray-200 leading-tight">
                  Igreja Presbiteriana
                </p>
                <p className="font-nunito text-[11px] text-ipimTextFooter dark:text-gray-500 leading-tight mt-0.5">
                  Independente de Macaubal
                </p>
              </div>
            </div>
            <div className="space-y-2.5">
              {quickContacts.map((contact, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <contact.icon className="w-4 h-4 text-ipimGold dark:text-ipimGoldLight shrink-0" />
                  <span className="font-nunito text-[12px] text-ipimTextFooter dark:text-gray-400">{contact.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-ipimGold dark:text-ipimGoldLight shrink-0" />
                <span className="font-nunito text-[12px] text-ipimTextFooter dark:text-gray-400">Macaubal - São Paulo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
