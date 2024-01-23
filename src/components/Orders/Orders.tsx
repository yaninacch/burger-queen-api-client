import React from "react";
import LogoImg from "../../img/logo-burger.png";

export const Orders = () => {
  return (
    <div className="orders-div">
      <img className="logo-orders" src={LogoImg} alt="logo" />
      <h1 className="title-orders">PEDIDOS</h1>
    </div>
  );
};
