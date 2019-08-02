import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

export default function GetParentOfPatient(props) {
  const [parent, updateParent] = useState({});

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
      <P>Parent Phone: {parent.phone}</P>
    </>
  );
}

const P = styled.p`
  color: red;

`;