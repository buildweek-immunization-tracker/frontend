import React, { useEffect } from "react";

import axios from "axios";

const ObjectCreate = props => {
  const id = localStorage.getItem("user ID");

  const newObj = {
    userId: id,
    firstName: JSON.parse(localStorage.getItem("firstName")),
    lastName: JSON.parse(localStorage.getItem("lastName"))
  };

  useEffect(() => {
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
  }, []);

  return <div />;
};

export default ObjectCreate;
