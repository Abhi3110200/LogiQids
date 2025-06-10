import { BoardProvider } from "@/context/board-context"
import {BoardContent} from '@/components/board-content'

export default function Home() {
  return (
    <BoardProvider>
      <BoardContent/>
    </BoardProvider>
  )
}
