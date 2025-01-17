import { addNewProject, deleteProjectById, ProjectId } from "../store/projects/projectsSlice";
import { useAppDispatch } from "./store";

export function useProjectActions() {
  const dispatch = useAppDispatch();

  const addProject = ({name}: {name: string}) => {
    dispatch(addNewProject({name}));
  }

  const removeProject = (id: ProjectId) => {
    dispatch(deleteProjectById(id));
  };

  return { addProject, removeProject };
}