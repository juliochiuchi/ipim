import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_private/tags')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_private/tags"!</div>
}
