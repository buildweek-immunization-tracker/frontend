import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form } from "semantic-ui-react";

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
        const {
          firstName,
          lastName,
          address1,
          address2,
          zip,
          state,
          city,
          phone,
          comments,
          userId
        } = response.data[0];
        setNewData({
          firstName,
          lastName,
          address1,
          address2,
          zip,
          state,
          city,
          phone,
          comments,
          userId
        });
      });
  }, []);

  console.log("NEW DATA", newData);
  const onDataChange = event => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  const sendUpdateRequest = event => {
    event.preventDefault();

    // we will send API request for user object to be updated using 'newData' object
    axios
      .put(
        `https://immunization-tracker-van.herokuapp.com/api/parents/${id}`,
        newData
      )
      .then(response => {
        props.history.push("/parent/");
      })
      .catch(error => {
        console.log("There was an error:", error);
        props.history.push("/parent/");
      });

    // setStatusMessage("Profile successfully updated");
    // setStatusMessage(
    //   "Something went wrong, please check your input and try again."
    // );
  };

  if (!person) {
    return <p>Loading profile...</p>;
  }

  console.log("newData in person edit", newData);
  return (
    <div className="form-container">
      <div>{statusMessage ? <p>{statusMessage}</p> : <p>&nbsp;</p>}</div>
      <Form className="form" onSubmit={sendUpdateRequest}>
      <h1>Your Information</h1>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field">
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
        </Form.Field>
        <Form.Field className="field"></Form.Field>
        <Button>Update Profile</Button>
      </Form>
    </div>
  );
};

export default ParentEdit;
