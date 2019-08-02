import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

function AddProvider(props) {
  const { touched, errors } = props;
  return (
    <AddProviderWrapper>
      <h3>Add a Provider</h3>

      <Form>
        <label>
          Name
          <Field
            name="name"
            type="text"
            placeholder="Provider Name"
            autoComplete="off"
          />
          <div className="error-message">{touched.name && errors.name}</div>
        </label>

        <label>
          Address
          <Field
            name="address1"
            type="text"
            placeholder="Address"
            autoComplete="off"
          />
          <div className="error-message">
            {touched.address1 && errors.address1}
          </div>
        </label>

        <label>
          Address Continued
          <Field
            name="address2"
            type="text"
            placeholder="address2"
            autoComplete="off"
          />
          <div className="error-message">
            {touched.address2 && errors.address2}
          </div>
        </label>
        <label>
          City
          <Field
            name="city"
            type="text"
            placeholder="City"
            autoComplete="off"
          />
          <div className="error-message">{touched.city && errors.city}</div>
        </label>

        <label>
          State
          <Field
            name="state"
            type="text"
            placeholder="State"
            autoComplete="off"
          />
          <div className="error-message">{touched.state && errors.state}</div>
        </label>

        <label>
          Zip Code
          <Field
            name="zip"
            type="text"
            placeholder="Zip Code"
            autoComplete="off"
          />
          <div className="error-message">{touched.zip && errors.zip}</div>
        </label>

        <label>
          Phone
          <Field
            name="phone"
            type="text"
            placeholder="Phone"
            autoComplete="off"
          />
          <div className="error-message">{touched.phone && errors.phone}</div>
        </label>
        <button type="submit">Create Provider</button>
      </Form>
    </AddProviderWrapper>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      name: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      phone: ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Please enter a name.")
      .min(2, "Please enter a name."),

    address1: Yup.string()
      .required("Please enter street address.")
      .min(2, "Please enter street address."),

    address2: Yup.string(),

    city: Yup.string()
      .required("Please enter city.")
      .min(2, "Please enter city."),

    state: Yup.string().required("Please enter state."),

    zip: Yup.string()
      .required("Please enter a zip code.")
      .min(5, "Plese enter a zip code."),

    phone: Yup.string()
      .required("Please enter a 10 digit phone number.")
      .min(10, "Please enter a 10 digit phone number.")
  }),

  handleSubmit(values, formikBag) {
    const newProvider = {
      name: values.name,
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      state: values.state,
      zip: values.zip,
      phone: values.phone
    };
    axios
      .post(
        "https://immunization-tracker-van.herokuapp.com/api/providers",
        newProvider
      )
      .then(res => {
        formikBag.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
})(AddProvider);

const AddProviderWrapper = styled.div`
  margin: 0 2rem;
  padding: 1rem;
  border: 1px solid black;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  width: 20vw;
  label {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    input {
      padding: 0.25rem;

      margin-bottom: 1rem;
    }
  }
`;
