import { ProjectId } from "../store/projects/projectsSlice";

interface ToDoGridProps {
  projectId: ProjectId;
}

export function ToDoGrid({ projectId }: ToDoGridProps) {

  return (
    <div className="content">
      <div>{projectId}</div>
    </div>
  )
}