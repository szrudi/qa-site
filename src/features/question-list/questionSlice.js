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
    add: (state, action) => {
      state.value.push({
        ...action.payload,
        id: nanoid(),
        creationDate: new Date().toJSON(),
      });
    },
    remove: (state, action) => {
      state.value = state.value.filter((q) => q.id !== action.payload);
    },
    removeAll: (state) => {
      state.value = [];
    },
    reset: (state, action) => {
      state.value = action.payload ?? initialState.value;
    },
  },
});
export const { add, remove, removeAll, reset } = questionSlice.actions;
export const selectQuestions = (state) => state.questions.value;
export default questionSlice.reducer;

