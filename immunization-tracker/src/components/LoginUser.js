import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";

import NavBar from "./NavBar";

function LogInUser(props) {
  console.log(props);

  const [user, setUser] = useState({});

  //hold state of form, and return to empty form once submit button is clicked
  const handleChange = event => {
    const inputUser = { ...user, [event.target.name]: event.target.value };
    setUser(inputUser);
  };

  //submit handler will control the form's submission
  const handleSubmit = event => {
    event.preventDefault();
    Axios.post(
      "https://immunization-tracker-van.herokuapp.com/api/auth/login/",
      user
    )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("role", JSON.stringify(res.data.role));
        localStorage.setItem("user ID", JSON.stringify(res.data.userId));
        localStorage.setItem("loggedIn", true);
        props.history.push("/");
      })
      .catch(error =>
        console.log(error, "There was an error fetching the data.")
      );
  };

  const toSignUp = event => {
    event.preventDefault();
    console.log(props);
    props.history.push("/createuser");
  };

  return (
    <LoginWrapper>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            placeholder="Your username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="login-Btn" type="submit">
          Log In
        </button>
      </form>
      <div>or</div>
      <button onClick={toSignUp}>Sign Up</button>
    </LoginWrapper>
  );
}

export default LogInUser;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  div {
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      input {
        padding: 0.5rem;
      }
    }
  }
  button {
    padding: 0.5rem;
  }
`;
