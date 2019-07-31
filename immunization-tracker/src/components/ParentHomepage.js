import React, { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import ShotsTableP from "./ProviderRecordPage/ShotsTableP"

const ParentHomepage = props => {
  const [parent, setParent] = useState([]);
  const [children, setChildren] = useState([]);
  const id = 1;
  // const id = JSON.parse(localStorage.getItem("user ID"))

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/parents/children/${id}`
      )
      .then(response => {
        const data = response.data;
        setChildren(data);
        console.log("children data", data);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`https://immunization-tracker-van.herokuapp.com/api/parents/${id}`)
      .then(response => {
        const data = response.data;
        setParent(data);
      });
  }, [id]);

  console.log("parent homepage", parent);
  // console.log("first name", parent[0].firstName);
  // console.log("last name", parent[0].lastName);

  if (parent.length === 0) {
    return <p>Loading...</p>;
  }

  const [parentObj] = [...parent];
  console.log("parentObj", parentObj);

  return (
    <div>
      <ShotsTableP id="1"/>
      
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
        <Link to={`/edit/${id}`}>
          <button>Edit Profile</button>
        </Link>
      </div>
      {children.map(child => (
        <InfoCard person={child} />
      ))}
    </div>
  );
};

export default ParentHomepage;
