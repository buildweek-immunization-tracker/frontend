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
      <DashboardHeader>Provider Dashboard</DashboardHeader>
      <IntroWrapper>
        <h3>{JSON.parse(localStorage.getItem("userMessage"))} hi</h3>
        <form onSubmit={e => handleSubmit(e)}>
          <select className="dropdown" onChange={e => handleChanges(e)}>
            {providerList.map(provider => (
              <option key={provider.id}>{provider.name}</option>
            ))}
          </select>
          <Button>Get Provider Profile</Button>
        </form>
      </IntroWrapper>
      <SelectedProviderDetails providerId={providerId} />
    </HomePageWrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  padding: 2rem;
  margin: 5rem auto 0;
  border: 3px solid #ececec;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  min-width: 7rem;
  background: transparent;
  border: 1px solid black;
  outline: none;
`;

const DashboardHeader = styled.h1`
  background: #f4f4f4;
  font-size: 2.7rem;
  padding: 0.8rem;
  border-bottom: 1px solid black;
`;

const HomePageWrapper = styled.div`
  width: 85%;
  border: 1px solid red;
  margin: auto;
  margin-top: 10%
`;

const IntroWrapper = styled.div`
  width: 50%;
  border: 1px solid blue;
  display: flex;
  justify-content: flex-start;
`;
 
