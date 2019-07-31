import React, { useState } from "react";
import Axios from "axios";

function ChildInfoForm(props){
    console.log(props);

    //isUpdate? if so, make a call to fetch the child's data based on passed-in id

    const [child, setChild] = useState({})

    //allow editing of form inputs
    const handleChange = event => {
        const inputUser = { ...user, [event.target.name]: event.target.value };
        setUser(inputUser);

    };

    //submit handler will control the form's submission, either creating a new card component if child is new, or putting updated child info to API
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
                <button type="submit" >Create Child Profile</button>
            </form>
        </div>

    );


}

export default ChildInfoForm;