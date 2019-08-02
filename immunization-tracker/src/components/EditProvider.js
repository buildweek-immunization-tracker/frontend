import React, { useState, useEffect } from "react";

import axios from "axios";

export default function DisplayPatients(props) {
  const [providerInfo, setProviderInfo] = useState([]);
  console.log(props.providerId);

  useEffect(() => {
    axios
      .get(
        `https://immunization-tracker-van.herokuapp.com/api/providers/${
          props.providerId
        }`
      )
      .then(res => {
        console.log("results: ", res.data);
        setProviderInfo(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.providerId]);

  const provider = providerInfo.map(item => item);
  console.log("Provider:", providerInfo);

  return (
    <div>
      <h3>Edit Provider</h3>
    </div>
  );
}
