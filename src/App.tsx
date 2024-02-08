import React from "react";
import "./App.css";
import { LogIn } from "./components/LogIn/LogIn";
import { Orders } from "./components/Orders/Orders";
import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { MadeOrders } from "./components/MadeOrders/MadeOrders";

const App = () => {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/madeOrders" element={<MadeOrders/>}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
