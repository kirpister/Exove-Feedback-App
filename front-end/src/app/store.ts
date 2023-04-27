import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
//import feedBackSlicer from "../features/feedBackSlicer";
import feedbackSlice from "../features/feedbackSlice";
import authenticatedUserSlicer from "../features/authenticatedUserSlice";

export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserSlicer,
    //feedBack: feedBackSlicer,
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
