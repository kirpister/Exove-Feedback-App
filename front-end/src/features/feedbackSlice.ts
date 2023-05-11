import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../components/form/SingleQuestion";
import questions from "../questions.json";
import axios from "axios";
import { AppDispatch } from "../app/store";
import { showLoading2s } from "./loadingSlicer";
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
const createSendAllQuestion = (sections: Array<{ name: string; id: number; questions: Array<{ question: string; isFreeForm: boolean }> }>) => {
  let order = 0;
  let returnSendQuestion: Array<PayloadTypeQuestion> = [];
  for (let i of sections) {
    for (let j of i.questions) {
      order++;
      let tempQuestion: PayloadTypeQuestion = {
        title: j.question,
        type: j.isFreeForm ? QuestionType.freeString : QuestionType.range,
        order,
        required: true,
      };
      returnSendQuestion.push(tempQuestion);
    }
  }
  return returnSendQuestion;
};
const restoreSendFeedback = () => {
  let sendQuestion = localStorage.getItem("sendquestion");
  if (sendQuestion) {
    return JSON.parse(sendQuestion);
  }
  return [];
};
const setUpSectionWithOrder = () => {
  let order = 0;
  let temp = [...questions.sections];
  for (let i of temp) {
    for (let j of i.questions) {
      order++;
      j.order = order;
    }
  }
  return temp;
};
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
  // sections: createSendAllQuestion(questions.sections),
  sections: setUpSectionWithOrder(),
  sendQuestion: restoreSendFeedback(),
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
        for (let i of state.sections) {
          for (let j of i.question) {
            if (j.order === temp.order) {
              j.question = temp.title;
            }
          }
        }
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
    setUpSelectAllQuestion(state) {
      state.sendQuestion = createSendAllQuestion(state.sections);
    },
    resetFeedback: () => {
      return { sections: [...questions.sections], sendQuestion: [], listUserId: [], requestedListBy: null };
    },
  },
});

export const createFeedbackAPI = async (confirmFeedback: FinalConfirmationType,dispatch:AppDispatch) => {
  try {
    const { data, status } = await axios.post("/feedback", confirmFeedback);

    if (status === 201) {
      showLoading2s(dispatch)
      alert(`feedback with requestList Id ${confirmFeedback.requestedListBy} created`);
    }
  } catch (error) {
    console.log(error);
  }
};
export const { updateQuestion, getSections, setUpConfirmation, setUpUserList, resetFeedback, setUpSelectAllQuestion } = feedbackSlice.actions;

export default feedbackSlice.reducer;
