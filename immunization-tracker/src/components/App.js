import React, { useState } from "react";
import InfoCard from "./InfoCard";
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
  return (
    <div className="App">
      <InfoCard people={people} setPeople={setPeople} />
      <CreateUserForm />
    </div>
  );
}
