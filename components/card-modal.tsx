"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Calendar, FileText, Edit2, Save, X, CheckCircle } from "lucide-react"
import { useBoard, type Card } from "@/context/board-context"

interface CardModalProps {
  card: Card
  listId: string
  isOpen: boolean
  onClose: () => void
}

export function CardModal({ card, listId, isOpen, onClose }: CardModalProps) {
  const { updateCard, deleteCard } = useBoard()
  const [title, setTitle] = useState(card.title)
  const [description, setDescription] = useState(card.description || "")
  const [dueDate, setDueDate] = useState(card.dueDate || "")
  const [completed, setCompleted] = useState(card.completed || false)

  useEffect(() => {
    setTitle(card.title)
    setDescription(card.description || "")
    setDueDate(card.dueDate || "")
    setCompleted(card.completed || false)
  }, [card])

  const handleSave = () => {
    updateCard(listId, card.id, {
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: dueDate || undefined,
      completed: completed,
    })
    onClose()
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this card?")) {
      deleteCard(listId, card.id)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95%] max-w-[500px] bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-xl p-4 sm:p-6">
        <DialogHeader className="pb-3 sm:pb-4 border-b border-gray-200/50">
          <DialogTitle className="flex items-center space-x-2 text-base sm:text-lg">
            <Edit2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Edit Card</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-3 sm:py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title..."
              className="border-0 bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Description</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="border-0 bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-blue-500 resize-none rounded-lg text-sm sm:text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Due Date</span>
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border-0 bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-blue-500 rounded-lg text-sm sm:text-base"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="completed"
              checked={completed}
              onCheckedChange={(checked) => setCompleted(checked === true)}
            />
            <Label
              htmlFor="completed"
              className="flex items-center space-x-1 sm:space-x-2 text-sm font-medium text-gray-700 cursor-pointer"
            >
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              <span>Mark as completed</span>
            </Label>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between pt-4 sm:pt-6 border-t border-gray-200/50 space-y-3 sm:space-y-0">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              className="flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 w-full sm:w-auto"
            >
              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Delete Card</span>
            </Button>

            <div className="flex space-x-2 sm:space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex items-center justify-center space-x-1 sm:space-x-2 hover:bg-gray-100 flex-1 sm:flex-none"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Cancel</span>
              </Button>
              <Button
                onClick={handleSave}
                className="flex items-center justify-center space-x-1 sm:space-x-2 bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
