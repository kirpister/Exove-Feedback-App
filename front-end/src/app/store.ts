import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import feedBackSlicer from '../features/feedBackSlicer';
export const store = configureStore({
  reducer: {
    feedBack: feedBackSlicer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
