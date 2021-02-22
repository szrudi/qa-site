import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "../features/question-list/questionSlice";

export const defaultStoreOptions = {
  reducer: {
    questions: questionReducer,
  },
};
export default configureStore(defaultStoreOptions);
