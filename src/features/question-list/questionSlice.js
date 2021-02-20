import { createSlice, nanoid } from "@reduxjs/toolkit";
import { testQuestions } from "../../helpers/test-util";

const initialState = {
  value: testQuestions ?? [],
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
    removeAll: (state) => {
      state.value = [];
    },
    reset: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { add, removeAll, reset } = questionSlice.actions;
export const selectQuestions = (state) => state.questions.value;
export default questionSlice.reducer;

