import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../features/question-list/questionSlice";

export default configureStore({
  reducer: {
    questions: questionReducer,
  },
});
