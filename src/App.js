import React from "react";
import "./App.css";
import { Header } from "./features/header/Header";
import { InfoMessage } from "./features/info-message/InfoMessage";
import { QuestionList } from "./features/question-list/QuestionList";
import { QuestionForm } from "./features/question-form/QuestionForm";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <div className="App">
      <Header />
      <Provider store={store}>
        <InfoMessage />
        <QuestionList />
        <QuestionForm />
      </Provider>
    </div>
  );
}

export default App;
