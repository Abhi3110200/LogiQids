"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus, Trash2, Edit2, GripVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useBoard, type List } from "@/context/board-context"
import { KanbanCard } from "@/components/kanban-card"
import { useDroppable } from "@dnd-kit/core"

interface KanbanListProps {
  list: List
}

export function KanbanList({ list }: KanbanListProps) {
  const { updateList, deleteList, addCard } = useBoard()
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isAddingCard, setIsAddingCard] = useState(false)
  const [newCardTitle, setNewCardTitle] = useState("")
  const [editTitle, setEditTitle] = useState(list.title)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: list.id })

  const { setNodeRef: setDroppableRef } = useDroppable({
    id: list.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleTitleSubmit = () => {
    if (editTitle.trim()) {
      updateList(list.id, editTitle.trim())
    }
    setIsEditingTitle(false)
  }

  const handleAddCard = () => {
    if (newCardTitle.trim()) {
      addCard(list.id, newCardTitle.trim())
      setNewCardTitle("")
      setIsAddingCard(false)
    }
  }

  const handleDeleteList = () => {
    if (confirm(`Are you sure you want to delete "${list.title}"? This will also delete all cards in this list.`)) {
      deleteList(list.id)
    }
  }

  return (
    <div
      ref={(node) => {
        setNodeRef(node)
        setDroppableRef(node)
      }}
      style={style}
      className={`w-72 sm:w-80 flex-shrink-0 ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="h-fit bg-white shadow-lg border border-gray-200 rounded-xl group">
        <div className="p-3  bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-1">
              <GripVertical
                className="h-4 w-4 text-gray-400 cursor-grab hover:text-gray-600 opacity-0 group-hover:opacity-100"
                {...attributes}
                {...listeners}
              />
              {isEditingTitle ? (
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onBlur={handleTitleSubmit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTitleSubmit()
                    if (e.key === "Escape") {
                      setEditTitle(list.title)
                      setIsEditingTitle(false)
                    }
                  }}
                  className="font-semibold text-sm border-0 bg-white focus:bg-white"
                  autoFocus
                />
              ) : (
                <div className="flex items-center space-x-2 flex-1">
                  <h3
                    className="font-semibold text-sm cursor-pointer hover:bg-white/60 px-2 py-1 rounded-lg flex-1 text-gray-800"
                    onClick={() => setIsEditingTitle(true)}
                  >
                    {list.title}
                  </h3>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                    {list.cards.length}
                  </Badge>
                </div>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-white/60 opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm border border-gray-200">
                <DropdownMenuItem onClick={() => setIsEditingTitle(true)} className="hover:bg-blue-50">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Title
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeleteList} className="text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <CardContent className="space-y-3 p-4">
          <SortableContext items={list.cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
            {list.cards.map((card) => (
              <KanbanCard key={card.id} card={card} listId={list.id} />
            ))}
          </SortableContext>

          {isAddingCard ? (
            <div className="space-y-3 p-3 bg-gray-50/80 rounded-lg border border-gray-200/50">
              <Input
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter card title..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCard()
                  if (e.key === "Escape") {
                    setNewCardTitle("")
                    setIsAddingCard(false)
                  }
                }}
                className="border-0 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleAddCard} className="bg-blue-600 hover:bg-blue-700">
                  Add Card
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setNewCardTitle("")
                    setIsAddingCard(false)
                  }}
                  className="hover:bg-gray-200/50"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full h-10 justify-start text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-dashed border-gray-300 hover:border-blue-300 rounded-lg"
              onClick={() => setIsAddingCard(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add a card
            </Button>
          )}
        </CardContent>
      </div>
    </div>
  )
}
