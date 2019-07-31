import React, {useState} from 'react';
import axios from "axios";

export default function Form({ChildID, id, clinicName}){

    const [inputValue, setInputValue] = useState("");
    const [newDate, setNewDate] = useState("");
    const [values, setValue] = useState({
        "location": "a Clinic",
        "childId": 3,
        "immunizationId": 4,
        "dateReceived": "2019-01-21"
    })


    axios
      .post(
        "https://immunization-tracker-van.herokuapp.com/api/immunizations/insert",
        values
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });


    const handleChange = event =>{
        setInputValue(event.target.value);
        // console.log(event.target.value);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        setNewDate(inputValue);
        // console.log(inputValue);
        console.log(newDate);
    }

 



    return(
        <div>
            <div className="App">
                <form onSubmit={(event)=>handleSubmit(event)}>
                    <label>
                    <input type="date" 
                        id="start" 
                        name="cal"
                        value={inputValue}
                        min="1930-01-01" max="2050-12-31"
                        onChange={event => handleChange(event)}
                        />
                    </label>  <button>submit</button>
                </form>
            </div>
        </div>
    )
}