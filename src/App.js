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
      <InfoMessage questions={questionList} />
      <QuestionList questions={questionList} />
      <QuestionForm />
    </div>
  );
}

export default App;

export const questionList = [
  {
    id: 1,
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
  {
    id: 4,
    creationDate: addHours(new Date(), -10),
    question: "A question to be sorted first?",
    answer: "Your are right, this question is here to jump to the front when you hit the Sort button.",
  },
];
