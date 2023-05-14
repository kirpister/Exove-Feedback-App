import { createSlice, current } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { Notification } from "../model/types/notification";
import { fetchNotifications } from "../services/notification";

interface NotificationsState {
  notifications?: Notification[];
}

const initialState: NotificationsState = {
  notifications: undefined,
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    saveNotifications(state, action) {
      state.notifications = action.payload.data;
    },
    resetNotifications: () => {
      return { ...initialState };
    },
    markNotificationAsRead: (state, action) => {
      // const copiedState = current(state);
      if (!state.notifications) {
        return state;
      }
      const matchedNotificationIndex = state.notifications.findIndex(
        (item) => item._id === action.payload
      );
      state.notifications[matchedNotificationIndex].isRead = true;
    },
    deleteNotification: (state, action) => {
      // const copiedState = current(state);
      if (!state.notifications) {
        return state;
      }
      const matchedNotificationIndex = state.notifications.findIndex(
        (item) => item._id === action.payload
      );
      state.notifications.splice(matchedNotificationIndex,1);
    },
  },
});

export const initiateFetchNotifications = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { status, data } = await fetchNotifications();
      if (status === 200) {
        dispatch(saveNotifications(data));
      }
    } catch (error) {
      dispatch(saveNotifications([]));
    }
  };
};

export const { saveNotifications, resetNotifications, markNotificationAsRead, deleteNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
