import { createSlice, nanoid } from "@reduxjs/toolkit";
import { testQuestions } from "../../helpers/globals";

const initialState = {
  // value: [],
  // value: [testQuestions[0]],
  value: testQuestions,
};
export const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    add: {
      reducer: (state, action) => {
        state.value.push(action.payload);
      },
      prepare: (questionData) => ({
        payload: {
          ...questionData,
          id: questionData?.id ?? nanoid(),
          creationDate: questionData?.creationDate ?? new Date().toISOString(),
        },
      }),
    },
    remove: (state, action) => {
      state.value = state.value.filter((q) => q.id !== action.payload);
    },
    removeAll: (state) => {
      state.value = [];
    },
  },
});
export const { add, remove, removeAll } = questionSlice.actions;
export const selectQuestions = (state) => state.questions.value;
export default questionSlice.reducer;
