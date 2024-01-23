import React from "react";
import "./App.css";
import { LogIn } from "./components/LogIn/LogIn";
import { Orders } from "./components/Orders/Orders";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
