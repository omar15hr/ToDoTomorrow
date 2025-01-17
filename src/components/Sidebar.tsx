import { useProjectActions } from "../hooks/useProjectActions";
import { ProjectsList } from "./ProjectsList";

export function Sidebar() {

  const { addProject } = useProjectActions();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;

    addProject({name});
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <h1>To Do Tomorrow</h1>
        <p>A simple to do list app</p>
        <hr />

        <form 
          onSubmit={handleSubmit} 
          className="create-project-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Project name"
            className="project-name-input"
          />

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
          <ProjectsList />
        </div>
      </div>
    </div>
  );
}
