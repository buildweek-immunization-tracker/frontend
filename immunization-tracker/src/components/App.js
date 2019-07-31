import React from "react";
import { Route, Redirect } from "react-router-dom";

// components
import LoginUser from "./LoginUser";
import CreateUserForm from "./CreateUserForm";
import ParentHomepage from "./ParentHomepage";
import ProviderHomepage from "./ProviderHomepage";
import ProtecteRoute from "./ProtectedRoute";

// styles
import "../styles/App.scss";

export default function App() {
  const userId = JSON.parse(localStorage.getItem("user ID"));
  // console.log("user id is: ", userId);
  return (
    <>
      <Route path="/createuser" component={CreateUserForm} />
      <ProtecteRoute path="/parent/:id" component={ParentHomepage} />
      <ProtecteRoute path="/provider/:id" component={ProviderHomepage} />
      <Route
        exact
        path="/"
        render={() => {
          if (!localStorage.getItem("token")) {
            return <Route path="/" component={LoginUser} />;
          } else if (JSON.parse(localStorage.getItem("role")) === "parent") {
            return <Redirect to={`/parent/${userId}`} />;
          } else if (JSON.parse(localStorage.getItem("role")) === "staff") {
            return <Redirect to={`/provider/${userId}`} />;
          }
        }}
      />

      <Route path="*" render={() => <Redirect to="/" />} />
    </>
  );
}
