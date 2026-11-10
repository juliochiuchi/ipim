import { useState } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Plus } from "lucide-react"

import { TagList } from "@/components/private/tags/tag-list"
import { TagForm } from "@/components/private/tags/tag-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Tag } from "@/types/events"

export const Route = createFileRoute("/_private/tags")({
  component: TagsPage,
})

function TagsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Tag | null>(null)
  const [keyRefresh, setKeyRefresh] = useState(0)

  const handleCreate = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: Tag) => {
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
      <div className="flex flex-col gap-3 tablet:flex-row tablet:items-center tablet:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium">Gerencie as tags usadas para etiquetar os eventos.</p>
          <p className="text-sm text-muted-foreground">
            Crie, edite ou exclua tags sem precisar alterar código.
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="w-full phone:w-auto bg-ipimGreen hover:bg-ipimGreenHover text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Tag
        </Button>
      </div>

      <TagList onEdit={handleEdit} keyRefresh={keyRefresh} />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="text-left mb-5">
            <DialogTitle>
              {editingItem ? "Editar Tag" : "Nova Tag"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados abaixo para {editingItem ? "atualizar" : "criar"} uma tag.
            </DialogDescription>
          </DialogHeader>
          <TagForm
            initialData={editingItem}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
