import { ProjectWithId } from "../store/projects/projectsSlice";

interface ToDoGridProps {
  project: ProjectWithId | null;
}

export function ToDoGrid({ project }: ToDoGridProps) {

  return (
    <div className="content">

      <form className="create-todo-form">
          <input
            type="text"
            name="name"
            placeholder="To do title"
            className="project-todo-input"
          />

          <button className="create-todo-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
            Create To Do
          </button>
        </form>
    </div>
  )
}