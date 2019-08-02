import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import GetParentOfPatient from "./GetParentOfPatient";
import { Card } from "semantic-ui-react";

export default function DisplayPatients(props) {
  const [childList, setChildList] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/providers/children/${
          props.providerId
        }`
      )
      .then(res => {
        setChildList(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.providerId]);

  const filteredList = childList.filter(item => item.isPermission != 0);

  return (
    <PatientsWrapper>
      <DashboardHeader>Patients</DashboardHeader>
      <CardWrapper>
        {filteredList.map(child => (
          <div>
            <Card>
              <Card.Content>
                <Card.Header>
                  {child.firstName} {child.lastName}
                </Card.Header>
                <Card.Description>
                  <GetParentOfPatient parentId={child.parentId} />
                  DOB: {child.DOB} <br />
                  Sex: {child.gender} <br /> <br />
                  <br />
                  <Link to={`/patient/edit/${child.id}`}>
                    <Button>Edit History</Button>
                  </Link>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        ))}
      </CardWrapper>
    </PatientsWrapper>
  );
}

const Button = styled.button`
  padding: 0.5rem 1rem;
  min-width: 7rem;
  background: transparent;
  border: 1px solid black;
  outline: none;
  &:hover {
    background: #0c0683;
    color: white;
  }
`;

const DashboardHeader = styled.h2`
  background: #f4f4f4;
  font-size: 1.2rem;
  padding: 0.8rem;
  border-radius: 5px;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const PatientsWrapper = styled.div`
  width: 66%;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 5%;
`;
