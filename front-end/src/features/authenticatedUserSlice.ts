import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { UserDetails } from "../common/types/UserDetails";
import { logoutSession } from "../services/logout";
import { validateSession } from "../services/validate";

interface AuthenticatedUserState {
  userDetails: UserDetails | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
}

const initialState: AuthenticatedUserState = {
  userDetails: undefined,
  isLoading: true,
  isLoggedIn: false,
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
      }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
};

export const initiateLogoutSession = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { status } = await logoutSession();
      if (status === 200) {
        dispatch(logout());
      }
    } catch (error) {
      dispatch(setIsLoading(false));
    }
  };
};

export const { saveUserDetails, setIsLoading, logout } =
  authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
