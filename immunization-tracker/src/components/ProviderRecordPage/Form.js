import React, {useState, useEffect} from 'react';
import axios from "axios";
import ShotsTableP from"./ShotsTableP";

export default function Form({childId, shotID, clinicName}){

    
    const [newDate, setNewDate] = useState({
        "location": "Mount Sinai Hospital",
        "childId": childId,
        "immunizationId":shotID,
        "dateReceived": ""
    })


    const handleChange = event =>{
        // setInputValue(event.target.value);
        setNewDate({...newDate,"dateReceived":event.target.value});
        console.log("This date input", event.target.value);   
    }




    const handleSubmit = (event) =>{
        event.preventDefault();
        // console.log("This is input value", inputValue);
        // console.log("This is new date before", newDate);
        
        // console.log("This is input value after setting", inputValue);
        // // console.log(inputValue);
        console.log("This is new after", newDate);
        axios
            .post(
                "https://immunization-tracker-van.herokuapp.com/api/immunizations/insert",
                newDate
            )
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });

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
                        value={newDate.dateReceived}
                        />
                     <button>submit</button>
                </form>
            </div>
        </div>
    )
}