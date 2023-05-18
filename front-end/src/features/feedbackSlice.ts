import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../components/form/SingleQuestion";
import questions from "../questions.json";
import axios, { AxiosError } from "axios";
import { AppDispatch } from "../app/store";
import { showLoading2s } from "./loadingSlicer";
import { NavigateFunction } from "react-router-dom";
import { getAllFeedbackAPI } from "./createdFeedbackSlicer";
export interface PayloadTypeQuestion {
  order?: number;
  result?: [string];
  type: QuestionType;
  title: string;
  required?: boolean;
  section?: string;
}
export interface FinalConfirmationType {
  details: {
    questions: Array<PayloadTypeQuestion>;
    title: string;
  };
  userList: Array<string>;
  requestedListBy: string;
}
const createSendAllQuestion = (
  sections: Array<{
    name: string;
    id: number;
    questions: Array<{ question: string; isFreeForm: boolean }>;
  }>
) => {
  let order = 0;
  let returnSendQuestion: Array<PayloadTypeQuestion> = [];
  for (let i of sections) {
    for (let j of i.questions) {
      order++;
      let tempQuestion: PayloadTypeQuestion = {
        title: j.question,
        type: j.isFreeForm ? QuestionType.freeString : QuestionType.range,
        order,
        section: i.name,
        required: true,
      };
      returnSendQuestion.push(tempQuestion);
    }
  }
  return returnSendQuestion;
};
const restoreSendFeedback = () => {
  let sendQuestion = localStorage.getItem("sendquestion");
  if (sendQuestion !== null) {
    return JSON.parse(sendQuestion);
  }
  return [];
};
const setUpSectionWithOrder = () => {
  let sections = localStorage.getItem("section");
  if (sections !== null) {
    return JSON.parse(sections);
  } else {
    return [...questions.sections];
  }
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
      const index = state.sendQuestion.findIndex((e) => e.order === temp.order);
      if (index === -1) {
        let setUpQuestion: PayloadTypeQuestion = {
          ...temp,
          // order: temp.order,
          required: true,
        };
        for (let i of state.sections) {
          for (let j of i.questions) {
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
    setUpUserList(
      state,
      action: PayloadAction<PayloadTypeCreateUserList<string>>
    ) {
      const { listUserId, requestedListBy } = action.payload;
      return {
        ...state,
        listUserId: listUserId,
        requestedListBy: requestedListBy,
      };
    },
    setUpConfirmation(state, action: PayloadAction<FinalPayloadType<string>>) {
      if (typeof state.requestedListBy === "string") {
        if (state.sendQuestion.length > 0) {
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
          alert("please add the form");
        }
      } else {
        alert("Please insert requestList Id when you create feedback");
      }
    },
    setUpSelectAllQuestion(state) {
      if (state.sendQuestion.length === 0) {
        state.sendQuestion = createSendAllQuestion(state.sections);
      } else {
        let excludeAlreadySendQuestions: Array<PayloadTypeQuestion> = [];
        for (let i of createSendAllQuestion(state.sections)) {
          for (let j of state.sendQuestion) {
            if (i.order !== j.order) {
              excludeAlreadySendQuestions.push(i);
            } else {
              excludeAlreadySendQuestions.push(j);
            }
          }
        }
        state.sendQuestion = [...excludeAlreadySendQuestions];
      }
    },
    removeSendQuestion(state, action: PayloadAction<{ order: number }>) {
      const sendQuestionLocal = localStorage.getItem("sendquestion");
      if (sendQuestionLocal !== null) {
        let data = JSON.parse(sendQuestionLocal);
        let index = data.findIndex(
          (e: { order: number }) =>
            Number(e.order) === Number(action.payload.order)
        );
        if (index !== -1) {
          data.splice(index, 1);
          localStorage.setItem("sendquestion", JSON.stringify(data));
          state.sendQuestion = restoreSendFeedback();
        }
      } else {
        let index = state.sendQuestion.findIndex(
          (e) => Number(e.order) === Number(action.payload.order)
        );
        if (index !== -1) {
          state.sendQuestion.splice(index, 1);
        }
      }
    },
    resetFeedback: () => {
      return {
        sections: setUpSectionWithOrder(),
        sendQuestion: restoreSendFeedback(),
        listUserId: [],
        requestedListBy: null,
      };
    },
  },
});

export const createFeedbackAPI = async (
  confirmFeedback: FinalConfirmationType,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  console.log("call api");
  showLoading2s(dispatch);
  try {
    const { data, status } = await axios.post("/feedback", confirmFeedback);
    if (status === 201) {
      showLoading2s(dispatch);
      alert(`feedback request list created`);
      await dispatch(getAllFeedbackAPI());
      navigate("/allfeedbacks");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      alert(error?.response?.data.err.msg);
    }
  }
};
export const {
  updateQuestion,
  getSections,
  setUpConfirmation,
  setUpUserList,
  resetFeedback,
  setUpSelectAllQuestion,
  removeSendQuestion,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
