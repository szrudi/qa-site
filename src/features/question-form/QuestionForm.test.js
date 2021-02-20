import React from "react";
import {renderWithQuestions, testQuestions} from "../../helpers/test-util";
import {QuestionForm} from "./QuestionForm";
import {screen} from "@testing-library/react";

test("create form without id", () => {
    renderWithQuestions(<QuestionForm/>);

    const title = screen.getByText(/create.*new.*question/i);
    expect(title).toBeInTheDocument();

    const saveButton = screen.getByText("Create question");
    expect(saveButton).toBeInTheDocument();

    const questionForm = screen.getByLabelText("Question form");
    expect(questionForm).toHaveFormValues({
        question: "",
        answer: "",
    });
});

test("edit form with id", () => {
    const firstQuestion = testQuestions[0];
    renderWithQuestions(<QuestionForm questionId={firstQuestion.id}/>);
    const title = screen.getByText(/edit.*question/i);
    expect(title).toBeInTheDocument();

    const saveButton = screen.getByText("Save question");
    expect(saveButton).toBeInTheDocument();

    const questionForm = screen.getByLabelText("Question form");
    expect(questionForm).toHaveFormValues({
        question: firstQuestion.question,
        answer: firstQuestion.answer,
    });
});
