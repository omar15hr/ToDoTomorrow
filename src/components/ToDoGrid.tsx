import { ProjectWithId } from "../store/projects/projectsSlice";

interface ToDoGridProps {
  project: ProjectWithId | null;
}

export function ToDoGrid({ project }: ToDoGridProps) {

  return (
    <div className="content">
      <div>{project?.name}</div>
    </div>
  )
}