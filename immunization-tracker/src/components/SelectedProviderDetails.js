import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import {Button} from "semantic-ui-react"
import styled from "styled-components"
import axios from "axios";

import DisplayPatients from "./DisplayPatients";

export default function ProviderChangeForm(props) {
  const [providerDetails, setProviderDetails] = useState([{}]);

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/providers/${
          props.providerId
        }`
      )
      .then(res => {
        setProviderDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.providerId]);

  return (
    <section className="provider-details-wrapper">
      <div>
        {!providerDetails.length > 0 ? (
          <InfoDiv><p>Please select your associated provider above.</p></InfoDiv>
        ) : (
          <>
            <InfoDiv>
              <h3>{providerDetails[0].name}</h3>
              <p>
                {providerDetails[0].address1} {providerDetails[0].address2}
              </p>
              <p>
                {providerDetails[0].city}, {providerDetails[0].state}{" "}
                {providerDetails[0].zip}
              </p>
              <p>{providerDetails[0].phone}</p>
            </InfoDiv>
            <ButtonDiv>
              <Route exact path="/editprovider" component="EditProvider" />
              <Link to=""><Button>Edit This Provider</Button></Link>
              <br />
              <Link to=""><Button>Add New Provider</Button></Link>
            </ButtonDiv>
            <DisplayPatients providerId={providerDetails[0].id} />
          </>
        )}
      </div>
    </section>
  );

}



const ButtonDiv = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    border: 1px solid green;
    margin: auto;
  
  `;

const InfoDiv = styled.div`
    width: 50%;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    border: 1px solid green;
    margin: auto;
    margin-bottom: 5%;
    margin-top: 5%;
  
  `;