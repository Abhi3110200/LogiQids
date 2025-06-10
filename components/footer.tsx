"use client"

import { Code, Github, Linkedin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 mt-auto fixed bottom-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>&copy; {currentYear} LogiQids Board.</span>
              <span>All rights reserved.</span>
            </div>

            {/* Developer Credit */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Made with</span>
              <span>by</span>
              <span className="font-medium text-blue-600">Abhijeet Vishwakarma</span>
              <Code className="h-4 w-4 text-blue-500" />
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              <a
                href="https://github.com/Abhi3110200"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhijeet-vishwakarma-386168214/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

        
        </div>
      </div>
    </footer>
  )
}
