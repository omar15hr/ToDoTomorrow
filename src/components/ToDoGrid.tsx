import { useState } from "react";
import { useProjectActions } from "../hooks/useProjectActions";
import { useAppSelector } from "../hooks/store";
import { ProjectWithId } from "../interfaces/project.interface";
import { TodoList } from "./TodoList";
import { IconPencil } from "../assets/svg/IconPencil";
import { IconCirclePlus } from "../assets/svg/IconCirclePlus";

interface ToDoGridProps {
  project: ProjectWithId | null;
}

export function ToDoGrid({ project }: ToDoGridProps) {
  const globalProjects = useAppSelector((state) => state.projects);

  const selectedProject = globalProjects.find((p) => p.id === project?.id);
  const todos = selectedProject?.todos || [];

  const { addTodo, removeTodo } = useProjectActions();
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
      completed: false,
    };

    addTodo(newTodo);
    setResult("success");
    console.log(newTodo);

    form.reset();
  };

  return (
    <div className="content">
      {selectedProject ? (
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

          <span className="project-error">
            {result === "error" && (
              <span className="error-item">To Do name is required</span>
            )}
          </span>

          <button className="create-todo-button">
            <IconCirclePlus />
            Create To Do
          </button>
        </form>
      ) : (
        <div className="background-text">
          <span>Create o select a project to start</span>
          <IconPencil />
        </div>
      )}

      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
}
