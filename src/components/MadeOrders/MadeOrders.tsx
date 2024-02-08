import React from "react";
import LogoImg from "../../img/logo-burger.png";

export const MadeOrders = () => {
  return (
    <>
    <div className="orders-div">
      <img className="logo-orders" src={LogoImg} alt="logo" />

      <h1 className="title-orders">ORDERS</h1>
    </div>
    <div className="orders-container">
        <div className="list-title title-made">
        <h2>MADE ORDERS</h2>
        <h2>DONE</h2>
        <h2>PREPARATION TIME</h2>
        </div>
    </div>
    </>
  );
};
