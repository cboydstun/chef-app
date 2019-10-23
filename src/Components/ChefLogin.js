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
  height: 80vh;
`;
const BoxField = styled(Field)`
  padding: 1%;
  margin: 1%;
  border: 2px solid black;
  width: 20%;
`;
const CenterForm = styled.h1`
  margin-top: 15%;
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
const ChefOnboarding = ({ values, touched, errors, status, props }) => {
  const [chefs, setChefs] = useState([]);
  const [login, setLogin] = useState([]);
  const handleSubmit = values => {
    values.preventDefault();
    axiosWithAuth()
      .post("https://lambda-chef-portfolio.herokuapp.com/api/auth/login", login)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        props.history.push("/ChefPostPage");
      })
      .catch(err => console.log("error in handlesSub", err.response));
    setLogin({ username: "", password: "" });
  };
  useEffect(
    props => {
      status && setChefs(chefs => [...chefs, status]);
    },
    [status]
  );
  return (
    <HomePage>
      <CenterForm>Login</CenterForm>
      <Form>
        <BoxField type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p>{errors.name}</p>}
        <br />
        <BoxField type="text" name="email" placeholder="email" />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <br />
        <BoxField type="password" name="password" placeholder="password" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <br />
        <h2>Terms Of Service</h2>
        <BoxField
          type="checkbox"
          name="termsOfService"
          checked={values.termsOfService}
        />
        <br />
        <button type="submit" className="SubmitButton">
          Login!
        </button>
        <span>
          Dont have an account? <Link to="./Register">Register Account!</Link>
        </span>
        <Route>
          {/* <Route exact path=‘/chefposts’ component={chefPosting} />
                  <button type=‘submit’ onClick={chefPosting}>Login</button> */}
        </Route>
      </Form>
      <Route>
        <Link to="/chefposts">Continue as Guest</Link>
        <Switch>
          <Route exact path="/chefposts" component={chefPosting} />
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
  mapPropsToValues({ name, email, password, termsOfService }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      termsOfService: termsOfService || false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    email: Yup.string().required("Email is a required field"),
    password: Yup.string().required("Password is a required field")
  })
})(ChefOnboarding);
export default FormikChefOnboarding;
