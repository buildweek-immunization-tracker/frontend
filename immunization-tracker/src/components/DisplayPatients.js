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
      <h3>Patients</h3>

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

const CardWrapper = styled.div`

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 85%;
  margin: auto;

`;

const PatientsWrapper = styled.div`

  border: 1px solid red;
  margin: auto;
  display: flex;
  flex-flow: column;
  margin-top: 5%;
`;
