import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import GetParentOfPatient from "./GetParentOfPatient";
import { Button, Card} from 'semantic-ui-react'

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
<<<<<<< HEAD
    <div>
      
      <h3>Patients</h3>
      <div className="card">
        {filteredList.map(child => (
          <div className="row">
            <Card>
              <Card.Content>
                <Card.Header>{child.firstName} {child.lastName}</Card.Header>
                <Card.Meta>
                  <GetParentOfPatient parentId={child.parentId} />
                </Card.Meta>
                <Card.Description>
                  DOB: {child.DOB} <br/>
                  Sex: {child.gender} <br/>
                  <Button>Submit</Button>
                </Card.Description>
              </Card.Content>
            </Card>
            
          </div>
        ))}
      </div>
    </div>
=======
    <PatientsWrapper>
      <h3>Patients</h3>

      {filteredList.map(child => (
        <div className="card" key={child.id}>
          <p>
            Name: {child.firstName} {child.lastName}
          </p>
          <p>DOB: {child.DOB}</p>
          <p>Gender: {child.gender}</p>
          <GetParentOfPatient parentId={child.parentId} />
          <p className="button">
            <Link to={`/patient/edit/${child.id}`}>Edit History</Link>
          </p>
        </div>
      ))}
    </PatientsWrapper>
>>>>>>> 6135d2d9a40fe5912fddbe1ed374d9dda898e294
  );
}

const PatientsWrapper = styled.div`
  .card {
    border: 1px solid black;
    margin: 2rem 0;
    padding: 1rem;
  }

  a {
    text-decoration: none;
    color: black;
    border: 1px solid black;
    padding: 0.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;
