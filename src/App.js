import React from "react";
import "./App.css";
import {Header} from "./features/header/Header";
import {InfoMessage} from "./features/info-message/InfoMessage";
import {QuestionList} from "./features/question-list/QuestionList";

function App() {
    return (
        <div className="App">
            <Header/>
            <InfoMessage/>
            <QuestionList/>
        </div>
    );
}

export default App;
