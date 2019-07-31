
import React from "react";
import { Route, Redirect } from "react-router-dom";


// components
import LoginUser from "./LoginUser";
import CreateUserForm from "./CreateUserForm";
import ParentHomepage from "./ParentHomepage";
import ProviderHomepage from "./ProviderHomepage";
import ProtecteRoute from "./ProtectedRoute";
import NavBar from "./NavBar";


// styles
import "../styles/App.scss";

export default function App() {
  return (

    <>
      <Route path="/" render={props => <NavBar {...props} />} />
      <Route component={NavBar} />
      <Route path="/createuser" component={CreateUserForm} />
      <ProtecteRoute path="/parent/" component={ParentHomepage} />
      <ProtecteRoute path="/provider/" component={ProviderHomepage} />
      <Route
        exact
        path="/"
        render={() => {
          if (!localStorage.getItem("token")) {
            return <Route path="/" component={LoginUser} />;
          } else if (JSON.parse(localStorage.getItem("role")) === "parent") {
            return <Redirect to="/parent/" />;
          } else if (JSON.parse(localStorage.getItem("role")) === "staff") {
            return <Redirect to="/provider" />;
          }
        }}
      />

      <Route path="*" render={() => <Redirect to="/" />} />
    </>
  );
}
