import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../app/store";
import { FinalConfirmationType, PayloadTypeQuestion } from "./feedbackSlice";
import { showLoading2s } from "./loadingSlicer";
import { personalRequestListType } from "../model/types/requestList";
import { getPersonalDetailAPI } from "./authenticatedUserSlice";

interface initialStateType {
  selfFeedbackRequests: Array<{
    requestFeedbackId: {
      id: string;
      createdAt: string;
      opened: boolean;
      userList: Array<string>;
      requestUserId: string;
      createFeedbackId: null | string;
    };
  }>;
}
interface selfFeedbackRequest {
  requestFeedbackId: {
    id: string;
    createdAt: string;
    opened: boolean;
    userList: Array<string>;
  }
}
export interface requestFeedback {
  selfFeedbackRequests: selfFeedbackRequest[];
}

const initialState: initialStateType = {
  selfFeedbackRequests: [],
};

const createdRequestFeedbackSlicer = createSlice({
  name: "createdRequestFeedback",
  initialState,
  reducers: {
    setAllRequestFeedback(
      state,
      action: PayloadAction<
        Array<{
          requestFeedbackId: {
            id: string;
            createdAt: string;
            opened: boolean;
            userList: Array<string>;
            requestUserId: string;
            createFeedbackId: null | string;
          };
        }>
      >
    ) {
      state.selfFeedbackRequests = action.payload;
    },
  },
});

export const deleteRequestFeedbackAPI = (id: string) => {
  return async (dispatch: AppDispatch) => {
    const { data, status } = await axios.delete(`user/feedback_request?requestListId=${id}`);
    if (status === 200) {
      showLoading2s(dispatch);
      alert("success delete");
      dispatch(getPersonalDetailAPI());
    }
  };
};

export const { setAllRequestFeedback } = createdRequestFeedbackSlicer.actions;
export default createdRequestFeedbackSlicer.reducer;
