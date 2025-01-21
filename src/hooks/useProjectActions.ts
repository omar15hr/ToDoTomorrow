import { toast } from "sonner";
import { addNewProject, addNewTodo, deleteProjectById, deleteTodoById, updateProjectsName } from "../store/projects/projectsSlice";
import { ProjectId, TodoId } from "../interfaces/project.interface";
import { useAppDispatch } from "./store";

export interface newTodoProps {
  title: string,
  projectId: ProjectId,
  id: string,
  description: string,
  completed: boolean
}

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

  const updateProject = (id: ProjectId, name: string) => {
    dispatch(updateProjectsName({id, name}));
    toast.info("Project name updated");
  }

  const addTodo = (newTodo: newTodoProps) => {
    dispatch(addNewTodo(newTodo));
    toast.success("To do created successfully");
  }

  const removeTodo = (todoId: TodoId) => {
    dispatch(deleteTodoById(todoId));
    toast.success("To do deleted successfully");
  }

  return { addProject, removeProject, updateProject, addTodo, removeTodo };
}