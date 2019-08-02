import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import {Button, Dropdown} from "semantic-ui-react"
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
          <MiddleDiv>
            <InfoDiv>
              <div>
                <h3>{providerDetails[0].name}</h3>
                <p>
                  {providerDetails[0].address1} {providerDetails[0].address2}
                </p>
                <p>
                  {providerDetails[0].city}, {providerDetails[0].state}{" "}
                  {providerDetails[0].zip}
                </p>
                <p>{providerDetails[0].phone}</p>
              </div>
              <ButtonDiv>
                <Route exact path="/editprovider" component="EditProvider" />
                <Link to=""><Button>Edit This Provider</Button></Link>
                <br />
                <Link to=""><Button>Add New Provider</Button></Link>
              </ButtonDiv>  
            </InfoDiv>
            <DisplayPatients providerId={providerDetails[0].id} />
          </MiddleDiv>
        )}
      </div>
    </section>
  );

}

const MiddleDiv= styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    margin: auto;
  `;

const ButtonDiv = styled.div`
    width: 95%;
    display: flex;
    justify-content: space-between;
  `;


const InfoDiv = styled.div`
    width: 30%;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;
    margin-bottom: 5%;
    margin-top: 5%;
    background-color:#f4f4f4;
    border-radius: 5px;
    border: 1px solid orange;

    div{
      margin-left: 2%;
      margin-top: 2%;
      margin-bottom:2%;
    }
  
  `;