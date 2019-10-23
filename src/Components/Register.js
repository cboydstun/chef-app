import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = e => {
    e.preventDefault(props);

    axios
      .post('https://lambda-chef-portfolio.herokuapp.com/api/auth/register',{ username: username, password }
      )
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        props.history.push("/ChefLogin");
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="RegisterForm">
      <form onSubmit={handleSubmit}>
        <p>Register</p>
        <div className="inputregister">
          <input
            value={username}
            name="username"
            type="text"
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            value={password}
            name="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>
        <button type="submit" className="SubmitButtonregister">
          Connect!
        </button>
      </form>
    </div>
  );
}
export default Register;
