import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const RegisterPage = styled.div`
  background-color: #52ad9c;
  color: 347624f;
  width: 90%;
  margin: 0 auto;
  border: 4px solid #47624f;
  border-radius: 10px;
  height: 1100px;
`;
const RegisterForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const BoxField = styled.input`
  padding: 1%;
  margin: 0 auto;
  margin-top: 1%;
  border: 2px solid black;
  width: 20%;
`;
const CenterForm = styled.h1`
  margin-top: 15%;
`;

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = e => {
    e.preventDefault(props);
    axios
      .post("https://lambda-chef-portfolio.herokuapp.com/api/auth/register", {
        username: username,
        password
      })
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <RegisterPage>
      <form onSubmit={handleSubmit}>
        <CenterForm>Register</CenterForm>
        <RegisterForm>
          <BoxField
            value={username}
            name="username"
            type="text"
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <BoxField
            value={password}
            name="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
          <br />
        </RegisterForm>
        <button type="submit" className="SubmitButtonregister">
          Connect!
        </button>
      </form>
    </RegisterPage>
  );
}
export default Register;