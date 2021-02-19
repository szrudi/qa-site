import React from "react";
import styles from "./QuestionForm.module.css";

export function QuestionForm() {
    return (
        <div className={styles.questionForm} role="question-form">
            <h2>Create a new question</h2>
            <label htmlFor="question">Question</label>
            <input name="question" id="question" type="text"/>
            <label htmlFor="answer">Answer</label>
            <textarea name="answer" id="answer" rows="2"/>
        </div>
    );
}
