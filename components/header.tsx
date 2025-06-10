"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Trello } from "lucide-react"
import { useBoard } from "@/context/board-context"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function Header() {
  const { resetBoard } = useBoard()
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false)

  const handleReset = () => {
    resetBoard()
    setIsResetDialogOpen(false)
  }

  return (
    <header className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Trello className="h-8 w-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                LogiQids
              </h1>
            </div>
          </div>

          <Button
            onClick={() => setIsResetDialogOpen(true)}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset Board</span>
          </Button>

          <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset LogiQids Board</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all cards from your board but keep the lists. Are you sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset} className="bg-red-500 hover:bg-red-600">
                  Reset Board
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  )
}
