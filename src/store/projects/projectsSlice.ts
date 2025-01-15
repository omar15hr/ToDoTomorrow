import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProjectState {
  id: string;
  name: string;
}

const initialState: ProjectState[] = [];

export const ProjectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<{ id: string, name: string }>) => {
      state.push(action.payload);
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state = state.filter(project => project.id !== action.payload);
    },
    updateProject: (state, action: PayloadAction<{ id: string, name: string }>) => {
      const projectIndex = state.findIndex(project => project.id === action.payload.id);
      state[projectIndex].name = action.payload.name;
    },
  },
})

export const { addNewProject, deleteProject, updateProject } = ProjectSlice.actions

export default ProjectSlice.reducer