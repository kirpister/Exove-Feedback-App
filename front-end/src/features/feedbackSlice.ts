import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../components/form/SingleQuestion";
import questions from "../questions.json";
interface PayloadTypeQuestion {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
}
interface intitalStateType {
  sections?: any;
  sendQuestion: Array<PayloadTypeQuestion>;
}
const initialState: intitalStateType = {
  sections: [...questions.sections],
  sendQuestion: [],
};
const feedbackSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getSections(state, action) {
    },
    updateQuestion(state, action: PayloadAction<PayloadTypeQuestion>) {
      const temp = action.payload;
      let setUpQuestion: PayloadTypeQuestion = { ...temp, order: Number(state.sendQuestion.length + 1) };
      state.sendQuestion.push(setUpQuestion)
    },
    deleteQuestion(state, action) {},
    correctQuestion(state, payload) {},
  },
});


export const { deleteQuestion, correctQuestion, updateQuestion, getSections } = feedbackSlice.actions;

export default feedbackSlice.reducer;
