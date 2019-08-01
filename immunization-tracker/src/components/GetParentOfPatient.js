import React, { useState, useEffect } from "react";
import axios from "axios";

export default function GetParentOfPatient(props) {
  const [parent, updateParent] = useState({});

  console.log(parent.firstName);

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/parents/${
          props.parentId
        }`
      )
      .then(res => {
        updateParent(...res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.parentId]);

  return (
    <>
      <p>
        Parent: {parent.firstName} {parent.lastName}
      </p>
      <p>Parent Phone: {parent.phone}</p>
    </>
  );
}
