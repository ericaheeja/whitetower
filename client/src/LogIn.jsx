import React, { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./css/LogIn.css";
import Header from "./Header";

function LogIn() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const history = useHistory();

  const logInRequest = (e) => {
    e.preventDefault();
    if (userEmail === "" || userPassword === "") {
      alert("There is empty input box. Please fill in.");
    } else {
      Axios.post("http://localhost:8001/login", {
        email: userEmail,
        password: userPassword,
      }).then((response) => {
        localStorage.setItem("token", response.data.token);
        history.push("/");
      });
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="signin">
          <h1>Sign In</h1>
          <Form onSubmit={logInRequest}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                aria-required
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setUserEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                aria-required
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" id="signinBtn">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
