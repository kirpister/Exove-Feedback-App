import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
  },
  reducers: {
    deleteQuestion(state, payload) {},
    correctQuestion(state, payload) {},
  },
});
