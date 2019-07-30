import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreateUserForm({ touched, errors }) {
  return (
    <section>
      <Form>
        <Field
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="off"
        />
        <Field
          name="username"
          type="username"
          placeholder="Username"
          autoComplete="off"
        />
        <Field
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
        />
        <Field component="select" name="role">
          <option value="" label="User Type" />
          <option value="parent">Parent</option>
          <option value="staff">Healthcare Provider</option>
        </Field>

        <button type="submit">Submit</button>
      </Form>
      <div className="error-group">
        <div className="error-message">{touched.email && errors.email}</div>
        <div className="error-message">
          {touched.username && errors.username}
        </div>
        <div className="error-message">
          {touched.password && errors.password}
        </div>
        <div className="error-message">{touched.role && errors.role}</div>
      </div>
    </section>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      email: "",
      password: "",
      role: ""
    };
  },

  validationSchema: Yup.object().shape({
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
    console.log(values);
    formikBag.resetForm();
    axios
      .post(
        "https://immunization-tracker-van.herokuapp.com/api/auth/register",
        values
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
})(CreateUserForm);
