import { useState } from "react";
import { useProjectActions } from "../hooks/useProjectActions";
import { ProjectsList } from "./ProjectsList";
import { ProjectWithId } from "../interfaces/project.interface";
import { IconCirclePlus } from "../assets/svg/IconCirclePlus";

interface SidebarProps {
  getProject: (project: ProjectWithId) => void;
}

export function Sidebar({ getProject }: SidebarProps) {

  const getProjectId = (project: ProjectWithId) => {
    getProject(project);
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
            <IconCirclePlus />
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
