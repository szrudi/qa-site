import React from "react";
import "./App.css";
import { Header } from "./features/header/Header";
import { InfoMessage } from "./features/info-message/InfoMessage";
import { QuestionList } from "./features/question-list/QuestionList";
import { QuestionForm } from "./features/question-form/QuestionForm";

function App() {
  return (
    <div className="medium-container">
      <Header />
      <div className="flex-row">
        <div className="flex-large one-fourth">
          <InfoMessage />
        </div>
        <div className="flex-large content">
          <QuestionList />
          <QuestionForm />
        </div>
      </div>
    </div>
  );
}

export default App;
