import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import feedbackSlice from "../features/feedbackSlice";
import authenticatedUserSlicer from "../features/authenticatedUserSlice";
import alluserSlicer from "../features/alluserSlicer";
import createdFeedbackSlicer from "../features/createdFeedbackSlicer";
import notificationsSlice from "../features/notificationsSlice";

export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserSlicer,
    feedback: feedbackSlice,
    allUser: alluserSlicer,
    createdFeedback: createdFeedbackSlicer,
    userNotifications: notificationsSlice,
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
