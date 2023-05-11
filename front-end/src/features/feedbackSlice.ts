import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../components/form/SingleQuestion";
import questions from "../questions.json";
import axios from "axios";
export interface PayloadTypeQuestion {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
  required?: boolean;
}
export interface FinalConfirmationType {
  details: {
    questions: Array<PayloadTypeQuestion>;
    title: string;
  };
  userList: Array<string>;
  requestedListBy: string;
}
interface FinalPayloadType<T> {
  title: T;
}
interface PayloadTypeCreateUserList<T> {
  requestedListBy: T;
  listUserId: Array<T>;
}
interface intitalStateType {
  sections?: any;
  sendQuestion: Array<PayloadTypeQuestion>;
  listUserId: Array<string>;
  finalConfirm?: FinalConfirmationType;
  requestedListBy: string | null;
}
const initialState: intitalStateType = {
  sections: [...questions.sections],
  sendQuestion: [],
  listUserId: [],
  requestedListBy: null,
};
const feedbackSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    getSections(state, action) {},
    updateQuestion(state, action: PayloadAction<PayloadTypeQuestion>) {
      const temp = action.payload;
      const index = state.sendQuestion.findIndex((e) => e.title === temp.title);
      if (index === -1) {
        let setUpQuestion: PayloadTypeQuestion = {
          ...temp,
          order: Number(state.sendQuestion.length + 1),
          required: true,
        };
        state.sendQuestion.push(setUpQuestion);
      } else {
        alert(`can not add question with order ${temp.title}`);
      }
    },
    setUpUserList(state, action: PayloadAction<PayloadTypeCreateUserList<string>>) {
      const { listUserId, requestedListBy } = action.payload;
      return {
        ...state,
        listUserId: listUserId,
        requestedListBy: requestedListBy,
      };
    },
    setUpConfirmation(state, action: PayloadAction<FinalPayloadType<string>>) {
      if (typeof state.requestedListBy === "string") {
        let temp: FinalConfirmationType = {
          details: {
            questions: state.sendQuestion,
            title: action.payload.title,
          },
          userList: state.listUserId,
          requestedListBy: state.requestedListBy,
        };
        state.finalConfirm = temp;
      } else {
        alert("Please insert requestList Id when you create feedback");
      }
    },
    setUpAllQuestion(state) {
      let order = 0;
      state.sendQuestion = [];
      for (let i of state.sections) {
        for ( let j of i.questions) { 
          console.log(j)
        }
      }
    },
    resetFeedback: () => {
      return { sections: [...questions.sections], sendQuestion: [], listUserId: [], requestedListBy: null };
    },
  },
});

export const createFeedbackAPI = async (confirmFeedback: FinalConfirmationType) => {
  try {
    const { data, status } = await axios.post("/feedback", confirmFeedback);
    if (status === 201) {
      alert(`feedback with requestList Id ${confirmFeedback.requestedListBy} created`);
    }
  } catch (error) {
    console.log(error);
  }
};
export const { updateQuestion, getSections, setUpConfirmation, setUpUserList, resetFeedback ,setUpAllQuestion} = feedbackSlice.actions;

export default feedbackSlice.reducer;
