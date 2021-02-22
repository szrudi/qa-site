import { createSlice, nanoid } from "@reduxjs/toolkit";
import { testQuestions } from "../../helpers/globals";

const initialState = {
  // list: [],
  // list: [testQuestions[0]],
  list: testQuestions,
};
export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    addQuestion: {
      reducer: (state, action) => {
        state.list.push(action.payload);
      },
      prepare: (questionData) => ({
        payload: {
          ...questionData,
          id: questionData?.id ?? nanoid(),
          creationDate: questionData?.creationDate ?? new Date().toISOString(),
        },
      }),
    },
    removeQuestion: (state, action) => {
      state.list = state.list.filter((q) => q.id !== action.payload);
    },
    removeAllQuestions: (state) => {
      state.list = [];
    },
  },
});

export const { addQuestion, removeQuestion, removeAllQuestions } = questionSlice.actions;
export const selectQuestions = (state) => state.questions.list;
export const selectQuestionById = (state, questionId) =>
  state.questions.list.find((q) => q.id === questionId);

export default questionSlice.reducer;
