"use client"

import { Trello } from "lucide-react"

export function BoardLoadingSpinner() {
  return (
    <div className="p-4 sm:p-6 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200/50">
        {/* Board icon with animation */}
        <div className="relative">
          <div className="animate-pulse">
            <Trello className="h-16 w-16 text-blue-600" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce" />
        </div>

        {/* Spinning loader */}
        <div className="flex items-center space-x-3">
          <span className="text-lg font-medium text-gray-700">Loading your LogiQids board...</span>
        </div>

        {/* Loading dots animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>

        {/* Mini progress indicators */}
        {/* <div className="flex space-x-2">
          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
          </div>
          <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: "400ms" }}></div>
          </div>
        </div> */}

        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm text-gray-600 animate-pulse">Preparing your workspace...</p>
        </div>
      </div>
    </div>
  )
}
