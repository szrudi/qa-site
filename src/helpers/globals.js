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
    creationDate: addHours(new Date(), -8).toISOString(),
    question: "Do we handle emojis well or 💩?",
    answer: "Let's see some! ❤️♥️💩",
  },
  {
    id: nanoid(),
    creationDate: addHours(new Date(), -5).toISOString(),
    question: "A question to be sorted first?",
    answer:
      "Your are right, this question is here to jump to the front when you hit the Sort button.",
  },
];

export const getSimulatedFetchThunk = ({
  resolveData = null,
  prepare = null,
  errorProb = 0,
  delay = 1,
}) => async (dataToSend = {}) =>
  new Promise((resolve, reject) => {
    const isError = Math.random() < errorProb;
    let data = resolveData ?? dataToSend;
    setTimeout(() => {
      if (typeof prepare === "function") {
        data = prepare(data);
      }
      if (!isError) {
        resolve(data);
      } else {
        reject(new Error("Sorry, could not fetch the data!"));
      }
    }, delay * 1000 * (isError ? 2 : 1));
    return data;
  });

/**
 * Wrap a Promise to be cancelable.
 *
 * Could use some ready made package as well like:
 * makecancelable, react-async-hook, use-http, react-async
 *
 * https://github.com/facebook/react/issues/5465#issuecomment-157888325
 *
 * @param promise
 * @returns {{cancel(): void, promise: Promise<unknown>}}
 */
export const makeCancelable = (promise) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
    );
    promise.catch((error) =>
      hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};