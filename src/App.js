import React from "react";
import Header from "./features/questions/Header";
import InfoMessage from "./features/questions/InfoMessage";
import QuestionList from "./features/questions/QuestionList";
import QuestionForm from "./features/questions/QuestionForm";
import MainContent from "./app/components/MainContent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useRef } from "react";

const App = () => {
  const formRef = useRef(null);
  return (
    <Router>
      <div className="medium-container">
        <Header />
        <div className="flex-row">
          <aside className="flex-large one-fourth">
            <InfoMessage />
          </aside>
          <MainContent className="flex-large">
            <QuestionList formRef={formRef} />
            <Switch>
              <Route
                path={`/edit/:questionId`}
                render={(routeProps) => (
                  <QuestionForm
                    formRef={formRef}
                    questionId={routeProps.match.params.questionId}
                  />
                )}
              />
              <QuestionForm />
            </Switch>
          </MainContent>
        </div>
      </div>
    </Router>
  );
};

export default App;
