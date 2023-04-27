import { createSlice } from "@reduxjs/toolkit";

const feedbackSlice = createSlice({
  name: "sections",
  initialState: {
    sections: [],
  },
  reducers: {
    getSections(state, action) {
      state.sections = action.payload;
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

export const { deleteQuestion, correctQuestion } = feedbackSlice.actions;

export default feedbackSlice.reducer;
