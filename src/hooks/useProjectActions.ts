import { toast } from "sonner";
import { addNewProject, deleteProjectById, ProjectId } from "../store/projects/projectsSlice";
import { useAppDispatch } from "./store";

export function useProjectActions() {
  const dispatch = useAppDispatch();

  const addProject = ({name}: {name: string}) => {
    dispatch(addNewProject({name}));
    toast.success("Project created successfully");
  }

  const removeProject = (id: ProjectId) => {
    dispatch(deleteProjectById(id));
    toast.success("Project deleted successfully");
  };

  return { addProject, removeProject };
}