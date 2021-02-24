import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { getSimulatedFetchThunk, testQuestions } from "../../helpers/globals";

const IS_TEST_ENV = process.env.NODE_ENV === 'test';

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
    errorProb: IS_TEST_ENV ? 0 : 0.2,
    delay: IS_TEST_ENV ? 0.1 : 1,
  })
);

const prepareQuestion = (questionData) => ({
  ...questionData,
  id: questionData?.id ?? nanoid(),
  creationDate: questionData?.creationDate ?? new Date().toISOString(),
});

export const saveQuestion = createAsyncThunk(
  sliceName + "/saveQuestion",
  getSimulatedFetchThunk({
    errorProb: IS_TEST_ENV ? 0 : 0.2,
    delay: IS_TEST_ENV ? 0.1 : 5,
    prepare: prepareQuestion,
  })
);

const questionSlice = createSlice({
  name: sliceName,
  initialState: initialStateOfQuestionsSlice,
  reducers: {
    quickAddQuestion: {
      reducer: questionAdapter.upsertOne,
      prepare: (questionData) => ({ payload: prepareQuestion(questionData) }),
    },
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
    [saveQuestion.fulfilled]: questionAdapter.upsertOne,
  },
});

export const {
  quickAddQuestion,
  removeQuestion,
  removeAllQuestions,
  resetStatus,
} = questionSlice.actions;

export const {
  selectAll: selectQuestions,
  selectById: selectQuestionById,
  // selectIds: selectQuestionIds,
} = questionAdapter.getSelectors((state) => state[sliceName]);
export default questionSlice.reducer;
