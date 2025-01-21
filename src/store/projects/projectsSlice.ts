import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectId, ProjectWithId, Todo, TodoId } from "../../interfaces/project.interface";

const getInitialState = (): ProjectWithId[] => {
  try {
    const persistedState = localStorage.getItem("__redux__state__");
    return persistedState ? JSON.parse(persistedState).projects : [];
  } catch {
    console.error("Error loading persisted state.");
    return [];
  }
};

const initialState: ProjectWithId[] = getInitialState();


export const ProjectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<Project>) => {
      const id = crypto.randomUUID();
      return [...state, { id, ...action.payload }];
    },
    deleteProjectById: (state, action: PayloadAction<ProjectId>) => {
      const id = action.payload;
      return state.filter((project) => project.id !== id);
    },
    updateProjectsName: (
      state,
      action: PayloadAction<{ id: ProjectId; name: string }>
    ) => {
      const { id, name } = action.payload;
      const project = state.find((project) => project.id === id);

      if (!project) throw new Error(`Project with id ${id} not found`);

      project.name = name;
    },
    addNewTodo: (state, action: PayloadAction<Todo>) => {
      const { projectId, title, description } = action.payload;
      const project = state.find((project) => project.id === projectId);

      if (!project) {
        throw new Error(`Project with id ${projectId} not found`);
      }

      project.todos.push({
        id: crypto.randomUUID(),
        title,
        description,
        completed: false,
        projectId,
      });

      return state;
    },
    deleteTodoById: (state, action: PayloadAction<TodoId>) => {
      const id = action.payload;
      return state.forEach((project) => {
        project.todos = project.todos.filter((todo) => todo.id !== id);
      });
    },
  },
});

export default ProjectSlice.reducer;

export const {
  addNewProject,
  deleteProjectById,
  updateProjectsName,
  addNewTodo,
  deleteTodoById,
} = ProjectSlice.actions;
