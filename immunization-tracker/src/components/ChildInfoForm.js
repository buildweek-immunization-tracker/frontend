import React, { useState, useEffect } from "react";
import Axios from "axios";

function ChildInfoForm(props) {
    console.log(props);

    const [formData, setFormData] = useState({
        "firstName":"", 
        "lastName":"", 
        "DOB":null, 
        "provider":null, 
        "comments":""});
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
            Axios
            .get(`https://immunization-tracker-van.herokuapp.com/api/children/${id}`)
            .then(res => setFormData(...formData, ...res.data));
        }
    }, []);


    useEffect(() => {
        Axios.get('https://immunization-tracker-van.herokuapp.com/api/providers')
        .then(res => setProviders(res.data));
    }, []);
    

    //change handler for new child object
    const handleChange = event => {
        const inputChild = { ...formData, [event.target.name]: event.target.value };
        setFormData(inputChild);
    };


    //if this is a new child object, submit handler will post that object to the API
    const handleSubmit = event => {
        event.preventDefault();
        if (isUpdate){
            Axios.put(`https://immunization-tracker-van.herokuapp.com/api/children/${id}`,
                formData)
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

    return (
        <div className="child-form">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>
                <label>
                    Last Name
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>
                <label>
                    Date of Birth
                    <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
                </label>
                <label>
                    Medical Provider
                    <select name="provider" value={formData.provider} onChange={handleChange} required>
                        {...providers.map(provider => {
                            return <option value={provider.id}> 
                            {provider.name} </option>
                        }) }
                    </select>
                </label>
                <label>
                    Medical Notes (Optional)
                    <input type="text" name="comments" value={formData.comments} onChange={handleChange} />
                </label>
                <button type="submit">Set Child Profile</button>
            </form>
            <button onClick={toDeleteChild} >Delete Child Profile</button>
        </div>

    );


}

export default ChildInfoForm;