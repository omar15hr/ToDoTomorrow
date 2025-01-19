import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { ToDoGrid } from "./components/ToDoGrid"
import { Toaster } from "sonner"
import { ProjectWithId } from "./store/projects/projectsSlice";

function App() {

  const [project, setProject] = useState<ProjectWithId | null>(null);

  return (
    <div className="container">
      <Sidebar getProject={(project: ProjectWithId) => setProject(project)} />
      <ToDoGrid project={project} />
      <Toaster richColors />
    </div>
  )
}

export default App
