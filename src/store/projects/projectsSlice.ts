import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Project 1",
    todos: [],
  },
  {
    id: "2",
    name: "Project 2",
    todos: [],
  },
  {
    id: "3",
    name: "Project 3",
    todos: [],
  },
]

export type ProjectId = string;

export interface Project {
  name: string;
  todos: Todo[];
}

export interface ProjectWithId extends Project {
  id: ProjectId;
}

export type TodoId = string;

export interface Todo {
  title: string;
  projectId: ProjectId;
}

export interface TodoWithId extends Todo {
  id: TodoId;
}

const initialState: ProjectWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__');
  if (persistedState) {
    return JSON.parse(persistedState).projects;
  }
  return DEFAULT_STATE;
})();

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
    updateProject: (state, action: PayloadAction<Project>) => {

    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      const { projectId } = action.payload;
      const project = state.find((project) => project.id === projectId);

      if (!project) {
        throw new Error(`Project with id ${projectId} not found`);
      }

      project.todos.push({
        ...action.payload,
      });
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {

    },
    deleteTodo: (state, action: PayloadAction<Todo>) => {

    },
  }
});

export default ProjectSlice.reducer;

export const { addNewProject, deleteProjectById, addTodo } = ProjectSlice.actions;