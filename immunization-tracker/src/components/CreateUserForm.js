import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

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

        <button>Submit</button>
      </Form>
      <div className="error-group">
        <div className="error-message">
          {touched.username && errors.username}
        </div>
        <div className="error-message">{touched.email && errors.email}</div>
        <div className="error-message">
          {touched.password && errors.password}
        </div>
      </div>
    </section>
  );
}
export default withFormik({
  mapPropsToValues() {
    return {
      username: "",
      email: "",
      password: ""
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("Please enter a username.")
      .min(2, "Please enter a username."),
    email: Yup.string()
      .required("Please enter an age.")
      .email("Email is not valid."),
    password: Yup.string()
      .required("Please enter a password.")
      .min(8, "Password must be at least 8 characters.")
  }),

  handleSubmit(values, formikBag) {
    console.log(values);
    formikBag.resetForm();
  }
})(CreateUserForm);
