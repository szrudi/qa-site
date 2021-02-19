import React from "react";
import "./App.css";
import { Header } from "./features/header/Header";
import { InfoMessage } from "./features/info-message/InfoMessage";
import { QuestionList } from "./features/question-list/QuestionList";
import { QuestionForm } from "./features/question-form/QuestionForm";
import { addHours } from "date-fns";

function App() {
  return (
    <div className="App">
      <Header />
      <InfoMessage questions={questionList}/>
      <QuestionList />
      <QuestionForm />
    </div>
  );
}

export default App;

const questionList = [
  {
    creationDate: addHours(new Date(), -2),
    question: "How to add question?",
    answer: "Just use the form below!",
  },
  {
    id: 2,
    creationDate: addHours(new Date(), -1),
    question: "Can I add my own question?",
    answer: "Yeah, sure you can! :)",
  },
  {
    id: 3,
    creationDate: addHours(new Date(), -10),
    question: "Is this an older question?",
    answer: "Yep, it was asked 10 hours ago.",
  },
];
