import React from "react";
import {render, testQuestions} from "../../helpers/test-util";
import {QuestionForm} from "./QuestionForm";

test("create form without id", () => {
    const {getByText, getByRole} = render(<QuestionForm/>);

    const title = getByText(/create.*new.*question/i);
    expect(title).toBeInTheDocument();

    const saveButton = getByText("Create question");
    expect(saveButton).toBeInTheDocument();

    const questionForm = getByRole("question-form");
    expect(questionForm).toHaveFormValues({
        question: "",
        answer: "",
    });
});

test("edit form with id", () => {
    const firstQuestion = testQuestions[0];
    const {getByText, getByRole} = render(
        <QuestionForm questionId={firstQuestion.id}/>
    );
    const title = getByText(/edit.*question/i);
    expect(title).toBeInTheDocument();

    const saveButton = getByText("Save question");
    expect(saveButton).toBeInTheDocument();

    const questionForm = getByRole("question-form");
    expect(questionForm).toHaveFormValues({
        question: firstQuestion.question,
        answer: firstQuestion.answer,
    });
});
