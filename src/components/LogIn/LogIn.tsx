import React, { ChangeEvent } from "react";
import LogoImg from "../../img/logo-burger.png";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const loginUser = async (credentials: { email: string; password: string }) => {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const LogIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const response = await loginUser(formData);
    console.log(response);

    if (response.accessToken) {
      Swal.fire({
        title: "Sucess!",
        icon: "success",
      });
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("email", response.user.email);
      navigate('/orders');
    } else {

      Swal.fire({
        title: 'Error!',
        text: 'Ingrese un email y usuario correcto!',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
  };

  return (
    <>
      <img className="logo" src={LogoImg} alt="logo" />
      <Form className="login-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="user">Enter e-mail</Form.Label>
          <Form.Control
            id="input-email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="user">Password</Form.Label>
          <Form.Control
            id="input-pass"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Button className="submit-btn" variant="danger" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};
