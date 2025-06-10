"use client"

import { useBoard } from "@/context/board-context"
import { Board } from "@/components/board"
import { Header } from "@/components/header"
import { BoardLoadingSpinner } from "@/components/board-loading-spinner"
import { Footer } from "@/components/footer"

export function BoardContent() {
  const { isLoading } = useBoard()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-500">
      <Header />
        {isLoading ? <BoardLoadingSpinner /> : <Board />}
        <Footer />
    </div>
  )
}
