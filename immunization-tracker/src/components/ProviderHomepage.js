import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";

import SelectedProviderDetails from "./SelectedProviderDetails";

export default function ProviderHomepage() {
  const [providerList, setProviderList] = useState([]);
  const [providerId, setProviderId] = useState(0);
  const [providerName, setProviderName] = useState("");

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
  };

  const handleSubmit = e => {
    e.preventDefault();
    let prep = providerList.filter(item => item.name === providerName);
    setProviderId(prep[0].id);
  };

  return (
    <HomePageWrapper>
      <IntroWrapper>
        <h2>Provider Dashboard</h2>
        <h3>{JSON.parse(localStorage.getItem("userMessage"))}</h3>
        <form onSubmit={e => handleSubmit(e)}>
          <select onChange={e => handleChanges(e)}>
            {providerList.map(provider => (
              <option key={provider.id}>{provider.name}</option>
            ))}
          </select>
          <button>Get Provider Profile</button>
        </form>
      </IntroWrapper>
      <SelectedProviderDetails providerId={providerId} />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  width: 85%;
  border: 1px solid red;
  margin: auto;
  margin-top: 10%
`;

const IntroWrapper = styled.div`
  width: 50%;
  border: 1px solid blue;
  margin: auto;
  margin-top: 10%
`;

