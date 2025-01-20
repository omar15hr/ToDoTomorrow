import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// const DEFAULT_STATE = [
//   {
//     id: "1",
//     name: "Project 1",
//     todos: [
//       {
//         id: "1",
//         title: "To do 1",
//         projectId: "1",
//       },
//       {
//         id: "2",
//         title: "To do 2",
//         projectId: "1",
//       },
//       {
//         id: "3",
//         title: "To do 3",
//         projectId: "1",
//       }
//     ],
//   },
//   {
//     id: "2",
//     name: "Project 2",
//     todos: [
//       {
//         id: "3",
//         title: "To do 3",
//         projectId: "2",
//       },
//       {
//         id: "4",
//         title: "To do 4",
//         projectId: "2",
//       }
//     ],
//   },
//   {
//     id: "3",
//     name: "Project 3",
//     todos: [],
//   },
// ]

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
  id: TodoId;
  title: string;
  description: string;
  completed: boolean;
  projectId: ProjectId;
}

const initialState: ProjectWithId[] = (() => {
  const persistedState = localStorage.getItem('__redux__state__');
    return persistedState ? JSON.parse(persistedState).projects: [];
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
    updateProjectsName: (state, action: PayloadAction<{id: ProjectId, name: string}>) => {
      const {id, name} = action.payload;
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
    // updateTodo: (state, action: PayloadAction<Todo>) => {

    // },
    // deleteTodoById: (state, action: PayloadAction<Todo>) => {

    // },
  }
});

export default ProjectSlice.reducer;

export const { addNewProject, deleteProjectById, updateProjectsName, addNewTodo } = ProjectSlice.actions;