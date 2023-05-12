import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";

interface intitalStateType {
  show: boolean;
}

const initialState: intitalStateType = {
  show: false,
};

const createLoadingSlicer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    enableLoading(state) {
      state.show = true;
    },
    disaleLoading(state) {
      state.show = false;
    },
  },
});

export const showLoading2s = (dispatch: AppDispatch) => {
  dispatch(enableLoading());
  setTimeout(() => {
    dispatch(disaleLoading());
  }, 2000);
};

export const { disaleLoading, enableLoading } = createLoadingSlicer.actions;
export default createLoadingSlicer.reducer;
