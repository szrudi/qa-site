import React from "react";
import Header from "./features/questions/Header";
import InfoMessage from "./features/questions/InfoMessage";
import QuestionList from "./features/questions/QuestionList";
import QuestionForm from "./features/questions/QuestionForm";
import MainContent from "./app/components/MainContent";

const App = () => (
  <div className="medium-container">
    <Header />
    <div className="flex-row">
      <aside className="flex-large one-fourth">
        <InfoMessage />
      </aside>
      <MainContent className="flex-large">
        <QuestionList />
        <QuestionForm />
      </MainContent>
    </div>
  </div>
);

export default App;
