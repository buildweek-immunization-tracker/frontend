import React from "react";
import { Route, Redirect } from "react-router-dom";

// components
import LoginUser from "./components/LoginUser";
import CreateUserForm from "./components/CreateUserForm";
import ParentHomepage from "./components/ParentHomepage";
import ProviderHomepage from "./components/ProviderHomepage";
import ProtectedRoute from "./components/ProtectedRoute";
import ObjectCreate from "./components/ObjectCreate";
import NavBar from "./components/NavBar";
import ShotsTableP from "./components/ProviderRecordPage/ShotsTableP";
import ShotsTable from "./components/PatientRecordPage/ShotsTable";
import ChildInfoForm from "./components/ChildInfoForm";

// styles
import "./styles/App.scss";
import ParentEdit from "./components/ParentEdit";

export default function App() {
  return (
    <>
      <Route path="/" component={NavBar} />
      <Route path="/patient/edit/:id" render={props =>(<ShotsTableP {...props}/>)}/>
      <Route path="/createuser" component={CreateUserForm} />
      <ProtectedRoute path="/parent" component={ParentHomepage} />
      <ProtectedRoute path="/provider" component={ProviderHomepage} />
      <Route
        path="/parentsignin"
        render={props => <ObjectCreate {...props} />}
      />
      <Route
        path="/user/edit/:id"
        render={props => (<ParentEdit {...props} />)}
      />
      <Route
        path="/update-child-info/:id"
        render={props => <ChildInfoForm {...props} />}
      />
      <Route
        path="/create-child/:parentId"
        render={props => <ChildInfoForm {...props} />}
      />
      <Route
        path="/view-child-records/:id"
        render={props => <ShotsTable {...props} />} 
      />
      <Route
        exact
        path="/"
        render={() => {
          if (!localStorage.getItem("loggedIn")) {
            return <Route path="/" component={LoginUser} />;
          } else if (JSON.parse(localStorage.getItem("role")) === "parent") {
            return <Redirect to="/parentsignin" />;
          } else if (JSON.parse(localStorage.getItem("role")) === "staff") {
            return <Redirect to="/provider" />;
          }
        }}
      />
      {/* <Route path="*" render={() => <Redirect to="/" />} /> */}
    </>
  );
}
