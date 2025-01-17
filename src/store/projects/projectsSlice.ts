import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Project 1",
  },
  {
    id: "2",
    name: "Project 2",
  },
  {
    id: "3",
    name: "Project 3",
  },
]

export type ProjectId = string;

export interface Project {
  name: string;
}

export interface ProjectWithId extends Project {
  id: ProjectId;
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
    }
  },
});

export default ProjectSlice.reducer;

export const { addNewProject, deleteProjectById } = ProjectSlice.actions;