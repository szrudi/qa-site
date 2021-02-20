import {createSlice, nanoid} from "@reduxjs/toolkit";

import { testQuestions } from "../../helpers/test-util";

export const questionSlice = createSlice({
  name: "questions",
  // initialState: [testQuestions[0]],
  initialState: testQuestions,
  // initialState: [],
  reducers: {
    add: (state, action) => {
      action.payload.id = nanoid();
      action.payload.creationDate = new Date();
      state.push(action.payload);
    },
  },
});

export const { add } = questionSlice.actions;
export const selectQuestions = (state) => state.questionList;
export default questionSlice.reducer;
