import React from "react";
import "./App.css";
import { LogIn } from "./components/LogIn/LogIn";
import { Orders } from "./components/Orders/Orders";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
