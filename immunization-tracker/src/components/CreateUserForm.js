import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import styled from "styled-components";

function CreateUserForm(props) {
  const { touched, errors } = props;

  return (
    <AddUserWrapper>
      <Form>
        <label>
          First Name
          <Field
            name="firstName"
            type="text"
            placeholder="First Name"
            autoComplete="off"
          />
          <div className="error-message">
            {touched.firstName && errors.firstName}
          </div>
        </label>

        <label>
          Last Name
          <Field
            name="lastName"
            type="text"
            placeholder="Last Name"
            autoComplete="off"
          />
          <div className="error-message">
            {touched.lastName && errors.lastName}
          </div>
        </label>

        <label>
          Username
          <Field
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="off"
          />
          <div className="error-message">
            {touched.username && errors.username}
          </div>
        </label>
        <label>
          Email
          <Field
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="off"
          />
          <div className="error-message">{touched.email && errors.email}</div>
        </label>
        <label>
          Password
          <Field
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          <div className="error-message">
            {touched.password && errors.password}
          </div>
        </label>
        <label>
          User Type
          <Field component="select" name="role">
            <option value="" label="" />
            <option value="parent">Parent</option>
            <option value="staff">Healthcare Provider</option>
          </Field>
          <div className="error-message">{touched.role && errors.role}</div>
        </label>
        <button type="submit">Create Account</button>
      </Form>
    </AddUserWrapper>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      role: ""
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
      .required("Please enter a first name.")
      .min(2, "Please enter a first name."),
    lastName: Yup.string()
      .required("Please enter a last name.")
      .min(2, "Please enter a last name."),

    username: Yup.string()
      .required("Please enter a username.")
      .min(2, "Please enter a username."),
    email: Yup.string()
      .required("Please enter an email.")
      .email("Email is not valid."),
    password: Yup.string()
      .required("Please enter a password.")
      .min(8, "Password must be at least 8 characters."),
    role: Yup.string()
      .required("Please choose a user type.")
      .min(3, "Please chose a user type.")
  }),

  handleSubmit(values, formikBag) {
    localStorage.setItem("firstName", JSON.stringify(values.firstName));
    localStorage.setItem("lastName", JSON.stringify(values.lastName));
    localStorage.setItem("username", JSON.stringify(values.username));
    localStorage.setItem("email", JSON.stringify(values.email));

    const newUser = {
      email: values.email,
      username: values.username,
      password: values.password,
      role: values.role
    };
    axios
      .post(
        "https://immunization-tracker-van.herokuapp.com/api/providers",
        newUser
      )
      .then(res => {
        console.log(formikBag.props);
        formikBag.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
      });
  }
})(CreateUserForm);

const AddUserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  div {
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    label {
      display: flex;
      flex-direction: column;
      input {
        padding: 0.5rem;
      }
    }
  }
  button {
    padding: 0.5rem;
  }

  select {
    padding: 0.25rem;
  }
`;
