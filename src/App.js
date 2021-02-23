import React from "react";
import { Header } from "./features/questions/Header";
import { InfoMessage } from "./features/questions/InfoMessage";
import { QuestionList } from "./features/questions/QuestionList";
import { QuestionForm } from "./features/questions/QuestionForm";

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
