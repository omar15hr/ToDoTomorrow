import { useState } from "react";
import { useAppSelector } from "../hooks/store";
import { useProjectActions } from "../hooks/useProjectActions";
import { IconTrash } from "../assets/svg/IconTrash";
import { IconEdit } from "../assets/svg/IconEdit";
import { ProjectWithId } from "../interfaces/project.interface";

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
            <button 
              onClick={() => removeProject(item.id)} 
              className="delete-project-button"
            >
              <IconTrash />
            </button>
            <button 
              onClick={() => handleEditProject(item)} 
              className="update-project-button"
            >
              <IconEdit />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
