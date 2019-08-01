import React, { useState, useEffect } from "react";
import Axios from "axios";

import ProviderChangeForm from "./ProviderChangeForm";

export default function ProviderHomepageCopy() {
  const [providerList, setProviderList] = useState([]);
  const [currentProvider, setCurrentProvider] = useState(
    JSON.parse(localStorage.getItem("Provider ID"))
  );

  useEffect(() => {
    Axios.get("https://immunization-tracker-van.herokuapp.com/api/providers")
      .then(res => {
        res.data.sort();
        setProviderList(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [setProviderList]);

  const prepCurrentProviderChange = e => {
    if (e.target.value == 0) {
      const none = [{ name: "none selected" }];
      localStorage.setItem("Current Provider", JSON.stringify(none));
      localStorage.setItem("Provider ID", JSON.stringify(0));
      setCurrentProvider(0);
    } else {
      const newProvider = providerList.filter(
        provider => provider.id == e.target.value
      );
      // console.log(newProvider);
      localStorage.setItem(
        "Current Provider",
        JSON.stringify(newProvider[0].name)
      );
      localStorage.setItem("Provider ID", JSON.stringify(newProvider[0].id));
      setCurrentProvider(newProvider[0].id);
    }
  };

  return (
    <div className="provider-page-wrapper">
      <h2>Care Provider Dashboard</h2>
      <h3>{JSON.parse(localStorage.getItem("userMessage"))}</h3>
      <form className="choose-provider-form">
        <label>
          <p>Choose Associated Provider</p>
          <select
            placeholder="Select"
            name="providerSelect"
            onChange={e => {
              prepCurrentProviderChange(e);
            }}
          >
            {providerList.map(provider => {
              return (
                <option
                  key={provider.id}
                  value={provider.id}
                  selected={
                    JSON.parse(localStorage.getItem("Current Provider")) ===
                    provider.name
                      ? true
                      : false
                  }
                >
                  {provider.name}
                </option>
              );
            })}
          </select>
        </label>
      </form>
      <ProviderChangeForm providerList={providerList} />
    </div>
  );
}
