import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackType } from "../common/types/UserDetails";
import { QuestionType } from "../components/form/SingleQuestion";
import questions from "../questions.json";
import axios from "axios";
interface PayloadTypeQuestion {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
  required?: boolean;
}
interface FinalConfirmationType {
  details: {
    questions: Array<PayloadTypeQuestion>;
    title: string;
  };
  userList: Array<string>;
  createdBy: string;
}
interface FinalPayloadType<T> {
  createdBy: T;
  tittle: T;
}
interface intitalStateType {
  sections?: any;
  sendQuestion: Array<PayloadTypeQuestion>;
  listUserId: Array<string>;
  finalConfirm?: FinalConfirmationType;
}
const initialState: intitalStateType = {
  sections: [...questions.sections],
  sendQuestion: [],
  listUserId: [],
};
const feedbackSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getSections(state, action) {},
    updateQuestion(state, action: PayloadAction<PayloadTypeQuestion>) {
      const temp = action.payload;
      let setUpQuestion: PayloadTypeQuestion = {
        ...temp,
        order: Number(state.sendQuestion.length + 1),
      };
      state.sendQuestion.push(setUpQuestion);
    },
    setUpUserList(state, action: PayloadAction<Array<string>>) {
      state.listUserId = action.payload;
    },
    setUpConfirmation(state, action: PayloadAction<FinalPayloadType<string>>) {
      let temp: FinalConfirmationType = {
        createdBy: action.payload.createdBy,
        details: {
          questions: state.sendQuestion,
          title: action.payload.tittle,
        },
        userList: state.listUserId,
      };
      state.finalConfirm = temp;
    },
  },
});

export const createFeedbackAPI = async (confirmFeedback: FinalConfirmationType) => {
  console.log("call API");
  console.log(confirmFeedback);
  try {
    const { data, status } = await axios.post("/feedback", confirmFeedback);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export const { updateQuestion, getSections, setUpConfirmation, setUpUserList } = feedbackSlice.actions;

export default feedbackSlice.reducer;
