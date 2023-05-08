import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../app/store";
import axios from "axios";
import { personalRequestListType } from "../model/types/requestList";
import { useParams, useNavigate } from "react-router-dom";

interface intitalStateType {
  requestLists: Array<personalRequestListType>;
  selectedRequesList?: personalRequestListType;
}

const initialState: intitalStateType = {
  requestLists: [],
};

const requestListSlicer = createSlice({
  name: "userlistSlicer",
  initialState,
  reducers: {
    getALlRequestUserlist(
      state,
      action: PayloadAction<Array<personalRequestListType>>
    ) {
      state.requestLists = action.payload;
    },
    setUpSelectRequestList(state, action: PayloadAction<{ id: string }>) {
      const selectList = state.requestLists.find(
        (e) => e.id === action.payload.id
      );
      state.selectedRequesList = selectList;
    },
    editSelectRequestList(
      state,
      action: PayloadAction<personalRequestListType>
    ) {
      state.selectedRequesList = action.payload;
    },
    resetFeedbackRequestList: () => {
      return { ...initialState };
    },
  },
});

export const getAllRequestUserListAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data, status } = await axios.get("/feedback/requested_feedback");
      if (status === 200) {
        dispatch(getALlRequestUserlist(data.data));
      }
    } catch (error) {}
  };
};

export const {
  getALlRequestUserlist,
  setUpSelectRequestList,
  resetFeedbackRequestList,
} = requestListSlicer.actions;
export default requestListSlicer.reducer;
