import { configureStore } from '@reduxjs/toolkit';
import gradesSlice from '../slices/gradesSlice';



export const store = configureStore({
  reducer: {
    dataSource: gradesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;