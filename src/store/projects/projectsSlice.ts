import { createSlice } from "@reduxjs/toolkit";

export interface Project {
  name: string;
}

export interface ProjectWithId extends Project {
  id: string;
}

const initialState: ProjectWithId[] = [];

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addNewProject: (state, action) => {
      return [...state, action.payload];
    },
    deleteProjectById: (state, action) => {
      const id = action.payload;
      return state.filter((project) => project.id !== id);
    }
  },
});

export default ProjectSlice.reducer;

export const { addNewProject, deleteProjectById } = ProjectSlice.actions;