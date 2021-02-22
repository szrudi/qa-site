import React from "react";
import "./App.css";
import { Header } from "./features/header/Header";
import { InfoMessage } from "./features/info-message/InfoMessage";
import { QuestionList } from "./features/question-list/QuestionList";
import { QuestionForm } from "./features/question-form/QuestionForm";

function App() {
  return (
    <div className="App">
      <Header />
      <InfoMessage />
      <QuestionList />
      <QuestionForm />
    </div>
  );
}

export default App;
