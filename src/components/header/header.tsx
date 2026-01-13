import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useLocation } from '@tanstack/react-router'
import { useState } from 'react'
import { ThemeToggle } from "@/components/ui/theme-toggle"
import IPIBIcon from '../../assets/IPIB-icon.png'

export function Header() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') {
      return true
    }
    return path !== '/' && location.pathname === path
  }

  const getNavItemClasses = (path: string) => {
    const baseClasses = "rounded-md bg-linear-to-b p-3 phone:p-4 my-2 no-underline outline-hidden select-none focus:shadow-md transition-all duration-200 font-inter text-sm phone:text-base"
    const hoverClasses = "hover:bg-indigo-100 dark:hover:bg-indigo-900/30 active:bg-indigo-200 dark:active:bg-indigo-800/40"
    const activeClasses = "bg-indigo-100 dark:bg-indigo-900/30"

    if (isActive(path)) {
      return `${baseClasses} ${activeClasses} ${hoverClasses} ml-2`
    }
    return `${baseClasses} ${hoverClasses} ml-2`
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/calendar', label: 'Programação' },
    { path: '/doe', label: 'Doe' },
    { path: '/live', label: 'Live' },
    { path: '/acampamento', label: 'Acampamento' }
  ]

  return (
    <header className="w-full bg-ipimBgSectionNextStep dark:bg-[#1f1f25] relative z-50 transition-colors duration-200">
      {/* Desktop Navigation */}
      <div className="hidden tablet:block">
        <div className="flex items-center justify-between w-full px-4 py-4">
          {/* Logo and Menu Items - Left Side */}
          <div className="flex items-center gap-4">
            <img
              src={IPIBIcon}
              alt="IPIB Icon"
              className="h-10 w-10"
            />
            <NavigationMenu>
              <NavigationMenuList className="flex items-center">
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <NavigationMenuLink asChild className={getNavItemClasses(item.path)}>
                      <a href={item.path} className={isActive(item.path) ? "text-ipimIndigoLight dark:text-ipimIndigoLight" : "dark:text-white"}>{item.label}</a>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Theme Toggle - Right Side */}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="tablet:hidden">
        {/* Mobile Header with Hamburger */}
        <div className="flex items-center justify-between px-4 py-4">
          <img
            src={IPIBIcon}
            alt="IPIB Icon"
            className="h-8 w-8"
          />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-ipimBlack dark:bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-ipimBlack dark:bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}></span>
                <span className={`block w-5 h-0.5 bg-ipimBlack dark:bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          />
        )}

        {/* Mobile Menu */}
        <div className={`fixed top-0 right-0 h-full w-80 phone:w-72 bg-ipimBgSectionNextStep dark:bg-[#1f1f25] shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="font-poppins font-semibold text-lg text-ipimBlack dark:text-white">
              Menu
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              aria-label="Close menu"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="block w-5 h-0.5 bg-ipimBlack dark:bg-white rotate-45 absolute"></span>
                <span className="block w-5 h-0.5 bg-ipimBlack dark:bg-white -rotate-45 absolute"></span>
              </div>
            </button>
          </div>

          {/* Mobile Menu Items */}
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <a
                    href={item.path}
                    onClick={closeMenu}
                    className={`block w-full text-left p-4 rounded-md transition-all duration-200 font-inter text-base ${isActive(item.path)
                      ? 'bg-indigo-100 dark:bg-indigo-900/30 text-ipimIndigoLight dark:text-ipimIndigoLight font-medium'
                      : 'text-ipimBlack dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 active:bg-indigo-100 dark:active:bg-indigo-900/30'
                      }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center font-nunito">
              Igreja Presbiteriana Independente de Macaubal
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
