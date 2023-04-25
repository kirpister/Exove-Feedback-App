import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//import feedBackSlicer from '../features/feedBackSlicer';
import feedbackSlice from "../features/feedbackSlice";
export const store = configureStore({
  reducer: {
    //feedBack: feedBackSlicer
    feedback: feedbackSlice,
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
