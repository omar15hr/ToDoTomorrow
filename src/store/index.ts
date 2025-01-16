import { configureStore } from '@reduxjs/toolkit'
import { ProjectSlice } from './projects/projectsSlice'

export const store = configureStore({
  reducer: {
    projects: ProjectSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch