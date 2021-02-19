import React from "react";
import styles from "./QuestionList.module.css";
import PropTypes from "prop-types";
import {questionDetailsShape, QuestionListItem} from "./QuestionListItem";

export function QuestionList({questions}) {
    let questionsList = "<p>No questions yet! :(";
    if (questions.length > 0) {
        questionsList = questions.map((q) => (
            <QuestionListItem key={q.id} questionDetails={q}/>
        ));
    }

    return (
        <div className={styles.questionList} role="question-list">
            <h2>Created questions</h2>
            {questionsList}
            <button role="sort-button">Sort Questions</button>
            <button role="remove-all-button">Remove Questions</button>
        </div>
    );
}

QuestionList.propTypes = {
    questions: PropTypes.arrayOf(questionDetailsShape).isRequired,
};
