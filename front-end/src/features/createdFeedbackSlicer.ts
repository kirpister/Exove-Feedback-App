import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../app/store";
import { FinalConfirmationType, PayloadTypeQuestion } from "./feedbackSlice";
export interface AnswerType<T, N> {
  details: Array<{
    answers: Array<string>;
    question: {
      type: T;
      title: T;
      order: N;
      required: boolean;
    };
  }>;
  user: {
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

export const { setAllFeedback, resetAllFeedback } =
  createdFeedbackSlicer.actions;
export default createdFeedbackSlicer.reducer;
