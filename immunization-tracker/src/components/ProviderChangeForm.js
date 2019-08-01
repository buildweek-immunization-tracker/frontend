import React, { useEffect, useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import axios from "axios";

export default function ProviderChangeForm(props) {
  const [providerDetails, setProviderDetails] = useState([{}]);
  const providerId = localStorage.getItem("Provider ID");

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/providers/${providerId}`
      )
      .then(res => {
        setProviderDetails(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [providerId]);

  return (
    <section className="provider-details-wrapper">
      <div>
        {providerId == undefined ? (
          <p>Please select associated provider above.</p>
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
          </>
        )}
      </div>
      <Route exact path="/editprovider" component="EditProvider" />
      <Link to="">Edit This Provider</Link>
      <br />
      <Link to="">Add New Provider</Link>
    </section>
  );
}
