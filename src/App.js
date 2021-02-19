import React from "react";
import "./App.css";
import { Header } from "./features/header/Header";
import { InfoMessage } from "./features/info-message/InfoMessage";

function App() {
  return (
    <div className="App">
      <Header />
      <InfoMessage />
    </div>
  );
}

export default App;
