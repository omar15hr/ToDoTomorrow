import { Sidebar } from "./components/Sidebar"
import { ToDoGrid } from "./components/ToDoGrid"
import { Toaster } from "sonner"

function App() {

  return (
    <div className="container">
      <Sidebar />
      <ToDoGrid />
      <Toaster richColors />
    </div>
  )
}

export default App
