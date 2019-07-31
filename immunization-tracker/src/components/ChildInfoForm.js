import React, { useState } from "react";
import Axios from "axios";

function ChildInfoForm(props) {
    console.log(props);

    //isUpdate? if so, make a call to fetch the child's data based on passed-in id
    const [child, setChild] = useState({})
    const [existingChild, updateExistingChild] = useState({})

    //handle changes on form inputs
    const handleChange = event => {
        const inputChild = { ...child, [event.target.name]: event.target.value };
        setChild(inputChild);
    };

    //submit handler will control the form's submission, either creating a new child object and sending to API, or updating selected child info to API
    const handleSubmit = event => {
        event.preventDefault();
    };

    return (
        <div className="child-form">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input type="text" name="firstName" value={child.firstName} onChange={handleChange} required />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lastName" value={child.lastName} onChange={handleChange} required />
                </label>
                <label>
                    Date of Birth
                    <input type="date" name="DOB" value={child.DOB} onChange={handleChange} required />
                </label>
                <label>
                    Medical Provider
                    <select name="providers" required>
                        {/* map over providers array and add provider name as value */}
                    </select>
                </label>
                <label>
                    Medical Notes (Optional)
                    <input type="text" name="comments" value={child.comments} onChange={handleChange} />
                </label>
                <button type="submit" >Create Child Profile</button>
            </form>
        </div>

    );


}

export default ChildInfoForm;