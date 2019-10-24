import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { Route, Link, Switch } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import chefPosting from "./ChefPostPage";
import styled from "styled-components";
import axiosWithAuth from "../Utils/axiosWithAuth.js";
// import GetLogin from ‘./Login.js’;
import RegisterForm from "./Register.js";
const HomePage = styled.div`
  background-color: #52ad9c;
  color: 347624f;
  width: 90%;
  margin: 0 auto;
  border: 4px solid #47624f;
  border-radius: 10px;
  height: 1100px;
`;
const BoxField = styled(Field)`
  padding: 1%;
  margin: 1%;
  border: 2px solid black;
  width: 20%;
`;
const CenterForm = styled.h1`
  margin-top: 12%;
`;
const Button = styled.button`
  margin: 1% 0% 1% 0%;
  padding: 1%;
  width: 10%;
  font-weight: bold;
  background-color: #9ffcdf;
  color: #47624f;
  border: 2px solid #47624f;
  border-radius: 5%;
`;

const ChefOnboarding = ({ event, touched, errors, status, props }) => {
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);

  useEffect(
    props => {
      status && setUsername(chefs => [...chefs, status]);
    },
    [status]
  );
  return (
    <HomePage>
      <CenterForm>Login</CenterForm>
      <Form>
        <BoxField type="text" name="username" placeholder="username" />
        {touched.username && errors.username && <p>{errors.username}</p>}
        <br />
        <BoxField type="password" name="password" placeholder="password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <br />
        <button type="submit" className="SubmitButtonn">
          Login!
        </button>
        <br />
        <span>
          Dont have an account? <Link to="/register">Register Account!</Link>
        </span>
        <Route>
          {/* <Route exact path=‘/chefposts’ component={chefPosting} />
                  <button type=‘submit’ onClick={chefPosting}>Login</button> */}
        </Route>
      </Form>
      <Route>
        <Link to="/chefposts">Continue as Guest</Link>
        <Switch>
          <Route exact path="/Chefposts" component={chefPosting} />
        </Switch>
      </Route>
      {/* {chefs.map(chef => (
               <div key={chef.id}>
                   <p>Name: {chef.name}</p>
                   <p>Email: {chef.email}</p>
                   <p>Password Length: {chef.password.length}</p>
               </div>
           ))} */}
    </HomePage>
  );
};
const FormikChefOnboarding = withFormik({
  mapPropsToValues({ username, password, termsOfService }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Username is a required field"),
    password: Yup.string().required("Password is a required field")
  }),

  handleSubmit(Credentials, { props }) {
    console.log(props);
    axios
      .post(
        "https://lambda-chef-portfolio.herokuapp.com/api/auth/login",
        Credentials
      )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        this.props.history.push("/");
      })
      .catch(err => console.log(err.response));
  }
})(ChefOnboarding);
export default FormikChefOnboarding;