import React, { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShotsTableP from "./ProviderRecordPage/ShotsTableP";

const ParentHomepage = props => {
  const [parent, setParent] = useState([]);
  const [children, setChildren] = useState([]);

  // const id = 1;
  const id = JSON.parse(localStorage.getItem("user ID"));

  console.log("the user id is", id);

  useEffect(() => {
    axios
      .get(`https://immunization-tracker-van.herokuapp.com/api/parents/${id}`)
      .then(response => {
        const data = response.data;
        setParent(data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/parents/children/${id}`
      )
      .then(response => {
        const data = response.data;
        setChildren(data);
        console.log("children data", data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  console.log("parent homepage", parent);
  // console.log("first name", parent[0].firstName);
  // console.log("last name", parent[0].lastName);

  if (parent.length === 0) {
    return <p>Loading profile...</p>;
  }

  const [parentObj] = [...parent];
  console.log("parentObj", parentObj);

  return (
    <Wrapper>
      <DashboardHeader>Parent Dashboard TESTING NETLIFY</DashboardHeader>
      
      <div>
        {/* <ShotsTableP id="1"/> */}
        <h1>
          {parentObj.firstName} {parentObj.lastName}
        </h1>
        <p>
          (<em>{parentObj.username})</em>
        </p>
        <p>{parentObj.address1}</p>
        <p>
          {parentObj.city}, {parentObj.state} {parentObj.zip}
        </p>
        <p>{parentObj.phone}</p>
        <p>{parentObj.email}</p>
        <div>
          <Link to={`/user/edit/${id}`}>
            <Button>Edit Profile</Button>
          </Link>
        </div>
        <h1>Children</h1>
        {children.length === 0 ? (
          <p>You currently have no children added to track in your profile.</p>
        ) : (
          children.map(child => <InfoCard key={child.id} person={child} />)
        )}
        <div>
          <Link to={`/create-child/${id}`}>
            <Button>Add Child</Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 85%;
  padding: 2rem;
  margin: auto;
  margin-top: 10vh;
  border: 3px solid #ececec;
  border-radius: 4px;
`;

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

export default ParentHomepage;
