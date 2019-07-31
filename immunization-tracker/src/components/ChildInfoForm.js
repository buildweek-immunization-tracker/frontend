import React, { useState } from "react";
import Axios from "axios";

function ChildInfoForm(props) {
    console.log(props);

    //if a child ID is passed in, this is an update. Otherwise, this is a new child object.
    const id = props.match.params.id;
    const isUpdate = (id !== null);
    
    //state for new child object
    const [child, setChild] = useState({})

    //state for existing child object
    const [existingChild, updateExistingChild] = useState(null)

    //change handler for new child object
    const handleChange = event => {
        const inputChild = { ...child, [event.target.name]: event.target.value };
        setChild(inputChild);
    };

    //change handler for existing child object
    const handleEdit = event => {
        const editedChild = { ...existingChild, [event.target.name]: event.target.value };
        updateExistingChild(editedChild);
    }


    //if this is a new child object, submit handler will post that object to the API
    const handleNewSubmit = event => {
        event.preventDefault();
        Axios.post(
            "https://immunization-tracker-van.herokuapp.com/api/children",
            child
        )
        .then(res => {
            console.log(res.data);
            props.history.push("/parent");
        })
        .catch(error => 
            console.log(error)
        );
    };

    //if this is an existing child object, submit handler will use ID and existingChild to update selected child object on API
    const handleExistingSubmit = event => {
        event.preventDefault();
        Axios.put(
            `https://immunization-tracker-van.herokuapp.com/api/children/${id}`,
            existingChild  
        )
        .then(res => {
            console.log(res.data);
            props.history.push("/parent");
        })
        .catch(error => 
            console.log(error)
        );
    };

    if (existingChild === null) {
        return <div>Loading...</div>
    }

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

    return (
        <div className="child-form">
            <form onSubmit={isUpdate ? handleExistingSubmit : handleNewSubmit}>
                <label>
                    First Name
                    <input type="text" name="firstName" value={child.firstName} onChange={isUpdate ? handleEdit : handleChange} required />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lastName" value={child.lastName} onChange={isUpdate ? handleEdit : handleChange} required />
                </label>
                <label>
                    Date of Birth
                    <input type="date" name="DOB" value={child.DOB} onChange={isUpdate ? handleEdit : handleChange} required />
                </label>
                <label>
                    Medical Provider
                    <select name="providers" required>
                        {/* map over providers array and add provider name as value */}
                    </select>
                </label>
                <label>
                    Medical Notes (Optional)
                    <input type="text" name="comments" value={child.comments} onChange={isUpdate ? handleEdit : handleChange} />
                </label>
                <button type="submit">Set Child Profile</button>
            </form>
            <button onClick={toDeleteChild} >Delete Child Profile</button>
        </div>

    );


}

export default ChildInfoForm;