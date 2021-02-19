import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Header } from "./features/header/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Counter />
    </div>
  );
}

export default App;
