import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../app/store";
import { FinalConfirmationType, PayloadTypeQuestion } from "./feedbackSlice";
import { showLoading2s } from "./loadingSlicer";
export interface AnswerType<T, N> {
  details: Array<{
    answer: Array<string>;
    question: {
      type: T;
      title: T;
      order: N;
      required: boolean;
    };
  }>;
  user: {
    [x: string]: any;
    id: T;
    personalDetail: {
      email: T;
      firstName: T;
      phone: T;
      surName: T;
    };
  };
  finished: boolean;
}
export interface CreatedFeebackType extends FinalConfirmationType {
  id: string;
  createdBy: {
    id: string;
    personalDetail: {
      email: string;
    };
  };
  createAt: string;
  updatedAt: string;
  answers: Array<AnswerType<string, number>>;
}
interface initialStateType {
  allCreatedFeedback: Array<CreatedFeebackType>;
}
const initialState: initialStateType = {
  allCreatedFeedback: [],
};

const createdFeedbackSlicer = createSlice({
  name: "created_feedback",
  initialState,
  reducers: {
    setAllFeedback(state, action) {
      state.allCreatedFeedback = action.payload;
    },
    resetAllFeedback: () => {
      return { ...initialState };
    },
  },
});

export const getAllFeedbackAPI = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data, status } = await axios.get("/feedback");
      dispatch(setAllFeedback(data.data));
    } catch (error) {}
  };
};

export const deleteFeedbackAPI = (feedbackId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data, status } = await axios.delete(`/feedback?feedbackId=${feedbackId}`);
      if (status === 200) {
        alert(`${data.msg}`);
      }
      showLoading2s(dispatch);
      await dispatch(getAllFeedbackAPI());
    } catch (error) {
      alert(error);
    }
  };
};
export const { setAllFeedback, resetAllFeedback } = createdFeedbackSlicer.actions;
export default createdFeedbackSlicer.reducer;
