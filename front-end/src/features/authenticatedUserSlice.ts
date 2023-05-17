import { createSlice } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { UserDetails } from "../common/types/UserDetails";
import { personalDetailType } from "../model/types/user";
import { logoutSession } from "../services/logout";
import { fetchUserPersonalDetails } from "../services/user";
import { validateSession } from "../services/validate";
import { resetUserList } from "./alluserSlicer";
import { setFeedbackRequest } from "./answerFeedbackSlicer";
import { resetAllFeedback } from "./createdFeedbackSlicer";
import { resetFeedback } from "./feedbackSlice";
import { resetNotifications } from "./notificationsSlice";
import { setAllRequestFeedback } from "./requestFeedback";
import { resetFeedbackRequestList } from "./requestUserListSlicer";

interface AuthenticatedUserState {
  userDetails: UserDetails | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
  personalDetails: personalDetailType | undefined;
}

const initialState: AuthenticatedUserState = {
  userDetails: undefined,
  isLoading: true,
  isLoggedIn: false,
  personalDetails: undefined,
};

export const authenticatedUserSlice = createSlice({
  name: "authenticatedUser",
  initialState: initialState,
  reducers: {
    saveUserDetails(state, action) {
      state.userDetails = action.payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    savePersonalDetails(state, action) {
      state.personalDetails = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    logout(state) {
      state.userDetails = undefined;
      state.isLoading = false;
      state.isLoggedIn = false;
    },
  },
});

export const initiateValidateSession = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { status, data } = await validateSession();
      if (status === 200) {
        dispatch(saveUserDetails(data));
        dispatch(initiateFetchingUserPersonalDetails())
      }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
};

export const initiateFetchingUserPersonalDetails = () => {
  return async (dispatch: AppDispatch) => {
    try {
        const response = await fetchUserPersonalDetails();
        if(response.status === 200) {
          dispatch(savePersonalDetails(response.data.data));
          dispatch(setFeedbackRequest(response.data.data.feedBack))
          dispatch(setAllRequestFeedback(response.data.data.selfFeedbackRequests));
        }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
}

export const initiateLogoutSession = (navigagte: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { status } = await logoutSession();
      if (status === 200) {
        dispatch(logout());
        dispatch(resetNotifications());
        dispatch(resetUserList());
        dispatch(resetAllFeedback());
        dispatch(resetFeedback());
        dispatch(resetFeedbackRequestList());
        navigagte("/");
      }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
};

export const { saveUserDetails, setIsLoading, logout, savePersonalDetails } =
  authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
