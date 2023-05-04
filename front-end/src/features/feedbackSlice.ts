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
  requestedListBy: string;
}
interface FinalPayloadType<T> {
  createdBy: T;
  tittle: T;
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
      let setUpQuestion: PayloadTypeQuestion = {
        ...temp,
        order: Number(state.sendQuestion.length + 1),
        required: true,
      };
      state.sendQuestion.push(setUpQuestion);
    },
    setUpUserList(state, action: PayloadAction<PayloadTypeCreateUserList<string>>) {
      const { listUserId, requestedListBy } = action.payload;
      // state.listUserId = action.payload.listUserId;
      return { ...state, listUserId: listUserId, requestedListBy: requestedListBy };
    },
    setUpConfirmation(state, action: PayloadAction<FinalPayloadType<string>>) {
      if (typeof state.requestedListBy === "string") {
        let temp: FinalConfirmationType = {
          details: {
            questions: state.sendQuestion,
            title: action.payload.tittle,
          },
          userList: state.listUserId,
          requestedListBy: state.requestedListBy,
        };
        state.finalConfirm = temp;
      } else {
        alert("Please insert requestList Id when you create feedback");
      }
    },
  },
});

export const createFeedbackAPI = async (confirmFeedback: FinalConfirmationType) => {
  console.log("call API");
  console.log(confirmFeedback);
  try {
    const { data, status } = await axios.post("/feedback", confirmFeedback);
    console.log(data);
    if (status === 201) {
      alert(`feedback with requestList Id ${confirmFeedback.requestedListBy} created`);
    }
  } catch (error) {
    console.log(error);
  }
};
export const { updateQuestion, getSections, setUpConfirmation, setUpUserList } = feedbackSlice.actions;

export default feedbackSlice.reducer;
