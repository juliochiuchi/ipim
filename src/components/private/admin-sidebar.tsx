import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"
import { Link } from "@tanstack/react-router"

type SidebarItem = {
  label: string
  to?: string
  icon?: ReactNode
  active?: boolean
  disabled?: boolean
}

type AdminSidebarProps = {
  collapsed: boolean
  onToggle: () => void
  items: SidebarItem[]
}

export function AdminSidebar({ collapsed, onToggle, items }: AdminSidebarProps) {
  return (
    <aside
      className={cn(
        "relative flex min-h-screen border-r border-border/60 bg-card/70 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/55 dark:border-white/10 dark:bg-[#0f1012]/85 supports-[backdrop-filter]:dark:bg-[#0f1012]/70 before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-40 dark:before:opacity-25",
        collapsed ? "w-16" : "w-[264px]"
      )}
    >
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <div className={cn("font-semibold tracking-widest font-poppins", collapsed && "hidden")}>
            IPIM Admin
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={onToggle}
            aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>

        <nav className="mt-2 flex flex-1 flex-col gap-1 px-2">
          {items.map((item) => {
            const Icon = item.icon || <FileText className="h-5 w-5" />

            const content = (
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full h-10 justify-start gap-3 transition-colors",
                  item.active && "bg-ipimGreen/10 text-foreground hover:bg-ipimGreen/15 dark:bg-ipimGreen/15 dark:hover:bg-ipimGreen/20",
                  collapsed && "px-0 justify-center",
                  item.disabled && "opacity-50"
                )}
                disabled={item.disabled}
              >
                <span className={cn("text-muted-foreground", item.active && "text-ipimGreen")}>{Icon}</span>
                <span className={cn("truncate", collapsed && "hidden")}>{item.label}</span>
              </Button>
            )

            if (item.to) {
              return (
                <Button
                  key={item.label}
                  asChild
                  variant={item.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full h-10 justify-start gap-3 transition-colors",
                    item.active && "bg-ipimGreen/10 text-foreground hover:bg-ipimGreen/15 dark:bg-ipimGreen/15 dark:hover:bg-ipimGreen/20",
                    collapsed && "px-0 justify-center"
                  )}
                >
                  <Link to={item.to}>
                    <span className={cn("text-muted-foreground", item.active && "text-ipimGreen")}>{Icon}</span>
                    <span className={cn("truncate", collapsed && "hidden")}>{item.label}</span>
                  </Link>
                </Button>
              )
            }
            return (
              <div key={item.label} className="rounded-md">
                {content}
              </div>
            )
          })}
        </nav>

        <div className={cn("px-2 pb-3", collapsed && "hidden")}>
          <div className="rounded-md border p-3">
            <p className="text-xs text-muted-foreground">
              Navegue pelas áreas para personalizar o site.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
