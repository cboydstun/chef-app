import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import "./App.css";
import chefOnboarding from "./Components/ChefLogin";
import chefPosting from "./Components/ChefPostPage";
import styled from "styled-components";
import NavBar from "./Components/NavBar";
import SignUpPage from "./Components/Register";

const Header = styled.div`
  display: flex;
  justify-content: center;
`;
const NavLinks = styled.p`
  margin: 2%;
  width: 15%;
`;
const Links = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: #52ad9c;
  font-weight: bold;
  padding: 4%;
  border: 4px solid #52ad9c;
  &:hover {
    background-color: #47624f;
    color: #edf9f3;
  }
`;

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route>
        <div>
          <h1>Welcome to the Chef Portfolio!</h1>
        </div>
        <Switch>
          <Route exact path="/" component={chefOnboarding} />
          <Route exact path="/chefposts" component={chefPosting} />
          <Route exact path="/register" component={SignUpPage} />
        </Switch>
      </Route>
    </div>
  );
}

export default App;
