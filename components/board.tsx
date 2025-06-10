"use client"

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable"
import { useBoard } from "@/context/board-context"
import { KanbanList } from "@/components/kanban-list"
import { AddList } from "@/components/add-list"

export function Board() {
  const { board, moveCard, moveList } = useBoard()
//   const [activeId, setActiveId] = useState<string | null>(null)


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  )

  const handleDragStart = () => {
    // Currently not using drag start event for any functionality
    // If needed later for drag overlays or visual feedback, we can add the event parameter back
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Only handle card dragging
    if (!activeId.startsWith("card-")) return

    const activeCard = findCard(activeId)
    if (!activeCard) return

    // If dragging over a list (not a card), add to end of that list
    if (overId.startsWith("list-")) {
      if (activeCard.listId !== overId) {
        const overList = board.find((list) => list.id === overId)
        if (overList) {
          moveCard(activeId, activeCard.listId, overId, overList.cards.length)
        }
      }
    }
    // If dragging over another card, insert at that position
    else if (overId.startsWith("card-")) {
      const overCard = findCard(overId)
      if (overCard && activeCard.listId !== overCard.listId) {
        const overList = board.find((list) => list.id === overCard.listId)
        if (overList) {
          const overIndex = overList.cards.findIndex((card) => card.id === overId)
          moveCard(activeId, activeCard.listId, overCard.listId, overIndex)
        }
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    // Handle list reordering
    if (activeId.startsWith("list-") && overId.startsWith("list-")) {
      const activeIndex = board.findIndex((list) => list.id === activeId)
      const overIndex = board.findIndex((list) => list.id === overId)

      if (activeIndex !== overIndex) {
        moveList(activeId, overIndex)
      }
    }

    // Handle card reordering within the same list
    if (activeId.startsWith("card-") && overId.startsWith("card-")) {
      const activeCard = findCard(activeId)
      const overCard = findCard(overId)

      if (activeCard && overCard && activeCard.listId === overCard.listId) {
        const list = board.find((l) => l.id === activeCard.listId)
        if (list) {
          const activeIndex = list.cards.findIndex((card) => card.id === activeId)
          const overIndex = list.cards.findIndex((card) => card.id === overId)

          if (activeIndex !== overIndex) {
            moveCard(activeId, activeCard.listId, overCard.listId, overIndex)
          }
        }
      }
    }
  }

  const findCard = (cardId: string) => {
    for (const list of board) {
      const card = list.cards.find((card) => card.id === cardId)
      if (card) {
        return { ...card, listId: list.id }
      }
    }
    return null
  }

  return (
    <div className="p-4 sm:p-6 h-full">
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        <div className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-16 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <SortableContext items={board.map((list) => list.id)} strategy={horizontalListSortingStrategy}>
            {board.map((list) => (
              <KanbanList key={list.id} list={list} />
            ))}
          </SortableContext>
          <AddList />
        </div>
      </DndContext>
    </div>
  )
}
