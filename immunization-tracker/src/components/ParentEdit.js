import React, { useState, useEffect } from "react";
import axios from "axios";

const ParentEdit = props => {
  const initialState = {
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    username: "",
    comments: ""
  };
  const [person, setPerson] = useState(null);
  const [newData, setNewData] = useState(initialState);
  const [statusMessage, setStatusMessage] = useState("");
  // array of US states
  const [statesArray, setStatesArray] = useState([
    "AK",
    "AL",
    "AR",
    "AS",
    "AZ",
    "CA",
    "CO",
    "CT",
    "DC",
    "DE",
    "FL",
    "GA",
    "GU",
    "HI",
    "IA",
    "ID",
    "IL",
    "IN",
    "KS",
    "KY",
    "LA",
    "MA",
    "MD",
    "ME",
    "MI",
    "MN",
    "MO",
    "MS",
    "MT",
    "NC",
    "ND",
    "NE",
    "NH",
    "NJ",
    "NM",
    "NV",
    "NY",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VA",
    "VI",
    "VT",
    "WA",
    "WI",
    "WV",
    "WY"
  ]);
  // grab user id from url
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`https://immunization-tracker-van.herokuapp.com/api/parents/${id}`)
      .then(response => {
        setPerson(...response.data);
        // take object out of array and set the state
        setNewData(...response.data);
      });
  }, []);

  const onDataChange = event => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  const sendUpdateRequest = event => {
    event.preventDefault();

    // we will send API request for user object to be updated using 'newData' object
    setStatusMessage("Profile successfully updated");
    setStatusMessage(
      "Something went wrong, please check your input and try again."
    );
  };

  if (!person) {
    return <p>Loading profile...</p>;
  }

  console.log("newData in person edit", newData);
  return (
    <div>
      <div>{statusMessage ? <p>{statusMessage}</p> : <p>&nbsp;</p>}</div>
      <h1>Editing {person.firstName}'s Profile</h1>
      <form onSubmit={sendUpdateRequest}>
        <div>
          <label>
            {" "}
            First Name:
            <input
              type="text"
              name="firstName"
              value={newData.firstName}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Last Name:
            <input
              type="text"
              name="lastName"
              value={newData.lastName}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Address:
            <input
              type="text"
              name="address1"
              value={newData.address1}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Address 2:
            <input
              type="text"
              name="address2"
              value={newData.address2}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            City:
            <input
              type="text"
              name="city"
              value={newData.city}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            State:
            <select name="state" onChange={onDataChange}>
              {statesArray.map(state => {
                return (
                  <option
                    key={state}
                    value={state}
                    selected={state === newData.state ? true : false}
                  >
                    {state}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          <label>
            {" "}
            Zip Code:
            <input
              type="text"
              name="zip"
              value={newData.zip}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Phone:
            <input
              type="tel"
              name="phone"
              value={newData.phone}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            {" "}
            Email:
            <input
              type="email"
              name="email"
              value={newData.email}
              onChange={onDataChange}
            />
          </label>
        </div>
        <div>
          <button>Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default ParentEdit;
