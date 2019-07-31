import React, { useState, useEffect } from "react";
import InfoCard from "./InfoCard";
import axios from "axios";
import { Link } from "react-router-dom";

const ParentHomepage = props => {
  const [parent, setParent] = useState([]);
  const [children, setChildren] = useState([]);
  const id = 1;
  // const id = JSON.parse(localStorage.getItem("user ID"))

  const newParent = {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    userId: localStorage.getItem("user ID"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email")
  };

  useEffect(() => {
    axios
      .post(
        `https://immunization-tracker-van.herokuapp.com/api/parents`,
        newParent
      )
      .then(response => {
        const data = response.data;
        console.log("children data", data);
      })
      .catch(err => {
        console.log(err);
      });
  });

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
