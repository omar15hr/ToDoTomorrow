import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addNewProject } from "../store/projects/projectsSlice";
import { v4 as uuidv4 } from 'uuid';

export function Sidebar() {

  const [ projectName, setProjectName ] = useState('');
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project);

  const handleAddProject = () => {
    if (projectName === '') return;
    dispatch(addNewProject({ id: uuidv4(), name: projectName }));
    setProjectName('');
  }

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <h1>To Do Tomorrow</h1>
        <p>A simple to do list app</p>
        <hr />

        <input 
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name" 
          className="project-name-input" 
        />

        <button 
          className="create-project-button" 
          onClick={handleAddProject}
        >
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
          Create a new project
        </button>

        <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
      </div>
    </div>
  )
}