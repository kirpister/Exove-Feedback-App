import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import { UserDetails } from "../common/types/UserDetails";
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

export const { saveUserDetails, setIsLoading } = authenticatedUserSlice.actions;
export default authenticatedUserSlice.reducer;
