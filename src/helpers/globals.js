import { nanoid } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

export const testQuestions = [
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -2).toISOString(),
    question: "How to add question?",
    answer: "Just use the form below!",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -1).toISOString(),
    question: "Can I add my own question?",
    answer: "Yeah, sure you can! :)",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -3).toISOString(),
    question: "Can I add my own question?",
    answer: "This is the same question twice, to cover this case as well.",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -100).toISOString(),
    question: "Is this an older question?",
    answer: "Yep, it was asked 100 hours ago.",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -5).toISOString(),
    question: "A question to be sorted first?",
    answer:
      "Your are right, this question is here to jump to the front when you hit the Sort button.",
  },
];
