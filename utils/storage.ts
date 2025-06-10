import type { Board } from "@/context/board-context"

const STORAGE_KEY = "kanban-board"

export function saveToStorage(board: Board): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board))
  } catch (error) {
    console.error("Failed to save to localStorage:", error)
  }
}

export function loadFromStorage(): Board {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Failed to load from localStorage:", error)
    return []
  }
}

export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error("Failed to clear localStorage:", error)
  }
}
