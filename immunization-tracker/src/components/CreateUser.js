import REact from "react";
import {withFormik, Form, Field, yupToFormErrors } from "formik"

import * as Yup from "yup";

import {AddNewUser} from "../store/action";

function CreateUser({touched, errors}) {

return(
<Form>
<Field 
name="email"
type="email"
placeholder="Email"
/>
<Field 
name="username"
type="text"
placeholder="Username"
/>
<Field 
name="password"
type="password"
placeholder="Password"
/>

<button>Submit</button>
</Form>

)

export default withFormik {
    mapPropsToValue() {
        return {
            username: "",
            email: "",
            password: ""
        }
    }
}

validationSchema: yupToFormErrors.object().shape({
    username: Yup.string()
    .required("Please enter a username.")
    .min(8, "Username must be at least 8 characters."),
    email: Yup.string()
    .required("Please enter email."),
    password: Yup.string()
    .required("Please enter a password.")
    .min(8, "Password must be at least 8 characters.")
})

handleSubmit(values, forikBag) {
formikBag.prop.dispatch(addNewUser(values));
    }

}(CreateUser);