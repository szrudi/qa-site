import React from "react";
import styles from "./InfoMessage.module.css";
import {useSelector} from "react-redux";
import {selectQuestions} from "../question-list/questionSlice";

export function InfoMessage() {
    const questionList = useSelector(selectQuestions);
    const questionsNumber = questionList.length;

    return (
        <div className={styles.infoMessage} aria-label="App info message">
            Here you can find {questionsNumber} question
            {questionsNumber === 1 ? "" : "s"}. Feel free to create your own
            questions.
        </div>
    );
}
