import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import GetParentOfPatient from "./GetParentOfPatient";
import {Button, Card} from 'semantic-ui-react'

export default function DisplayPatients(props) {
  console.log("Props: ", props);
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
                <Card.Header>{child.firstName} {child.lastName}</Card.Header>
                <Card.Meta>
                  <GetParentOfPatient parentId={child.parentId} />
                </Card.Meta>
                <Card.Description>
                  DOB: {child.DOB} <br/>
                  Sex: {child.gender} <br/> <br/><br/>
                  <Link to={`/patient/edit/${child.id}`}><Button>Edit History</Button></Link>
                </Card.Description>
            </Card.Content>
            </Card>
            
          </div>
        ))}
      </CardWrapper>
    </PatientsWrapper>
  );
}

const DashboardHeader = styled.h2`
  background: #f4f4f4;
  font-size: 1.2rem;
  padding: 0.8rem;
  border-bottom: 1px solid black;
`;
const CardWrapper = styled.div`
  border: 1px solid green;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const PatientsWrapper = styled.div`
  width: 66%;
  border: 1px solid green;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  margin-top: 5%;
`;
