import React, {useState} from "react";
import styles from "./QuestionList.module.css";
import {QuestionListItem} from "./QuestionListItem";
import {useSelector} from "react-redux";
import {selectQuestions} from "./questionSlice";

export function QuestionList() {
    let questionList = useSelector(selectQuestions);
    const [shouldSort, setSorted] = useState(false);

    let questionElements = "<p>No questions yet! :(</p>";
    if (questionList.length > 0) {
        if (shouldSort) {
            // let's not mutate the list directly
            questionList = [...questionList];
            questionList.sort(questionAlphabeticCompare);
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

export const questionAlphabeticCompare = (q1, q2) => {
    if (q1.question > q2.question) {
        return 1;
    }
    if (q1.question < q2.question) {
        return -1;
    }
    return 0;
};
