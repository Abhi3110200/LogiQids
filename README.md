# 📋 Next.js LogiQids Board

A modern, responsive LogiQids board application built with Next.js, featuring drag-and-drop functionality, task management, and a beautiful Trello-inspired interface.

## Deployed Link 
- https://logi-qids-abhi3110200s-projects.vercel.app/

![LogiQids Board Preview](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Kanban+Board+Preview)

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop**: Seamlessly move cards between lists and reorder them
- **Task Management**: Create, edit, and delete tasks with detailed information
- **List Management**: Add, rename, and delete lists to organize your workflow
- **Task Completion**: Mark tasks as complete with visual indicators
- **Persistent Storage**: All data is saved to localStorage and persists across sessions

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Loading States**: Beautiful loading animations during data initialization
- **Hover Effects**: Interactive hover states for better user feedback
- **Modal Editing**: Rich editing experience with dedicated card modals
- **Visual Feedback**: Clear indicators for task status, due dates, and priorities

### 🔧 Advanced Features
- **Due Date Management**: Set and track task deadlines with visual indicators
- **Task Descriptions**: Add detailed descriptions to your tasks
- **Overdue Alerts**: Visual warnings for overdue tasks
- **Board Reset**: Quick reset functionality to start fresh
- **Keyboard Navigation**: Accessible keyboard interactions

## 🚀 Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with latest features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful and accessible UI components
- **[@dnd-kit](https://dndkit.com/)** - Modern drag and drop library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Context API](https://reactjs.org/docs/context.html)** - State management

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhi3110200/LogiQids
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 Usage

### Getting Started
1. **Create Lists**: Click "Add another list" to create your workflow columns
2. **Add Cards**: Use the "Add a card" button to create new tasks
3. **Drag & Drop**: Move cards between lists or reorder them within lists
4. **Edit Tasks**: Click on any card to open the detailed editor
5. **Mark Complete**: Hover over cards and click the checkbox to mark as complete

### Managing Tasks
- **Title & Description**: Add comprehensive task information
- **Due Dates**: Set deadlines and track progress
- **Completion Status**: Toggle task completion with visual feedback
- **Delete Tasks**: Remove tasks you no longer need

### Board Management
- **Rename Lists**: Click on list titles to rename them
- **Delete Lists**: Use the dropdown menu to remove entire lists
- **Reset Board**: Use the reset button to clear all data and start fresh

## 📁 Project Structure

```
new-folder/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── add-list.tsx         # Add new list component
│   ├── board.tsx            # Main board container
│   ├── board-content.tsx    # Board content with loading
│   ├── board-loading-spinner.tsx # Loading spinner for board
│   ├── card-modal.tsx       # Task editing modal
│   ├── header.tsx           # Application header
│   ├── kanban-card.tsx      # Individual task card
│   └── kanban-list.tsx      # List container component
├── context/
│   └── board-context.tsx    # Global state management
├── utils/
│   └── storage.ts           # localStorage utilities
├── lib/
│   └── utils.ts             # Utility functions
└── types/
    └── index.ts             # TypeScript type definitions
```

## 🎨 Customization

### Styling
The project uses Tailwind CSS for styling. You can customize:
- **Colors**: Modify the color palette in `tailwind.config.ts`
- **Spacing**: Adjust spacing and sizing throughout the components
- **Animations**: Customize or add new animations in the CSS

### Additional Features
- **Storage**: Replace localStorage with a database by modifying `utils/storage.ts`
