import { useState } from "react";
import { useAppSelector } from "../hooks/store";
import { useProjectActions } from "../hooks/useProjectActions";
import { ProjectWithId } from "../store/projects/projectsSlice";

interface ProjectsListProps {
  getProjectId: (project: ProjectWithId) => void;
}

export function ProjectsList({ getProjectId }: ProjectsListProps) {

  const projects = useAppSelector((state) => state.projects);
  const { removeProject, updateProject } = useProjectActions();

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState<string>("");

  const handleEditProject = (project: ProjectWithId) => {
    setEditingProjectId(project.id);
    setNewProjectName(project.name);
  }

  const handleUpdateProject = () => {
    if (newProjectName.trim()) {
      updateProject(editingProjectId as string, newProjectName);
      setEditingProjectId(null);
      setNewProjectName("");
    }
  };
  
  return (
    <div className="project-ul">
      {projects.map((item) => (
        <div key={item.id} className="project-item-container">
          <span 
            className="project-item" 
            onClick={() => getProjectId(item)}
          >
            {item.name}
          </span>
          <div>
          {editingProjectId === item.id ? (
              <input
                type="text"
                className="input-edit-name-project"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                onBlur={handleUpdateProject}
                autoFocus
              />
            ) : ''}
          </div>
          <div className="project-buttons">
            <button onClick={() => removeProject(item.id)} className="delete-project-button">
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
            <button onClick={() => handleEditProject(item)} className="update-project-button">
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
                className="icon icon-tabler icons-tabler-outline icon-tabler-edit"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
