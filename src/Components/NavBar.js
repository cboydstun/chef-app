import React from "react";
import { Route, Link } from "react-router-dom";
import styled from "styled-components";
import SignUpPage from "./Register";
import ChefPostPage from "./ChefPostPage";
import SigninPage from "./ChefLogin";
import "../index.css";

const NavDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
`;
const NavLinks = styled.p`
  text-decoration: none;
  color: black;
`;
const Navo = styled.div`
  background: #9ffcdf;
  borderl: 2px solid black;
`;

function Nav() {
  return (
    <Navo>
      <NavDiv>
        <Link to="/register">
          <NavLinks>Sign-Up</NavLinks>
        </Link>
        <Link to="/">
          <NavLinks>Login</NavLinks>
        </Link>
        <Link to="/Chefposts">
          <NavLinks>Chef Post</NavLinks>
        </Link>
        <Link>
          <NavLinks>Homepage</NavLinks>
        </Link>
        <Route exact path="/cheflogin" component={SigninPage} />
        <Route exact path="/chefpostpage" component={ChefPostPage} />
        <Link to="/">
          <NavLinks>Log out</NavLinks>
        </Link>
      </NavDiv>
    </Navo>
  );
}
export default Nav;
