import React, { useState } from "react";
import InfoCard from "./InfoCard";
// styles
import "../styles/App.scss";

// components
import CreateUserForm from "./CreateUserForm";

export default function App() {

  const [people, setPeople] = useState([
    { name: "Elvis Knapman", currentProvider: "Current Provider Here" },
    { name: "Dave Irwin", currentProvider: "Current Provider Here" },
    { name: "Tatiana Faramarzi", currentProvider: "Current Provider Here" },
    { name: "Trang Nguyen", currentProvider: "Current Provider Here" },
    { name: "Van Jordan", currentProvider: "Current Provider Here" }
  ]);
  return (
    <div className="App">
      <InfoCard people={people} />
      <CreateUserForm />

    </div>
  );
}
