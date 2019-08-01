import React, { useState, useEffect } from "react";

import axios from "axios";

const ObjectCreate = props => {
  const [person, setPerson] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const id = localStorage.getItem("user ID");

  const newObj = {
    userId: id,
    firstName: JSON.parse(localStorage.getItem("firstName")),
    lastName: JSON.parse(localStorage.getItem("lastName"))
  };

  useEffect(() => {
    axios
      .get(`https://immunization-tracker-van.herokuapp.com/api/parents/${id}`)
      .then(response => {
        console.log("RESPONSE IN USE EFFECT", response.data);
        setPerson(response.data);
        setHasLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (hasLoaded && person.length > 0) {
      props.history.push("/parent/");
    }
    if (hasLoaded && person.length === 0) {
      axios
        .post(
          `https://immunization-tracker-van.herokuapp.com/api/parents`,
          newObj
        )
        .then(response => {
          props.history.push("/parent/");
        })
        .catch(err => {
          console.log(err);
          props.history.push("/parent/");
        });
    }
  }, [hasLoaded]);

  console.log("PERSON LENGTH", person.length);
  return <div />;
};

export default ObjectCreate;
