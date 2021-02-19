import React from "react";
import styles from "./QuestionList.module.css";
import PropTypes from "prop-types";

export function QuestionList({questions}) {
    const questionsList = questions.map((q) => (
        <details key={q.id}>
            <summary>{q.question}</summary>
            <p>{q.answer}</p>
        </details>
    ));
    return (
        <div className={styles.questionList} role="question-list">
            <h2>Created questions</h2>
            {questionsList}
        </div>
    );
}

QuestionList.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            creationDate: PropTypes.instanceOf(Date).isRequired,
            question: PropTypes.string.isRequired,
            answer: PropTypes.string.isRequired,
        })
    ).isRequired,
};
