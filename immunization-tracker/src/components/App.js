import React from "react";
import { Route, Redirect } from "react-router-dom";

// components
import LoginUser from "./LoginUser";
import CreateUserForm from "./CreateUserForm";
import ParentHomepage from "./ParentHomepage";
import ProtecteRoute from "./ProtectedRoute";

// styles
import "../styles/App.scss";

export default function App() {
  return (
    <>
      <Route path="/createuser" component={CreateUserForm} />
      <ProtecteRoute path="/dashboard" component={ParentHomepage} />
      <Route
        exact
        path="/"
        render={() =>
          localStorage.getItem("token") ? (
            <Redirect to="/dashboard" />
          ) : (
            <Route path="/" component={LoginUser} />
          )
        }
      />
    </>
  );
}
