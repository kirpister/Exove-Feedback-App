import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../components/form/SingleQuestion";
import sections from "../questions.json";
interface PayloadTypeQuestion {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
}
interface intitalStateType {
  sections?: Array<any>;
  sendQuestion: Array<PayloadTypeQuestion>;
}
const initialState: intitalStateType = {
  ...sections,
  sendQuestion: [],
};
const feedbackSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getSections(state, action) {
      // state.sections = action.payload;
    },
    updateQuestion(state, action: PayloadAction<PayloadTypeQuestion>) {
      // return state.sendQuestion.push(2);
      const temp = action.payload;
      let setUpQuestion: PayloadTypeQuestion = { ...temp, order: Number(state.sendQuestion.length) };
      let temp_1 = { ...state };
      temp_1.sendQuestion.push(setUpQuestion);
      return temp_1;
      // return state.sendQuestion.push(setUpQuestion);
    },
    deleteQuestion(state, action) {},
    correctQuestion(state, payload) {},
  },
});

// export const initializeFeedback = () => {
//   return async (dispatch) => {
//     const countries = await sectionsService.getAll();
//     dispatch(getSections(sections));
//   };
// };

export const { deleteQuestion, correctQuestion, updateQuestion, getSections } = feedbackSlice.actions;

export default feedbackSlice.reducer;
