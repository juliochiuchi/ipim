import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "lucide-react"

import { EventList } from "@/components/private/events/event-list"
import { EventForm } from "@/components/private/events/event-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Event } from "@/types/events"

export const Route = createFileRoute("/_private/events")({
  component: EventsPage,
})

function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Event | null>(null)
  const [keyRefresh, setKeyRefresh] = useState(0)

  const handleCreate = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: Event) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    setEditingItem(null)
    setKeyRefresh((prev) => prev + 1)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setEditingItem(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <Button onClick={handleCreate} className="w-full phone:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>

      <EventList onEdit={handleEdit} keyRefresh={keyRefresh} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-lg">
          <DialogHeader className="text-left mb-5">
            <DialogTitle>
              {editingItem ? "Editar Evento" : "Novo Evento"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para {editingItem ? "atualizar" : "criar"} um evento.
            </DialogDescription>
          </DialogHeader>
          <EventForm
            initialData={editingItem}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
