import { useState } from "react";
import { useProjectActions } from "../hooks/useProjectActions";
import { ProjectsList } from "./ProjectsList";
import { ProjectId } from "../store/projects/projectsSlice";

interface SidebarProps {
  getProject: (id: ProjectId) => void;
}

export function Sidebar({ getProject }: SidebarProps) {

  const getProjectId = (id: ProjectId) => {
    getProject(id);
  }
  
  const { addProject } = useProjectActions();
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResult(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;

    if (!name) {
      return setResult("error");
    }

    addProject({ name });
    setResult("success");

    form.reset();
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <h1>To Do Tomorrow</h1>
        <p>A simple to do list app</p>
        <hr />

        <form onSubmit={handleSubmit} className="create-project-form">
          <input
            type="text"
            name="name"
            placeholder="Project name"
            className="project-name-input"
          />

          <span className="project-error">
            {result === "error" && (
              <span className="error-item">Project name is required</span>
            )}
          </span>

          <button className="create-project-button">
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
            Create a new project
          </button>
        </form>

        <div className="project-list">
          <ProjectsList getProjectId={getProjectId} />
        </div>
      </div>
    </div>
  );
}
