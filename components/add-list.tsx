"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Sparkles } from "lucide-react"
import { useBoard } from "@/context/board-context"

export function AddList() {
  const { addList } = useBoard()
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState("")

  const handleSubmit = () => {
    if (title.trim()) {
      addList(title.trim())
      setTitle("")
      setIsAdding(false)
    }
  }

  const handleCancel = () => {
    setTitle("")
    setIsAdding(false)
  }

  if (isAdding) {
    return (
      <div className="w-72 sm:w-80 flex-shrink-0">
        <Card className="bg-white shadow-lg border border-gray-200 rounded-xl">
          <CardContent className="p-4 space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title..."
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit()
                if (e.key === "Escape") handleCancel()
              }}
              className="border-0 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex space-x-2">
              <Button size="sm" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Add List
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancel} className="hover:bg-gray-200/50">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-72 sm:w-80 flex-shrink-0">
      <Button
        variant="ghost"
        className="w-full h-15 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex items-center justify-center space-x-2 bg-white/50 backdrop-blur-sm rounded-xl group"
        onClick={() => setIsAdding(true)}
      >
        <div className="flex items-center space-x-2 text-gray-600 group-hover:text-blue-600">
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add another list</span>
          <Sparkles className="h-4 w-4 opacity-0 group-hover:opacity-100" />
        </div>
      </Button>
    </div>
  )
}
