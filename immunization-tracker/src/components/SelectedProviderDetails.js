import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
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
          <p>Please select your associated provider above.</p>
        ) : (
          <>
            <h3>{providerDetails[0].name}</h3>
            <p>
              {providerDetails[0].address1} {providerDetails[0].address2}
            </p>
            <p>
              {providerDetails[0].city}, {providerDetails[0].state}{" "}
              {providerDetails[0].zip}
            </p>
            <p>{providerDetails[0].phone}</p>
            <Route exact path="/editprovider" component="EditProvider" />
            <Link to="">Edit This Provider</Link>
            <br />
            <Link to="">Add New Provider</Link>
            <DisplayPatients providerId={providerDetails[0].id} />
          </>
        )}
      </div>
    </section>
  );
}
