import React from "react";
import { useSelector } from "react-redux";
import { selectQuestions } from "./questionSlice";

const InfoMessage = () => {
  const questionList = useSelector(selectQuestions);
  const questionCountMessage =
    `Here you can find ${questionList.length} ` +
    `question${questionList.length === 1 ? "" : "s"}.`;
  return (
    <div aria-label="App info message" role="complementary">
      {questionCountMessage}
      <br />
      Feel free to create your own questions.
    </div>
  );
};

export default InfoMessage;
