import React, { useState, useEffect } from "react";
import axios from "axios";
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
  );
}
