import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { getSimulatedFetchThunk, testQuestions } from "../../helpers/globals";

const sliceName = "questions";
export const fetchStates = {
  initial: "initial",
  loading: "loading",
  succeeded: "succeeded",
  failed: "failed",
};

export const questionAdapter = createEntityAdapter();
export const initialStateOfQuestionsSlice = questionAdapter.getInitialState({
  status: fetchStates.initial,
  error: null,
});

export const fetchQuestions = createAsyncThunk(
  sliceName + "/fetchQuestions",
  getSimulatedFetchThunk({
    resolveData: testQuestions,
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
    resetStatus: (state) => {
      state.status = initialStateOfQuestionsSlice.status;
      state.error = initialStateOfQuestionsSlice.error;
    },
    removeQuestion: questionAdapter.removeOne,
    removeAllQuestions: questionAdapter.removeAll,
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.status = fetchStates.loading;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = fetchStates.succeeded;
      questionAdapter.upsertMany(state, action);
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.status = fetchStates.failed;
      state.error = action.error.message;
    },
    [addQuestion.fulfilled]: questionAdapter.addOne,
  },
});

export const {
  removeQuestion,
  removeAllQuestions,
  resetStatus,
} = questionSlice.actions;

export const {
  selectAll: selectQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
} = questionAdapter.getSelectors((state) => state[sliceName]);
export default questionSlice.reducer;
