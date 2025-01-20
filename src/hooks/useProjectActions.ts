import { toast } from "sonner";
import { addNewProject, addNewTodo, deleteProjectById, ProjectId } from "../store/projects/projectsSlice";
import { useAppDispatch } from "./store";

export function useProjectActions() {
  const dispatch = useAppDispatch();

  const addProject = ({name}: {name: string}) => {
    dispatch(addNewProject({name,todos: []}));
    toast.success("Project created successfully");
  }

  const removeProject = (id: ProjectId) => {
    dispatch(deleteProjectById(id));
    toast.success("Project deleted successfully");
  };

  const addTodo = ({title, projectId}: {title: string, projectId: ProjectId}) => {
    dispatch(addNewTodo({title, projectId, id: ''}));
    toast.success("To do created successfully");
  }

  return { addProject, removeProject, addTodo };
}