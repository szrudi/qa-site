import React, {useState} from "react";
import styles from "./QuestionList.module.css";
import PropTypes from "prop-types";
import {questionDetailsShape, QuestionListItem} from "./QuestionListItem";

export function QuestionList({questions}) {
    let questionList = [...questions];
    const [shouldSort, setSorted] = useState(false);

    let questionElements = "<p>No questions yet! :(</p>";
    if (questionList.length > 0) {
        if (shouldSort) {
            questionList.sort(questionCompare);
        }
        questionElements = questionList.map((q) => (
            <QuestionListItem key={q.id} questionDetails={q}/>
        ));
    }

    const toggleSort = () => setSorted((prevState) => !prevState);

    return (
        <div className={styles.questionList} role="question-list">
            <h2>Created questions</h2>
            {questionElements}
            <button role="sort-button" onClick={toggleSort}>
                Sort Questions
            </button>
            <button role="remove-all-button">Remove Questions</button>
        </div>
    );
}

QuestionList.propTypes = {
    questions: PropTypes.arrayOf(questionDetailsShape).isRequired,
};

export const questionCompare = (q1, q2) => {
    if (q1.question > q2.question) {
        return 1;
    }
    if (q1.question < q2.question) {
        return -1;
    }
    return 0;
};
