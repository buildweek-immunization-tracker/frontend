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
          <SelectDiv onChange={e => handleChanges(e)}>
            {providerList.map(provider => (
              <option key={provider.id}>{provider.name}</option>
            ))}
          </SelectDiv>
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
 const SelectDiv = styled.select`
 
  select {
   display: none; /*hide original SELECT element: */
 }
 
 .select-selected {
   background-color: DodgerBlue;
 }
 
 .select-selected:after {
   position: absolute;
   content: "";
   top: 14px;
   right: 10px;
   width: 0;
   height: 0;
   border: 6px solid transparent;
   border-color: #fff transparent transparent transparent;
 }
 
 /* Point the arrow upwards when the select box is open (active): */
 .select-selected.select-arrow-active:after {
   border-color: transparent transparent #fff transparent;
   top: 7px;
 }
 
 /* style the items (options), including the selected item: */
 .select-items div,.select-selected {
   color: #ffffff;
   padding: 8px 16px;
   border: 1px solid transparent;
   border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
   cursor: pointer;
 }
 
 /* Style items (options): */
 .select-items {
   position: absolute;
   background-color: DodgerBlue;
   top: 100%;
   left: 0;
   right: 0;
   z-index: 99;
 }
 
 /* Hide the items when the select box is closed: */
 .select-hide {
   display: none;
 }
 
 .select-items div:hover, .same-as-selected {
   background-color: rgba(0, 0, 0, 0.1);
 }
 `;
