import { useState } from "react";
import { useProjectActions } from "../hooks/useProjectActions";
import { ProjectWithId } from "../store/projects/projectsSlice";
import { useAppSelector } from "../hooks/store";

interface ToDoGridProps {
  project: ProjectWithId | null;
}

export function ToDoGrid({ project }: ToDoGridProps) {
  const globalProjects = useAppSelector((state) => state.projects);

  const selectedProject = globalProjects.find((p) => p.id === project?.id);
  const todos = selectedProject?.todos || [];

  const { addTodo } = useProjectActions();
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title) {
      return setResult("error");
    }

    const newTodo = {
      title,
      projectId: project!.id,
      id: crypto.randomUUID(),
      description,
      completed: false
    }

    addTodo(newTodo);
    setResult("success");
    console.log(newTodo);

    form.reset();
  };

  return (
    <div className="content">
      {selectedProject && (
        <form onSubmit={handleSubmit} className="create-todo-form">
          <input
            type="text"
            name="title"
            placeholder="To do title"
            className="project-todo-input"
          />
          <input
            type="text"
            name="description"
            placeholder="To do Description"
            className="project-todo-input-description"
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
      )}

      <div className="project-todo-list">
        {todos?.map((todo) => (
          <div className="project-todo-card" key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
          </div>
        ))}
      </div>

      <span className="project-error">
        {result === "error" && (
          <span className="error-item">Project name is required</span>
        )}
      </span>
    </div>
  );
}
