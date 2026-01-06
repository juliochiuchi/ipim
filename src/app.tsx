import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./route-tree.gen"
import { ThemeProvider } from "@/hooks/use-theme"
import { Toaster } from "@/components/ui/sonner"

const router = createRouter({ routeTree })

export function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ipim-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  )
}
