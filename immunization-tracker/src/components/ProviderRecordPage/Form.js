import React, {useState, useEffect} from 'react';
import axios from "axios";
import ShotsTableP from"./ShotsTableP";

export default function Form({ChildID, id, clinicName}){

    const [inputValue, setInputValue] = useState("");
    
    const [newDate, setNewDate] = useState({
        "location": "Hospital",
        "childId": 1,
        "immunizationId": 3,
        "dateReceived": ""
    })

    // useEffect(()=>{
    // }, [newDate])

    const handleChange = event =>{
        setInputValue(event.target.value);
        console.log("This is set input val", event.target.value);
        console.log("This is input val after", inputValue);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        // console.log("This is input value", inputValue);
        // console.log("This is new date before", newDate);
        setNewDate({...newDate,"dateReceived":inputValue});
        // console.log("This is input value after setting", inputValue);
        // // console.log(inputValue);
        console.log("This is new after", newDate);
        axios
            .post(
                "https://immunization-tracker-van.herokuapp.com/api/immunizations/insert",
                newDate
            )
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

            // window.location.reload();
    }

 



    return(
        <div>
            <div className="App">
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <input type="date" 
                        id="start" 
                        name="cal"
                        min="1930-01-01" max="2050-12-31"
                        onChange={event => handleChange(event)}
                        value={inputValue}
                        />
                     <button>submit</button>
                </form>
            </div>
        </div>
    )
}