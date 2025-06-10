"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { loadFromStorage, saveToStorage, clearStorage } from "@/utils/storage"

export type Card = {
  id: string
  title: string
  description?: string
  dueDate?: string
  completed?: boolean
}

export type List = {
  id: string
  title: string
  cards: Card[]
}

export type Board = List[]

type BoardContextType = {
  board: Board
  isLoading: boolean
  addList: (title: string) => void
  updateList: (listId: string, title: string) => void
  deleteList: (listId: string) => void
  addCard: (listId: string, title: string) => void
  updateCard: (listId: string, cardId: string, updates: Partial<Card>) => void
  deleteCard: (listId: string, cardId: string) => void
  moveCard: (cardId: string, fromListId: string, toListId: string, newIndex: number) => void
  moveList: (listId: string, newIndex: number) => void
  resetBoard: () => void
  toggleCardCompleted: (listId: string, cardId: string) => void
}

const BoardContext = createContext<BoardContextType | undefined>(undefined)

export function BoardProvider({ children }: { children: ReactNode }) {
  const [board, setBoard] = useState<Board>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage on mount
  useEffect(() => {
    const loadBoard = async () => {
      setIsLoading(true)

      // Add a small delay to show the loading spinner
      await new Promise((resolve) => setTimeout(resolve, 500))

      const savedBoard = loadFromStorage()
      if (savedBoard.length > 0) {
        setBoard(savedBoard)
      } else {
        // Initialize with sample data
        const initialBoard: Board = [
          {
            id: "list-1",
            title: "To Do",
            cards: [],
          },
          {
            id: "list-2",
            title: "In Progress",
            cards: [],
          },
          {
            id: "list-3",
            title: "Done",
            cards: [],
          },
        ]
        setBoard(initialBoard)
      }

      setIsLoading(false)
    }

    loadBoard()
  }, [])

  // Save to localStorage whenever board changes
  useEffect(() => {
    if (board.length > 0 && !isLoading) {
      saveToStorage(board)
    }
  }, [board, isLoading])

  const addList = (title: string) => {
    const newList: List = {
      id: `list-${Date.now()}`,
      title,
      cards: [],
    }
    setBoard((prev) => [...prev, newList])
  }

  const updateList = (listId: string, title: string) => {
    setBoard((prev) => prev.map((list) => (list.id === listId ? { ...list, title } : list)))
  }

  const deleteList = (listId: string) => {
    setBoard((prev) => prev.filter((list) => list.id !== listId))
  }

  const addCard = (listId: string, title: string) => {
    const newCard: Card = {
      id: `card-${Date.now()}`,
      title,
      completed: false,
    }
    setBoard((prev) => prev.map((list) => (list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list)))
  }

  const updateCard = (listId: string, cardId: string, updates: Partial<Card>) => {
    setBoard((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) => (card.id === cardId ? { ...card, ...updates } : card)),
            }
          : list,
      ),
    )
  }

  const deleteCard = (listId: string, cardId: string) => {
    setBoard((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) } : list,
      ),
    )
  }

  const moveCard = (cardId: string, fromListId: string, toListId: string, newIndex: number) => {
    setBoard((prev) => {
      const newBoard = [...prev]
      const fromList = newBoard.find((list) => list.id === fromListId)
      const toList = newBoard.find((list) => list.id === toListId)

      if (!fromList || !toList) return prev

      const cardIndex = fromList.cards.findIndex((card) => card.id === cardId)
      if (cardIndex === -1) return prev

      const [card] = fromList.cards.splice(cardIndex, 1)
      toList.cards.splice(newIndex, 0, card)

      return newBoard
    })
  }

  const moveList = (listId: string, newIndex: number) => {
    setBoard((prev) => {
      const newBoard = [...prev]
      const listIndex = newBoard.findIndex((list) => list.id === listId)
      if (listIndex === -1) return prev

      const [list] = newBoard.splice(listIndex, 1)
      newBoard.splice(newIndex, 0, list)

      return newBoard
    })
  }

  const resetBoard = () => {
    // Keep the lists but clear all cards
    setBoard((prev) => {
      if (prev.length === 0) {
        // If there are no lists, create default ones
        return [
          {
            id: "list-1",
            title: "To Do",
            cards: [],
          },
          {
            id: "list-2",
            title: "In Progress",
            cards: [],
          },
          {
            id: "list-3",
            title: "Done",
            cards: [],
          },
        ]
      }

      // Keep existing lists but clear all cards
      return prev.map((list) => ({
        ...list,
        cards: [],
      }))
    })

    // Clear storage to ensure clean state
    clearStorage()

    // Save the empty lists to storage
    setTimeout(() => {
      saveToStorage(board)
    }, 100)
  }

  const toggleCardCompleted = (listId: string, cardId: string) => {
    setBoard((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              cards: list.cards.map((card) => (card.id === cardId ? { ...card, completed: !card.completed } : card)),
            }
          : list,
      ),
    )
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        isLoading,
        addList,
        updateList,
        deleteList,
        addCard,
        updateCard,
        deleteCard,
        moveCard,
        moveList,
        resetBoard,
        toggleCardCompleted,
      }}
    >
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const context = useContext(BoardContext)
  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider")
  }
  return context
}
