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
      action.payload.id = nanoid();
      action.payload.creationDate = new Date().toJSON();
      state.value.push(action.payload);
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

