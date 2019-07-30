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
    // we will send API request for user object to be updated
  };

  if (!person) {
    return <p>Loading profile...</p>;
  }

  console.log("newData in person edit", newData);
  return (
    <div>
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
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            {" "}
            Zip Code:
            <input
              type="number"
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
      </form>
    </div>
  );
};

export default ParentEdit;