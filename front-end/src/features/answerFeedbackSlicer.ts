import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { QuestionType } from "../components/form/SingleQuestion";
import { stat } from "fs";
export interface answerFeedback { 
 feedBack?:Array<{
    feedbackId: {
        id: string; 
        details: {
            title: string;
            question: Array<{ order: number; required: boolean; type: QuestionType; title: string }> } 
    };
    finished: boolean;
  }>;
}
interface initialStateType {
  feedbackRequest: Array<{
    feedbackId: {
      id: string;
      details: {
        title: string;
        questions: Array<{ order: number; required: boolean; type: QuestionType; title: string }>;
      };
    };
    finished: boolean;
  }>;
}

const initialState:initialStateType = {
    feedbackRequest: []
};

const answerFeedbackSlicer = createSlice({
  name: "answer_feedback",
  initialState,
  reducers: {
    setFeedbackRequest  (state, action){ 
        state.feedbackRequest = action.payload
    }
  },
});



export const { setFeedbackRequest} = answerFeedbackSlicer.actions
export default answerFeedbackSlicer.reducer


