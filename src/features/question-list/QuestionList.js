import React from "react";
import styles from "./QuestionList.module.css";

export function QuestionList() {
    return (
        <div className={styles.questionList} role="question-list">
            <h2>Created questions</h2>
            <details>
                <summary>Question 1</summary>
                Answer 1
            </details>
            <details>
                <summary>Question 2</summary>
                Answer 2
            </details>
        </div>
    );
}