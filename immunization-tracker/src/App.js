import React from "react";
import { Route, Redirect } from "react-router-dom";

// components
import LoginUser from "./components/LoginUser";
import CreateUserForm from "./components/CreateUserForm";
import ParentHomepage from "./components/ParentHomepage";
import ProviderHomepage from "./components/ProviderHomepage";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

// styles
import "./styles/App.scss";
import ParentEdit from "./components/ParentEdit";

export default function App() {
  return (
    <>
      <Route path="/" component={NavBar} />
      <Route path="/createuser" component={CreateUserForm} />
      <ProtectedRoute path="/parent/" component={ParentHomepage} />
      <ProtectedRoute path="/provider/" component={ProviderHomepage} />
      <Route
        path="/user/edit/:id"
        render={props => <ParentEdit {...props} />}
      />
      <Route
        exact
        path="/"
        render={() => {
          if (!localStorage.getItem("loggedIn")) {
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
