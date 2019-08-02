import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";

import SelectedProviderDetails from "./SelectedProviderDetails";

export default function ProviderHomepage() {
  const [providerList, setProviderList] = useState([]);
  const [providerId, setProviderId] = useState(
    localStorage.getItem("Provider ID")
  );
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
    localStorage.setItem("Provider ID", prep[0].id);
  };

  return (
    <HomePageWrapper>
      <DashboardHeader>Provider Dashboard</DashboardHeader>
      <IntroWrapper>
        <h3>{JSON.parse(localStorage.getItem("userMessage"))}</h3>
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



const Button = styled.button`
  padding: 0.5rem 1rem;
  min-width: 7rem;
  background: transparent;
  border: 1px solid black;
  outline: none;
  &:hover {
    background: #0C0683;
    color: white;
  }
`;

const DashboardHeader = styled.h1`
  background: #0C0683;
  color: white;
  border-radius: 5px;
  font-size: 2.7rem;
  padding: 0.8rem;
  border-bottom: 1px solid black;
`;

const HomePageWrapper = styled.div`
  width: 85%;
  margin: auto;
  margin-top: 10vh;
`;

const IntroWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
`;
 
