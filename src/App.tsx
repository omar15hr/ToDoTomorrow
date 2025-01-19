import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { ToDoGrid } from "./components/ToDoGrid"
import { Toaster } from "sonner"
import { ProjectId } from "./store/projects/projectsSlice";

function App() {

  const [project, setProject] = useState<ProjectId>('');

  return (
    <div className="container">
      <Sidebar getProject={(id: ProjectId) => setProject(id)} />
      <ToDoGrid projectId={project} />
      <Toaster richColors />
    </div>
  )
}

export default App
