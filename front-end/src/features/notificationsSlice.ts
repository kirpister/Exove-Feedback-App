import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { Notification } from "../model/types/notification";
import { fetchNotifications } from "../services/notification";

interface NotificationsState {
  notifications?: Notification[]
}

const initialState: NotificationsState = {
    notifications: undefined
  };

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    saveNotifications(state, action) {
      state.notifications = action.payload.data;
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


export const { saveNotifications } = notificationsSlice.actions;
export default notificationsSlice.reducer;
