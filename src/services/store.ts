import { configureStore } from '@reduxjs/toolkit';
import equipmentsReducer from './equipmentsSlice';

const store = configureStore({
  reducer: {
    equipments: equipmentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
