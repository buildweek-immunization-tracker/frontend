import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Button, Form } from "semantic-ui-react";

function ChildInfoForm(props) {
  //console.log(props);
  const parentId = props.match.params.parentId;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: null,
    providerId: null,
    comments: "",
    parentId: parentId,
    isPermission: 0,
    comments: null,
    gender: "male"
  });
  const [providers, setProviders] = useState([]);

  let id = null;
  let isUpdate = false;
  //if a child ID is passed in, this is an update. Otherwise, this is a new child object.
  if (id in props.match.params) {
    id = props.match.params.id;
    isUpdate = true;
  }

  useEffect(() => {
    if (isUpdate) {
      Axios.get(
        `https://immunization-tracker-van.herokuapp.com/api/children/${id}`
      ).then(res => setFormData(...formData, ...res.data));
    }
  }, [formData, id, isUpdate]);

  useEffect(() => {
    Axios.get(
      "https://immunization-tracker-van.herokuapp.com/api/providers"
    ).then(res => setProviders(res.data));
  }, []);

  //change handler for new child object
  const handleChange = event => {
    const inputChild = { ...formData, [event.target.name]: event.target.value };
    setFormData(inputChild);
  };

  const handleProviderChange = event => {
    const provider = parseInt(event.target.value);
    setFormData({ ...formData, [event.target.name]: provider });
  };

  //if this is a new child object, submit handler will post that object to the API
  console.log("FORMDATA", formData);
  const handleSubmit = event => {
    event.preventDefault();
    if (isUpdate) {
      Axios.put(
        `https://immunization-tracker-van.herokuapp.com/api/children/${id}`,
        formData
      )
        .then(res => {
          console.log(res.data);
          props.history.push("/parent");
        })
        .catch(error => 
            console.log(error)
        );
    } else {
      Axios.post(
          "https://immunization-tracker-van.herokuapp.com/api/children",
          formData)
      .then(res => {
          console.log(res.data);
          props.history.push("/parent");
      })
      .catch(error => 
          console.log(error)
      );
  } 
};

  // if (existingChild === null) {
  //     return <div>Loading...</div>
  // }
  const toDeleteChild = event => {
    event.preventDefault();
    Axios.delete(
        `https://immunization-tracker-van.herokuapp.com/api/children/${id}`)
    .then(res => {
        props.history.push("/parent");
    })
    .catch(error => 
        console.log(error)
    );
  };

    console.log("PROVIDERS", providers);

    return (
        <div className="child-form-container">
            <Form className="child-form" onSubmit={handleSubmit}>
                <Form.Field className="field">
                    <label>
                        First Name
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </label>
                </Form.Field>
                <Form.Field className="field">
                    <label>
                        Last Name
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </label>
                </Form.Field>
                <Form.Field className="field">
                    <label>
                        Date of Birth
                        <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
                    </label>
                </Form.Field>
                <Form.Field className="field">
                    <label>
                        Medical Provider
                        <select name="providerId" value={formData.providerId} onChange={handleProviderChange} required>
                            {providers.map(provider => {
                                return <option value={provider.id}> 
                                {provider.name} </option>
                            }) }
                        </select>
                    </label>
                </Form.Field>
                <Form.Field className="field">
                    <label>
                        Medical Notes (Optional)
                        <input type="text" name="comments" value={formData.comments} onChange={handleChange} />
                    </label>
                </Form.Field>
                <Button type="submit" >Set Child Profile</Button>
            </Form>
            <Button onClick={toDeleteChild} >Delete Child Profile</Button>
        </div>

    );


}

export default ChildInfoForm;
