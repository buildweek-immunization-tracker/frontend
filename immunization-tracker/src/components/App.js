import React, { useState } from "react";
import InfoCard from "./InfoCard";
import Header from "./Header/Header";
import ParentHomepage from "./ParentHomepage";
import ParentEdit from "./ParentEdit";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
// styles
import "../styles/App.scss";

// components
import CreateUserForm from "./CreateUserForm";

export default function App() {
  const [people, setPeople] = useState([
    {
      firstName: "Elvis",
      lastName: "Knapman",
      currentProvider: "Current Provider Here"
    },
    {
      firstName: "Dave",
      lastName: "Irwin",
      currentProvider: "Current Provider Here"
    },
    {
      firstName: "Tatiana",
      lastName: "Faramarzi",
      currentProvider: "Current Provider Here"
    }
    // { name: "Trang Nguyen", currentProvider: "Current Provider Here" },
    // { name: "Van Jordan", currentProvider: "Current Provider Here" }
  ]);

  let NavName = [
    { name: "Home", link: "/" },
    { name: "Account", link: "/userForm" },
    { name: "PDF", link: "/pdf" },
    { name: "Log Out", link: "/login" }
  ];
  return (
    <div className="App">
      <Route exact path="/" render={props => <ParentHomepage {...props} />} />
      <Route path="/edit/:id" render={props => <ParentEdit {...props} />} />
    </div>
  );
}
