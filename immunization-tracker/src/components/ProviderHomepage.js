import React, { useState, useEffect } from "react";
import Axios from "axios";

import ProviderChangeForm from "./ProviderChangeForm";

export default function ProviderHomepage() {
  const [providerList, setProviderList] = useState([]);
  const [providerId, setProviderId] = useState(0);
  const [providerName, setProviderName] = useState("");

  console.log("providerId: ", providerId);

  useEffect(() => {
    Axios.get("https://immunization-tracker-van.herokuapp.com/api/providers")
      .then(res => {
        res.data.sort();
        setProviderList(res.data);
        setProviderName(res.data[0].name);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setProviderList]);

  const handleChanges = e => {
    setProviderName(e.target.value);
    // let prep = providerList.filter(item => item.name === providerName);
    // setProviderId(prep[0].id);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let prep = providerList.filter(item => item.name === providerName);
    setProviderId(prep[0].id);
  };

  return (
    <div className="provider-homepage-wrapper">
      <h2>Provider Dashboard</h2>
      <h3>{JSON.parse(localStorage.getItem("userMessage"))}</h3>
      <p>Please choose your associated provider </p>
      <form onSubmit={e => handleSubmit(e)}>
        <select onChange={e => handleChanges(e)}>
          {providerList.map(provider => (
            <option>{provider.name}</option>
          ))}
        </select>
        <button>Get Provider Profile</button>
      </form>
      <ProviderChangeForm providerId={providerId} />
    </div>
  );
}
