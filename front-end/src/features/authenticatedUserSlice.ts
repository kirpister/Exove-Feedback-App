import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../app/store";
import { UserDetails } from "../common/types/UserDetails";
import { logoutSession } from "../services/logout";
import { fetchUserPersonalDetails } from "../services/user";
import { validateSession } from "../services/validate";
import { resetUserList } from "./alluserSlicer";
import { resetAllFeedback } from "./createdFeedbackSlicer";
import { resetFeedback } from "./feedbackSlice";
import { resetNotifications } from "./notificationsSlice";
import { resetFeedbackRequestList } from "./requestUserListSlicer";
import { DataType, personalDetailType } from "../model/types/user";
import { setFeedbackRequest } from "./answerFeedbackSlicer";
import { setAllRequestFeedback } from "./requestFeedback";
import axios from "axios";

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
    setPersonalDetail(state, action: PayloadAction<personalDetailType>) {
      state.personalDetails = action.payload;
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
        const {data,status} = await fetchUserPersonalDetails();
        if(status === 200) {
          dispatch(savePersonalDetails(data.data));
          dispatch(setFeedbackRequest(data.data.feedBack))
          dispatch(setAllRequestFeedback(data.data.selfFeedbackRequests));
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
export const getPersonalDetailAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      axios.get<personalDetailType>("/user").then((res) => {
        const { data, status } = res;
        const user = data.data;
        // setUsers({ ...user });
        dispatch(setPersonalDetail(user));
        dispatch(setFeedbackRequest(user?.feedBack));
        dispatch(setAllRequestFeedback(user.selfFeedbackRequests));
      });
    } catch (error) {}
  };
};
export const { saveUserDetails, setIsLoading, logout, setPersonalDetail,savePersonalDetails} = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
