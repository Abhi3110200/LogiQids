"use client"

import type React from "react"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, AlertCircle, Calendar, Edit, Check } from "lucide-react"
import type { Card as CardType } from "@/context/board-context"
import { CardModal } from "@/components/card-modal"
import { useBoard } from "@/context/board-context"

interface KanbanCardProps {
  card: CardType
  listId: string
}

export function KanbanCard({ card, listId }: KanbanCardProps) {
  const { toggleCardCompleted } = useBoard()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: {
      type: "card",
      card,
      listId,
    },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const isOverdue = card.dueDate && new Date(card.dueDate) < new Date()
  const isDueSoon = card.dueDate && new Date(card.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000)

  const handleCardClick = (e: React.MouseEvent) => {
    // Check if the click is on the selection area
    const target = e.target as HTMLElement
    if (target.closest(".selection-area")) {
      e.stopPropagation()
      toggleCardCompleted(listId, card.id)
      return
    }

    // Only open modal if we're not dragging and not clicking selection area
    if (!isDragging) {
      setIsModalOpen(true)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleCardCompleted(listId, card.id)
  }

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className={`cursor-pointer hover:shadow-lg bg-white border border-gray-200 hover:border-blue-300 select-none rounded-lg relative card-hover ${
          isDragging ? "opacity-50 shadow-2xl z-50 ring-2 ring-blue-400" : ""
        } ${card.completed ? "bg-green-50 border-green-200" : ""}`}
        onClick={handleCardClick}
      >
        {/* Selection overlay - only show on hover of THIS specific card */}
        <div className="selection-area absolute top-2 right-2 z-10">
          {card.completed ? (
            <div
              className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center cursor-pointer"
              onClick={handleCheckboxClick}
            >
              <Check className="h-4 w-4 text-white" />
            </div>
          ) : (
            <div className="hidden hover-controls">
              <div
                className="w-6 h-6 border-2 border-gray-400 rounded-full flex items-center justify-center bg-white cursor-pointer"
                onClick={handleCheckboxClick}
              >
                <div className="w-2 h-2 rounded-full"></div>
              </div>
              <button
                onClick={handleEditClick}
                className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600 ml-1"
              >
                <Edit className="h-3 w-3 text-white" />
              </button>
            </div>
          )}
        </div>

        <CardContent className="px-2 pr-12">
          <div {...attributes} {...listeners} className="w-full">
            <div className="flex items-center mb-3">
              <h4
                className={`text-sm font-medium pointer-events-none leading-relaxed flex-1 ${
                  card.completed ? "text-gray-500" : "text-gray-800"
                }`}
              >
                {card.title}
              </h4>
            </div>

            {(card.description || card.dueDate) && (
              <div className="flex items-center justify-between pointer-events-none">
                <div className="flex items-center space-x-2">
                  {card.description && (
                    <div className="flex items-center space-x-1 text-gray-500">
                      <FileText className="h-3 w-3" />
                      <span className="text-xs">Description</span>
                    </div>
                  )}
                </div>

                {card.dueDate && (
                  <div className="flex items-center space-x-1">
                    {isOverdue ? (
                      <AlertCircle className="h-3 w-3 text-red-500" />
                    ) : (
                      <Clock className="h-3 w-3 text-gray-500" />
                    )}
                    <Badge
                      variant={isOverdue ? "destructive" : isDueSoon ? "secondary" : "outline"}
                      className={`text-xs font-medium ${
                        isOverdue
                          ? "bg-red-100 text-red-700 border-red-200"
                          : isDueSoon
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      <Calendar className="h-2 w-2 mr-1" />
                      {new Date(card.dueDate).toLocaleDateString()}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <CardModal card={card} listId={listId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
