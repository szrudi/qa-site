import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getSimulatedFetchThunk, testQuestions } from "../../helpers/globals";

const sliceName = "questions";
export const fetchStates = {
  initial: "initial",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
};
export const initialStateOfQuestionsSlice = {
  list: [],
  status: fetchStates.initial,
  error: null,
};

export const fetchQuestions = createAsyncThunk(
  sliceName + "/fetchQuestions",
  getSimulatedFetchThunk({
    resolveData: { questions: testQuestions },
    errorProb: 0.2,
    delay: 1,
  })
);

export const addQuestion = createAsyncThunk(
  sliceName + "/addQuestion",
  getSimulatedFetchThunk({
    errorProb: 0,
    delay: 1,
    prepare: (questionData) => ({
      ...questionData,
      id: questionData?.id ?? nanoid(),
      creationDate: questionData?.creationDate ?? new Date().toISOString(),
    }),
  })
);

export const questionSlice = createSlice({
  name: sliceName,
  initialState: initialStateOfQuestionsSlice,
  reducers: {
    removeQuestion: (state, action) => {
      state.list = state.list.filter((q) => q.id !== action.payload);
    },
    removeAllQuestions: (state) => {
      state.list = [];
    },
    resetStatus: (state) => {
      state.status = initialStateOfQuestionsSlice.status;
      state.error = initialStateOfQuestionsSlice.error;
    },
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.status = fetchStates.loading;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = fetchStates.succeeded;
      state.list.unshift(...action.payload.questions);
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = fetchStates.failed;
      state.error = action.error.message;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export const {
  removeQuestion,
  removeAllQuestions,
  resetStatus,
} = questionSlice.actions;
export const selectQuestions = (state) => state.questions.list;
export const selectQuestionById = (state, questionId) =>
  state.questions.list.find((q) => q.id === questionId);
export default questionSlice.reducer;
