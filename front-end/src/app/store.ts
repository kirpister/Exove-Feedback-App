import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import feedbackSlice from "../features/feedbackSlice";
import authenticatedUserSlicer from "../features/authenticatedUserSlice";
import alluserSlicer from "../features/alluserSlicer";
import createdFeedbackSlicer from "../features/createdFeedbackSlicer";
import notificationsSlice from "../features/notificationsSlice";
import requestUserListSlicer from "../features/requestUserListSlicer";
import answerFeedbackSlicer from "../features/answerFeedbackSlicer";
import createLoadingSlicer from '../features/loadingSlicer'
export const store = configureStore({
  reducer: {
    authenticatedUser: authenticatedUserSlicer,
    feedback: feedbackSlice,
    allUser: alluserSlicer,
    createdFeedback: createdFeedbackSlicer,
    userNotifications: notificationsSlice,
    requestUserlist: requestUserListSlicer,
    answerFeedback: answerFeedbackSlicer,
    loading: createLoadingSlicer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
